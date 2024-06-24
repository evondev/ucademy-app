"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { commonClassNames } from "@/constants";
import { ILecture } from "@/database/lecture.model";
import { createLecture, updateLecture } from "@/lib/actions/lecture.actions";
import { cn } from "@/lib/utils";
import { TCourseUpdateParams } from "@/types";
import { MouseEvent, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { IconDelete, IconEdit } from "../icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
const CourseUpdateContent = ({ course }: { course: TCourseUpdateParams }) => {
  const lectures = course.lectures;
  const handleAddNewLecture = async () => {
    try {
      const res = await createLecture({
        title: "Chương mới",
        course: course._id,
        order: lectures.length + 1,
        path: `/manage/course/update-content?slug=${course.slug}`,
      });
      if (res?.sucess) {
        toast.success("Thêm chương mới thành công!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string
  ) => {
    e.stopPropagation();
    try {
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
          await updateLecture({
            lectureId,
            updateData: {
              _destroy: true,
              path: `/manage/course/update-content?slug=${course.slug}`,
            },
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string
  ) => {
    e.stopPropagation();
    try {
      const res = await updateLecture({
        lectureId,
        updateData: {
          title: lectureEdit,
          path: `/manage/course/update-content?slug=${course.slug}`,
        },
      });
      if (res?.success) {
        toast.success("Cập nhật thành công!");
        setLectureIdEdit("");
        setLectureEdit("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [lectureEdit, setLectureEdit] = useState("");
  const [lectureIdEdit, setLectureIdEdit] = useState("");
  return (
    <div>
      <div className="flex flex-col gap-5">
        {lectures.map((lecture: ILecture, index) => (
          <Accordion
            type="single"
            collapsible={!lectureIdEdit}
            className="w-full"
            key={lecture._id}
          >
            <AccordionItem value={lecture._id}>
              <AccordionTrigger>
                <div className="flex items-center gap-3 justify-between w-full pr-5">
                  {lecture._id === lectureIdEdit ? (
                    <>
                      <div className="w-full">
                        <Input
                          placeholder="Tên chương"
                          defaultValue={lecture.title}
                          onChange={(e) => setLectureEdit(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <span
                          className={cn(
                            commonClassNames.action,
                            "text-green-500"
                          )}
                          onClick={(e) => handleUpdateLecture(e, lecture._id)}
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
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                        <span
                          className={cn(
                            commonClassNames.action,
                            "text-red-500"
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLectureIdEdit("");
                          }}
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
                              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>{lecture.title}</div>
                      <div className="flex gap-2">
                        <span
                          className={cn(
                            commonClassNames.action,
                            "text-blue-500"
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLectureIdEdit(lecture._id);
                          }}
                        >
                          <IconEdit />
                        </span>
                        <span
                          className={cn(
                            commonClassNames.action,
                            "text-red-500"
                          )}
                          onClick={(e) => handleDeleteLecture(e, lecture._id)}
                        >
                          <IconDelete />
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent></AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
      <Button onClick={handleAddNewLecture} className="mt-5">
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
