'use client';

import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';

import { deleteRating, updateRating } from '@/modules/rating/actions';
import {
  BadgeStatus,
  Heading,
  TableAction,
  TableActionItem,
} from '@/shared/components/common';
import {
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import {
  allValue,
  ratingList,
  RatingStatus,
  ratingStatus,
} from '@/shared/constants';
import { formatDateVN } from '@/shared/helpers';
import { useQueryString } from '@/shared/hooks';
import { RatingItemData } from '@/shared/types';

interface RatingManageContainerProps {
  ratings?: RatingItemData[];
}
function RatingManageContainer({ ratings }: RatingManageContainerProps) {
  const { handleSearchData, handleSelectStatus } = useQueryString();

  const handleUpdateRating = async (id: string) => {
    try {
      await updateRating(id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteRating = async (id: string) => {
    try {
      Swal.fire({
        title: 'Bạn có chắc muốn xóa đánh giá này không?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa luôn',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteRating(id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <Heading className="">Quản lý đánh giá</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              placeholder="Tìm kiếm đánh giá..."
              onChange={handleSearchData}
            />
          </div>
          <Select
            defaultValue={allValue}
            onValueChange={(value) => handleSelectStatus(value as RatingStatus)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {ratingStatus.map((status) => (
                  <SelectItem
                    key={status.value}
                    value={status.value}
                  >
                    {status.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Khóa học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!ratings &&
            ratings.length > 0 &&
            ratings.map((rating) => {
              const ratingItem = ratingStatus.find(
                (item) => item.value === rating.status,
              );
              const icon = ratingList.find(
                (item) => item.value === rating.rate,
              )?.title;

              return (
                <TableRow key={rating.rate}>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <strong>{rating.content}</strong>
                        <Image
                          alt=""
                          height={20}
                          src={`/rating/${icon}.png`}
                          width={20}
                        />
                      </div>
                      <time>{formatDateVN(rating.created_at)}</time>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      className="font-semibold hover:text-primary"
                      href={`/course/${rating.course.slug}`}
                      target="_blank"
                    >
                      {rating.course.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <strong>{rating.user?.name}</strong>
                  </TableCell>
                  <TableCell>
                    <BadgeStatus
                      title={ratingItem?.title}
                      variant={ratingItem?.variant}
                    />
                  </TableCell>
                  <TableCell>
                    <TableAction>
                      {rating.status !== RatingStatus.ACTIVE && (
                        <TableActionItem
                          type="approve"
                          onClick={() => handleUpdateRating(rating._id)}
                        />
                      )}
                      <TableActionItem
                        type="delete"
                        onClick={() => handleDeleteRating(rating._id)}
                      />
                    </TableAction>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}

export default RatingManageContainer;
