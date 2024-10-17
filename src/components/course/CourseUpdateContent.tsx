"use client";
import { LessonProps } from "@/database/lesson.model";
import { createLecture, updateLecture } from "@/lib/actions/lecture.actions";
import { createLesson, updateLesson } from "@/lib/actions/lesson.actions";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { commonClassNames } from "@/shared/constants";
import { CourseUpdateParams, UpdateCourseLecture } from "@/types";
import { MouseEvent, useState } from "react";
import { toast } from "react-toastify";
import slugify from "slugify";
import Swal from "sweetalert2";
import {
  IconCancel,
  IconCheck,
  IconDelete,
  IconEdit,
} from "../../shared/components/icons";
import LessonItemUpdate from "../lesson/LessonItemUpdate";

const CourseUpdateContent = ({ course }: { course: CourseUpdateParams }) => {
  const lectures = course.lectures;
  const [lectureEdit, setLectureEdit] = useState("");
  const [lessonEdit, setLessonEdit] = useState("");
  const [lectureIdEdit, setLectureIdEdit] = useState("");
  const [lessonIdEdit, setLessonIdEdit] = useState("");
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
  const handleAddNewLesson = async (lectureId: string, courseId: string) => {
    try {
      const res = await createLesson({
        path: `/manage/course/update-content?slug=${course.slug}`,
        lecture: lectureId,
        course: courseId,
        title: "Tiêu đề bài học mới",
        slug: `tieu-de-bai-hoc-moi-${new Date()
          .getTime()
          .toString()
          .slice(-3)}`,
      });
      if (res?.success) {
        toast.success("Thêm bài học mới thành công!");
        return;
      }
      toast.error("Thêm bài học mới thất bại!");
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateLesson = async (
    e: MouseEvent<HTMLSpanElement>,
    lessonId: string
  ) => {
    e.stopPropagation();
    try {
      const res = await updateLesson({
        lessonId,
        path: `/manage/course/update-content?slug=${course.slug}`,
        updateData: {
          title: lessonEdit,
          slug: slugify(lessonEdit, {
            lower: true,
            locale: "vi",
            remove: /[*+~.()'"!:@]/g,
          }),
        },
      });
      if (res?.success) {
        toast.success("Cập nhật bài học thành công!");
        setLessonEdit("");
        setLessonIdEdit("");
      }
    } catch (error) {}
  };

  return (
    <div>
      <div className="flex flex-col gap-5">
        {lectures.map((lecture: UpdateCourseLecture) => (
          <div key={lecture._id}>
            <Accordion
              type="single"
              collapsible={!lectureIdEdit}
              className="w-full"
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
                            <IconCheck />
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
                            <IconCancel></IconCancel>
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
                <AccordionContent className="border-none !bg-transparent">
                  <div className="flex flex-col gap-5">
                    {lecture.lessons.map((lesson: LessonProps) => (
                      <Accordion
                        type="single"
                        collapsible={!lessonEdit}
                        key={lesson._id}
                      >
                        <AccordionItem value={lesson._id}>
                          <AccordionTrigger>
                            <div className="flex items-center gap-3 justify-between w-full pr-5">
                              {lesson._id === lessonIdEdit ? (
                                <>
                                  <div className="w-full">
                                    <Input
                                      placeholder="Tên bài học"
                                      defaultValue={lesson.title}
                                      onChange={(e) =>
                                        setLessonEdit(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <span
                                      className={cn(
                                        commonClassNames.action,
                                        "text-green-500"
                                      )}
                                      onClick={(e) =>
                                        handleUpdateLesson(e, lesson._id)
                                      }
                                    >
                                      <IconCheck />
                                    </span>
                                    <span
                                      className={cn(
                                        commonClassNames.action,
                                        "text-red-500"
                                      )}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setLessonIdEdit("");
                                      }}
                                    >
                                      <IconCancel></IconCancel>
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>{lesson.title}</div>
                                  <div className="flex gap-2">
                                    <span
                                      className={cn(
                                        commonClassNames.action,
                                        "text-blue-500"
                                      )}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setLessonIdEdit(lesson._id);
                                      }}
                                    >
                                      <IconEdit />
                                    </span>
                                    <span
                                      className={cn(
                                        commonClassNames.action,
                                        "text-red-500"
                                      )}
                                      // onClick={(e) => handleDeleteLesson(e, lecture._id)}
                                    >
                                      <IconDelete />
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <LessonItemUpdate
                              lesson={lesson}
                            ></LessonItemUpdate>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button
              onClick={() => handleAddNewLesson(lecture._id, course._id)}
              className="mt-5 ml-auto w-fit block"
            >
              Thêm bài học
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={handleAddNewLecture} className="mt-5">
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
