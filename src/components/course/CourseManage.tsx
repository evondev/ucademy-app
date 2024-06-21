"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { commonClassNames, courseStatus } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Heading from "../common/Heading";
import { IconDelete, IconEdit, IconEye, IconStudy } from "../icons";

const CourseManage = () => {
  return (
    <div>
      <Heading className="mb-10">Quản lý khóa học</Heading>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-3">
                <Image
                  alt=""
                  src="https://images.unsplash.com/photo-1718762538704-9698cd001106?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={80}
                  height={80}
                  className="flex-shrink-0 size-16 rounded-lg object-cover"
                />
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-base">
                    Khóa học hướng dẫn về Photoshop
                  </h3>
                  <h4 className="text-sm text-slate-500">21/06/2024</h4>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <span className="font-bold text-base">499.000</span>
            </TableCell>
            <TableCell>
              <span
                className={cn(
                  commonClassNames.status,
                  courseStatus[0].className
                )}
              >
                {courseStatus[0].title}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex gap-3">
                <Link
                  href="/manage/course/update-content?slug=khoa-hoc-photoshop"
                  className={commonClassNames.action}
                >
                  <IconStudy />
                </Link>
                <Link
                  href="/course/khoa-hoc-photoshop"
                  target="_blank"
                  className={commonClassNames.action}
                >
                  <IconEye />
                </Link>
                <Link
                  href="/manage/course/update?slug=khoa-hoc-photoshop"
                  className={commonClassNames.action}
                >
                  <IconEdit />
                </Link>
                <button className={commonClassNames.action}>
                  <IconDelete />
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseManage;
