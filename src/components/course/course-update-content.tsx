'use client';
import { MouseEvent, useState } from 'react';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import Swal from 'sweetalert2';

import { LessonProps } from '@/database/lesson.model';
import { createLecture, updateLecture } from '@/lib/actions/lecture.actions';
import { createLesson, updateLesson } from '@/lib/actions/lesson.actions';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { commonClassNames } from '@/shared/constants';
import { CourseUpdateParams, UpdateCourseLecture } from '@/types';

import {
  IconCancel,
  IconCheck,
  IconDelete,
  IconEdit,
} from '../../shared/components/icons';
import LessonItemUpdate from '../lesson/lesson-item-update';

const CourseUpdateContent = ({ course }: { course: CourseUpdateParams }) => {
  const lectures = course.lectures;
  const [lectureEdit, setLectureEdit] = useState('');
  const [lessonEdit, setLessonEdit] = useState('');
  const [lectureIdEdit, setLectureIdEdit] = useState('');
  const [lessonIdEdit, setLessonIdEdit] = useState('');
  const handleAddNewLecture = async () => {
    try {
      const response = await createLecture({
        title: 'Chương mới',
        course: course._id,
        order: lectures.length + 1,
        path: `/manage/course/update-content?slug=${course.slug}`,
      });

      if (response?.sucess) {
        toast.success('Thêm chương mới thành công!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteLecture = async (
    event: MouseEvent<HTMLSpanElement>,
    lectureId: string,
  ) => {
    event.stopPropagation();
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
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
    event: MouseEvent<HTMLSpanElement>,
    lectureId: string,
  ) => {
    event.stopPropagation();
    try {
      const response = await updateLecture({
        lectureId,
        updateData: {
          title: lectureEdit,
          path: `/manage/course/update-content?slug=${course.slug}`,
        },
      });

      if (response?.success) {
        toast.success('Cập nhật thành công!');
        setLectureIdEdit('');
        setLectureEdit('');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddNewLesson = async (lectureId: string, courseId: string) => {
    try {
      const response = await createLesson({
        path: `/manage/course/update-content?slug=${course.slug}`,
        lecture: lectureId,
        course: courseId,
        title: 'Tiêu đề bài học mới',
        slug: `tieu-de-bai-hoc-moi-${Date.now().toString().slice(-3)}`,
      });

      if (response?.success) {
        toast.success('Thêm bài học mới thành công!');

        return;
      }
      toast.error('Thêm bài học mới thất bại!');
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateLesson = async (
    event: MouseEvent<HTMLSpanElement>,
    lessonId: string,
  ) => {
    event.stopPropagation();
    try {
      const response = await updateLesson({
        lessonId,
        path: `/manage/course/update-content?slug=${course.slug}`,
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

  return (
    <div>
      <div className="flex flex-col gap-5">
        {lectures.map((lecture: UpdateCourseLecture) => (
          <div key={lecture._id}>
            <Accordion
              className="w-full"
              collapsible={!lectureIdEdit}
              type="single"
            >
              <AccordionItem value={lecture._id}>
                <AccordionTrigger>
                  <div className="flex w-full items-center justify-between gap-3 pr-5">
                    {lecture._id === lectureIdEdit ? (
                      <>
                        <div className="w-full">
                          <Input
                            defaultValue={lecture.title}
                            placeholder="Tên chương"
                            onChange={(event) =>
                              setLectureEdit(event.target.value)
                            }
                          />
                        </div>
                        <div className="flex gap-2">
                          <span
                            className={cn(
                              commonClassNames.action,
                              'text-green-500',
                            )}
                            onClick={(event) =>
                              handleUpdateLecture(event, lecture._id)
                            }
                          >
                            <IconCheck />
                          </span>
                          <span
                            className={cn(
                              commonClassNames.action,
                              'text-red-500',
                            )}
                            onClick={(event) => {
                              event.stopPropagation();
                              setLectureIdEdit('');
                            }}
                          >
                            <IconCancel />
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
                              'text-blue-500',
                            )}
                            onClick={(event) => {
                              event.stopPropagation();
                              setLectureIdEdit(lecture._id);
                            }}
                          >
                            <IconEdit />
                          </span>
                          <span
                            className={cn(
                              commonClassNames.action,
                              'text-red-500',
                            )}
                            onClick={(event) =>
                              handleDeleteLecture(event, lecture._id)
                            }
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
                        key={lesson._id}
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
                                    <span
                                      className={cn(
                                        commonClassNames.action,
                                        'text-green-500',
                                      )}
                                      onClick={(event) =>
                                        handleUpdateLesson(event, lesson._id)
                                      }
                                    >
                                      <IconCheck />
                                    </span>
                                    <span
                                      className={cn(
                                        commonClassNames.action,
                                        'text-red-500',
                                      )}
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        setLessonIdEdit('');
                                      }}
                                    >
                                      <IconCancel />
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
                                        'text-blue-500',
                                      )}
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        setLessonIdEdit(lesson._id);
                                      }}
                                    >
                                      <IconEdit />
                                    </span>
                                    <span
                                      className={cn(
                                        commonClassNames.action,
                                        'text-red-500',
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
                            <LessonItemUpdate lesson={lesson} />
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button
              className="ml-auto mt-5 block w-fit"
              onClick={() => handleAddNewLesson(lecture._id, course._id)}
            >
              Thêm bài học
            </Button>
          </div>
        ))}
      </div>
      <Button
        className="mt-5"
        onClick={handleAddNewLecture}
      >
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
