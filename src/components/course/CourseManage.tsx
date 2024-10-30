'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { CourseProps } from '@/database/course.model';
import useQueryString from '@/hooks/useQueryString';
import { updateCourse } from '@/lib/actions/course.actions';
import {
  BadgeStatus,
  BouncedLink,
  Heading,
  TableAction,
  TableActionItem,
} from '@/shared/components';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { allValue, courseStatus } from '@/shared/constants';
import { CourseStatus } from '@/types/enums';

const CourseManage = ({ courses }: { courses: CourseProps[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { handleSearchData, handleSelectStatus } = useQueryString();

  const handleDeleteCourse = (slug: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateCourse({
          slug,
          updateData: {
            status: CourseStatus.PENDING,
            _destroy: true,
          },
          path: '/manage/course',
        });
        toast.success('Xóa khóa học thành công!');
      }
    });
  };
  const handleChangeStatus = async (slug: string, status: CourseStatus) => {
    try {
      Swal.fire({
        title: 'Bạn có chắc muốn đổi trạng thái không?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Cập nhật',
        cancelButtonText: 'Hủy',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateCourse({
            slug,
            updateData: {
              status:
                status === CourseStatus.PENDING
                  ? CourseStatus.APPROVED
                  : CourseStatus.PENDING,
              _destroy: false,
            },
            path: '/manage/course',
          });
          toast.success('Cập nhật trạng thái thành công!');
          // router.push(
          //   `${pathname}?${createQueryString("status", "")}&${createQueryString(
          //     "search",
          //     ""
          //   )}`
          // );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [page, setPage] = useState(1);
  const handleChangePage = (type: 'prev' | 'next') => {
    if (type === 'prev' && page === 1) return;
    if (type === 'prev') setPage((previous) => previous - 1);
    if (type === 'next') setPage((previous) => previous + 1);
  };

  // useEffect(() => {
  //   router.push(`${pathname}?${createQueryString("page", page.toString())}`);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page]);
  return (
    <>
      <BouncedLink url="/manage/course/new" />
      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <Heading className="">Quản lý khóa học</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              placeholder="Tìm kiếm khóa học..."
              onChange={handleSearchData}
            />
          </div>
          <Select
            onValueChange={(value) => handleSelectStatus(value as CourseStatus)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {courseStatus.map((status) => (
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
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length > 0 &&
            courses.map((course) => {
              const courseStatusItem = courseStatus.find(
                (item) => item.value === course.status,
              );

              return (
                <TableRow key={course.slug}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        alt=""
                        className="size-16 shrink-0 rounded-lg object-cover"
                        height={80}
                        src={course.image}
                        width={80}
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="whitespace-nowrap text-sm font-bold lg:text-base">
                          {course.title}
                        </h3>
                        <h4 className="text-xs text-slate-500 lg:text-sm">
                          {new Date(course.created_at).toLocaleDateString(
                            'vi-VI',
                          )}
                        </h4>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-bold lg:text-base">
                      {course.price.toLocaleString()}đ
                    </span>
                  </TableCell>
                  <TableCell>
                    <BadgeStatus
                      item={courseStatusItem}
                      onClick={() =>
                        handleChangeStatus(course.slug, course.status)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TableAction>
                      <TableActionItem
                        type="study"
                        url={`/manage/course/update-content?slug=${course.slug}`}
                      />
                      <TableActionItem
                        type="view"
                        url={`/course/${course.slug}`}
                      />
                      <TableActionItem
                        type="edit"
                        url={`/manage/course/update?slug=${course.slug}`}
                      />
                      <TableActionItem
                        type="delete"
                        onClick={() => handleDeleteCourse(course.slug)}
                      />
                    </TableAction>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
};

export default CourseManage;
