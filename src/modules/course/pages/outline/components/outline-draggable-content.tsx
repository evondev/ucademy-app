import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import slugify from 'slugify';

import { updateLesson } from '@/modules/lesson/actions';
import {
  IconCancel,
  IconCheck,
  IconDelete,
  IconEdit,
} from '@/shared/components/icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Input,
} from '@/shared/components/ui';
import { LessonItemData } from '@/shared/types';

import OutlineAction from './outline-action';
import OutlineDraggableHandle from './outline-draggable-handle';
import OutlineDraggableItem from './outline-draggable-item';
import OutlineItem from './outline-item';

export interface OutlineDraggableContentProps {
  lessonEdit: string;
  setLessonEdit: (value: string) => void;
  lessonIdEdit: string;
  setLessonIdEdit: Dispatch<SetStateAction<string>>;
  courseSlug: string;
  id: string;
  lessons: LessonItemData[];
}

export default function OutlineDraggableContent({
  courseSlug,
  id,
  lessonEdit,
  lessonIdEdit,
  lessons,
  setLessonEdit,
  setLessonIdEdit,
}: OutlineDraggableContentProps) {
  const [lessonList, setLessonList] = useState<LessonItemData[]>([]);
  const { setNodeRef } = useDroppable({
    id,
  });

  const handleUpdateLesson = async (
    event: MouseEvent<HTMLSpanElement>,
    lessonId: string,
  ) => {
    event.stopPropagation();
    try {
      const response = await updateLesson({
        lessonId,
        path: `/manage/course/update-content?slug=${courseSlug}`,
        updateData: {
          title: lessonEdit,
          slug: slugify(lessonEdit, {
            lower: true,
            locale: 'vi',
            remove: /[*+~.()'"!:@]/g,
          }),
        },
      });

      if (response?.success) {
        toast.success('Cập nhật bài học thành công!');
        setLessonEdit('');
        setLessonIdEdit('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle drag lesson in lecture only
  // const handleDragEnd = async ({ active, over }: DragEndEvent) => {
  //   if (over && active.id !== over?.id) {
  //     const activeIndex = lessonList.findIndex(({ _id }) => _id === active.id);
  //     const overIndex = lessonList.findIndex(({ _id }) => _id === over.id);

  //     const newLessons = arrayMove(lessonList, activeIndex, overIndex);

  //     setLessonList(newLessons);

  //     for (const [index, lesson] of newLessons.entries()) {
  //       await updateLessonOrder({
  //         lessonId: lesson._id,
  //         order: index + 1,
  //         path: `/manage/course/outline?slug=${courseSlug}`,
  //       });
  //     }
  //     toast.success('Thay đổi thứ tự bài học thành công!');
  //   }
  // };

  useEffect(() => {
    setLessonList(lessons || []);
  }, [lessons]);

  return (
    <AccordionContent className="border-none !bg-transparent">
      <SortableContext
        id={id}
        items={lessonList.map((lesson) => lesson._id)}
      >
        <div
          ref={setNodeRef}
          className="flex flex-col gap-5"
        >
          {lessonList.map((lesson) => (
            <OutlineDraggableItem
              key={lesson._id}
              id={lesson._id}
            >
              <Accordion
                collapsible={!lessonIdEdit}
                type="single"
              >
                <AccordionItem value={lesson._id}>
                  <AccordionTrigger>
                    <div className="flex w-full items-center justify-between gap-3 pr-5">
                      {lesson._id === lessonIdEdit ? (
                        <>
                          <div className="w-full">
                            <Input
                              defaultValue={lesson.title}
                              placeholder="Tên bài học"
                              onChange={(event) =>
                                setLessonEdit(event.target.value)
                              }
                            />
                          </div>
                          <div className="flex gap-2">
                            <OutlineAction
                              variant="success"
                              onClick={(event) =>
                                handleUpdateLesson(event, lesson._id)
                              }
                            >
                              <IconCheck />
                            </OutlineAction>
                            <OutlineAction
                              variant="danger"
                              onClick={(event) => {
                                event.stopPropagation();
                                setLessonIdEdit('');
                              }}
                            >
                              <IconCancel />
                            </OutlineAction>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>{lesson.title}</div>
                          <div className="flex gap-2">
                            <OutlineAction
                              variant="info"
                              onClick={(event) => {
                                event.stopPropagation();
                                setLessonIdEdit(lesson._id);
                              }}
                            >
                              <IconEdit />
                            </OutlineAction>
                            <OutlineAction variant="danger">
                              <IconDelete />
                            </OutlineAction>
                            <OutlineDraggableHandle />
                          </div>
                        </>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <OutlineItem lesson={lesson} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </OutlineDraggableItem>
          ))}
        </div>
      </SortableContext>
    </AccordionContent>
  );
}
