'use server';
import { FilterQuery } from 'mongoose';
import { revalidatePath } from 'next/cache';

import Course from '@/database/course.model';
import { OrderStatus } from '@/shared/constants';
import { connectToDatabase } from '@/shared/lib/mongoose';
import { CouponModel, OrderModel, UserModel } from '@/shared/schemas';
import { CreateOrderParams } from '@/types';

export async function fetchOrders(params: any) {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Course> = {};

    if (search) {
      query.$or = [{ code: { $regex: search, $options: 'i' } }];
    }
    if (status) {
      query.status = status;
    }
    const orders = await OrderModel.find(query)
      .populate({
        model: Course,
        select: 'title',
        path: 'course',
      })
      .populate({
        path: 'user',
        model: UserModel,
        select: 'name',
      })
      .populate({
        path: 'coupon',
        select: 'code',
      })
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit);
    const total = await OrderModel.countDocuments(query);

    return {
      orders: JSON.parse(JSON.stringify(orders)),
      total,
    };
  } catch (error) {
    console.log(error);
  }
}
export async function createOrder(params: CreateOrderParams) {
  try {
    connectToDatabase();
    if (!params.coupon) delete params.coupon;
    const newOrder = await OrderModel.create(params);

    if (params.coupon) {
      await CouponModel.findByIdAndUpdate(params.coupon, {
        $inc: { used: 1 },
      });
    }

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log(error);
  }
}
export async function updateOrder({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderStatus;
}) {
  try {
    connectToDatabase();
    const findOrder = await OrderModel.findById(orderId)
      .populate({
        path: 'course',
        model: Course,
        select: '_id',
      })
      .populate({
        path: 'user',
        model: UserModel,
        select: '_id',
      });

    if (!findOrder) return;
    if (findOrder.status === OrderStatus.CANCELED) return;
    const findUser = await UserModel.findById(findOrder.user._id);

    await OrderModel.findByIdAndUpdate(orderId, {
      status,
    });
    if (
      status === OrderStatus.COMPLETED &&
      findOrder.status === OrderStatus.PENDING
    ) {
      findUser.courses.push(findOrder.course._id);
      await findUser.save();
    }
    if (
      status === OrderStatus.CANCELED &&
      findOrder.status === OrderStatus.COMPLETED
    ) {
      findUser.courses = findUser.courses.filter(
        (element: any) =>
          element.toString() !== findOrder.course._id.toString(),
      );
      await findUser.save();
    }
    revalidatePath('/manage/order');

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}
export async function getOrderDetails({ code }: { code: string }) {
  try {
    connectToDatabase();
    const order = await OrderModel.findOne({
      code,
    }).populate({
      path: 'course',
      select: 'title',
    });

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    console.log(error);
  }
}
