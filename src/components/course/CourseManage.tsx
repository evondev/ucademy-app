"use client";
import { CourseProps } from "@/database/course.model";
import useQueryString from "@/hooks/useQueryString";
import { updateCourse } from "@/lib/actions/course.actions";
import {
  BadgeStatus,
  BouncedLink,
  Heading,
  TableAction,
  TableActionItem,
} from "@/shared/components";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { allValue, courseStatus } from "@/shared/constants";
import { CourseStatus } from "@/types/enums";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CourseManage = ({ courses }: { courses: CourseProps[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { handleSearchData, handleSelectStatus } = useQueryString();

  const handleDeleteCourse = (slug: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateCourse({
          slug,
          updateData: {
            status: CourseStatus.PENDING,
            _destroy: true,
          },
          path: "/manage/course",
        });
        toast.success("Xóa khóa học thành công!");
      }
    });
  };
  const handleChangeStatus = async (slug: string, status: CourseStatus) => {
    try {
      Swal.fire({
        title: "Bạn có chắc muốn đổi trạng thái không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Cập nhật",
        cancelButtonText: "Hủy",
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
            path: "/manage/course",
          });
          toast.success("Cập nhật trạng thái thành công!");
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
  const handleChangePage = (type: "prev" | "next") => {
    if (type === "prev" && page === 1) return;
    if (type === "prev") setPage((prev) => prev - 1);
    if (type === "next") setPage((prev) => prev + 1);
  };
  // useEffect(() => {
  //   router.push(`${pathname}?${createQueryString("page", page.toString())}`);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page]);
  return (
    <>
      <BouncedLink url="/manage/course/new"></BouncedLink>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
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
                  <SelectItem value={status.value} key={status.value}>
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
                (item) => item.value === course.status
              );
              return (
                <TableRow key={course.slug}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        alt=""
                        src={course.image}
                        width={80}
                        height={80}
                        className="flex-shrink-0 size-16 rounded-lg object-cover"
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-sm lg:text-base whitespace-nowrap">
                          {course.title}
                        </h3>
                        <h4 className="text-xs lg:text-sm text-slate-500">
                          {new Date(course.created_at).toLocaleDateString(
                            "vi-VI"
                          )}
                        </h4>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-sm lg:text-base">
                      {course.price.toLocaleString()}đ
                    </span>
                  </TableCell>
                  <TableCell>
                    <BadgeStatus
                      item={courseStatusItem}
                      onClick={() =>
                        handleChangeStatus(course.slug, course.status)
                      }
                    ></BadgeStatus>
                  </TableCell>
                  <TableCell>
                    <TableAction>
                      <TableActionItem
                        type="study"
                        url={`/manage/course/update-content?slug=${course.slug}`}
                      ></TableActionItem>
                      <TableActionItem
                        type="view"
                        url={`/course/${course.slug}`}
                      ></TableActionItem>
                      <TableActionItem
                        type="edit"
                        url={`/manage/course/update?slug=${course.slug}`}
                      ></TableActionItem>
                      <TableActionItem
                        type="delete"
                        onClick={() => handleDeleteCourse(course.slug)}
                      ></TableActionItem>
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
