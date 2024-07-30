"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { commonClassNames, courseStatus } from "@/constants";
import { ICourse } from "@/database/course.model";
import useQueryString from "@/hooks/useQueryString";
import { updateCourse } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enums";
import { debounce } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { StatusBadge } from "../common";
import Heading from "../common/Heading";
import {
  IconDelete,
  IconEdit,
  IconEye,
  IconLeftArrow,
  IconRightArrow,
  IconStudy,
} from "../icons";
import { Input } from "../ui/input";

const CourseManage = ({ courses }: { courses: ICourse[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString } = useQueryString();
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
            status: ECourseStatus.PENDING,
            _destroy: true,
          },
          path: "/manage/course",
        });
        toast.success("Xóa khóa học thành công!");
      }
    });
  };
  const handleChangeStatus = async (slug: string, status: ECourseStatus) => {
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
                status === ECourseStatus.PENDING
                  ? ECourseStatus.APPROVED
                  : ECourseStatus.PENDING,
              _destroy: false,
            },
            path: "/manage/course",
          });
          toast.success("Cập nhật trạng thái thành công!");
          router.push(
            `${pathname}?${createQueryString("status", "")}&${createQueryString(
              "search",
              ""
            )}`
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectStatus = (status: ECourseStatus) => {
    router.push(`${pathname}?${createQueryString("status", status)}`);
  };
  const handleSearchCourse = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      router.push(`${pathname}?${createQueryString("search", e.target.value)}`);
    },
    500
  );
  const [page, setPage] = useState(1);
  const handleChangePage = (type: "prev" | "next") => {
    if (type === "prev" && page === 1) return;
    if (type === "prev") setPage((prev) => prev - 1);
    if (type === "next") setPage((prev) => prev + 1);
  };
  useEffect(() => {
    router.push(`${pathname}?${createQueryString("page", page.toString())}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return (
    <>
      <Link
        href="/manage/course/new"
        className="size-10 rounded-full bg-primary flexCenter text-white fixed right-5 bottom-5 animate-bounce"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </Link>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading className="">Quản lý khóa học</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              placeholder="Tìm kiếm khóa học..."
              onChange={(e) => handleSearchCourse(e)}
            />
          </div>
          <Select
            onValueChange={(value) =>
              handleSelectStatus(value as ECourseStatus)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
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
                    <StatusBadge
                      item={courseStatusItem}
                      onClick={() =>
                        handleChangeStatus(course.slug, course.status)
                      }
                    ></StatusBadge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      <Link
                        href={`/manage/course/update-content?slug=${course.slug}`}
                        className={commonClassNames.action}
                      >
                        <IconStudy />
                      </Link>
                      <Link
                        href={`/course/${course.slug}`}
                        target="_blank"
                        className={commonClassNames.action}
                      >
                        <IconEye />
                      </Link>
                      <Link
                        href={`/manage/course/update?slug=${course.slug}`}
                        className={commonClassNames.action}
                      >
                        <IconEdit />
                      </Link>
                      <button
                        onClick={() => handleDeleteCourse(course.slug)}
                        className={commonClassNames.action}
                      >
                        <IconDelete />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-3 mt-5">
        <button
          className={commonClassNames.paginationButton}
          onClick={() => handleChangePage("prev")}
        >
          <IconLeftArrow />
        </button>
        <button
          className={commonClassNames.paginationButton}
          onClick={() => handleChangePage("next")}
        >
          <IconRightArrow />
        </button>
      </div>
    </>
  );
};

export default CourseManage;
