import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';

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
import { LectureItemData, LessonItemData } from '@/shared/types';

import OutlineAction from './outline-action';
import OutlineDraggableHandle from './outline-draggable-handle';
import OutlineDraggableItem from './outline-draggable-item';
import OutlineItem from './outline-item';

export interface OutlineDraggableContentProps {
  lecture: LectureItemData;
  lessonEdit: string;
  setLessonEdit: (value: string) => void;
  lessonIdEdit: string;
}

export default function OutlineDraggableContent({
  lecture,
  lessonEdit,
  lessonIdEdit,
  setLessonEdit,
}: OutlineDraggableContentProps) {
  const [lessonList, setLessonList] = useState<LessonItemData[]>([]);

  useEffect(() => {
    setLessonList(lecture.lessons || []);
  }, [lecture.lessons]);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over?.id) {
      const activeIndex = lessonList.findIndex(({ _id }) => _id === active.id);
      const overIndex = lessonList.findIndex(({ _id }) => _id === over.id);

      const newLessons = arrayMove(lessonList, activeIndex, overIndex);
      // newLessons.forEach((lesson, index) => {handleUpdateLessonOrder(lesson._id, index + 1);});

      setLessonList(newLessons);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <AccordionContent className="border-none !bg-transparent">
        <SortableContext items={lessonList.map((lesson) => lesson._id)}>
          <div className="flex flex-col gap-5">
            {lessonList.map((lesson) => (
              <OutlineDraggableItem
                key={lesson._id}
                id={lesson._id}
              >
                <Accordion
                  collapsible={!lessonEdit}
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
                                // onClick={(event) =>
                                //   handleUpdateLesson(event, lesson._id)
                                // }
                              >
                                <IconCheck />
                              </OutlineAction>
                              <OutlineAction
                                variant="danger"
                                // onClick={(event) => {
                                //   event.stopPropagation();
                                //   setLessonIdEdit('');
                                // }}
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
                                // onClick={(event) => {
                                //   event.stopPropagation();
                                //   setLessonIdEdit(lesson._id);
                                // }}
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
    </DndContext>
  );
}
