"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { commonClassNames } from "@/constants";
import { createLecture, updateLecture } from "@/lib/actions/lecture.actions";
import { MouseEvent } from "react";
import { toast } from "react-toastify";
import { IconDelete, IconEdit } from "../icons";
import { Button } from "../ui/button";
const CourseUpdateContent = ({ course }: { course: any }) => {
  const lectures = course.lectures;
  console.log("CourseUpdateContent ~ lectures:", lectures);
  const handleAddNewLecture = async () => {
    try {
      const res = await createLecture({
        title: "Chương mới",
        course: course._id,
        order: lectures.length + 1,
        path: `manage/course/update-content?slug=${course.slug}`,
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
    console.log("CourseUpdateContent ~ lectureId:", lectureId);
    e.stopPropagation();
    try {
      await updateLecture({
        lectureId,
        updateData: {
          _destroy: true,
          path: `manage/course/update-content?slug=${course.slug}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {lectures.map((lecture: any) => (
        <Accordion
          type="single"
          collapsible
          className="w-full"
          key={lecture._id}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center gap-3 justify-between w-full pr-5">
                <div>{lecture.title}</div>
                {/* <div className="w-full">
                <Input placeholder="Tên chương" />
              </div> */}
                <div className="flex gap-2">
                  <span className={commonClassNames.action}>
                    <IconEdit />
                  </span>
                  <span
                    className={commonClassNames.action}
                    onClick={(e) => handleDeleteLecture(e, lecture._id)}
                  >
                    <IconDelete />
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
      <Button onClick={handleAddNewLecture} className="mt-5">
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
