import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui';
import { HistoryItemData, LectureItemData } from '@/shared/types';

import CourseOutlineItem from './course-outline-item';

interface CourseOutlineProps {
  lectures: LectureItemData[];
  course: string;
  slug: string;
  histories?: HistoryItemData[];
}
function CourseOutline({
  course = '',
  histories = [],
  lectures = [],
  slug = '',
}: CourseOutlineProps) {
  return (
    <div className="flex flex-col gap-5">
      {lectures.map((lecture) => (
        <Accordion
          key={lecture._id}
          collapsible
          className="w-full"
          type="single"
        >
          <AccordionItem value={lecture._id.toString()}>
            <AccordionTrigger>
              <div className="flex w-full items-center justify-between gap-3 pr-5">
                <div className="line-clamp-1">{lecture.title}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-none !bg-transparent p-0">
              <div className="mt-5 flex flex-col gap-3">
                {lecture.lessons.map((lesson) => (
                  <CourseOutlineItem
                    key={lesson._id}
                    isActive={slug ? lesson.slug === slug : false}
                    lesson={lesson ? JSON.parse(JSON.stringify(lesson)) : {}}
                    url={course ? `/${course}/lesson?slug=${lesson.slug}` : ''}
                    isChecked={histories.some(
                      (element) =>
                        element.lesson.toString() === lesson._id.toString(),
                    )}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}

export default CourseOutline;
