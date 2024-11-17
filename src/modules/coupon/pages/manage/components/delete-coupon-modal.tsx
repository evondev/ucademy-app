'use client';
import Swal from 'sweetalert2';

import { deleteCoupon } from '@/modules/coupon/actions';
import { TableActionItem } from '@/shared/components/common';

interface DeleteCouponModalProps {
  code: string;
}
const DeleteCouponModal = ({ code }: DeleteCouponModalProps) => {
  const handleDeleteCoupon = async (code: string) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
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
    />
  );
};

export default DeleteCouponModal;
