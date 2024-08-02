"use client";
import TableActionItem from "@/components/common/TableActionItem";
import { deleteCoupon } from "@/lib/actions/coupon.actions";
import Swal from "sweetalert2";

const ActionDeleteCoupon = ({ code }: { code: string }) => {
  const handleDeleteCoupon = async (code: string) => {
    try {
      Swal.fire({
        title: "Bạn có chắc muốn xóa coupon này không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xóa luôn",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteCoupon(code);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TableActionItem
      type="delete"
      onClick={() => handleDeleteCoupon(code)}
    ></TableActionItem>
  );
};

export default ActionDeleteCoupon;
