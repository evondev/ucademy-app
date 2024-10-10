import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HistoryProps } from "@/database/history.model";
import { UpdateCourseLecture } from "@/types";
import LessonItem from "./LessonItem";

const LessonContent = ({
  lectures,
  course,
  slug,
  histories = [],
}: {
  lectures: UpdateCourseLecture[];
  course: string;
  slug: string;
  histories?: HistoryProps[];
}) => {
  return (
    <div className="flex flex-col gap-5">
      {lectures.map((lecture: UpdateCourseLecture) => (
        <Accordion
          type="single"
          collapsible
          className="w-full"
          key={lecture._id}
        >
          <AccordionItem value={lecture._id.toString()}>
            <AccordionTrigger>
              <div className="flex items-center gap-3 justify-between w-full pr-5">
                <div className="line-clamp-1">{lecture.title}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="!bg-transparent border-none p-0">
              <div className="flex flex-col gap-3 mt-5">
                {lecture.lessons.map((lesson) => (
                  <LessonItem
                    key={lesson._id}
                    lesson={lesson ? JSON.parse(JSON.stringify(lesson)) : {}}
                    url={!course ? "" : `/${course}/lesson?slug=${lesson.slug}`}
                    isActive={!slug ? false : lesson.slug === slug}
                    isChecked={histories.some(
                      (el) => el.lesson.toString() === lesson._id.toString()
                    )}
                  ></LessonItem>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default LessonContent;
