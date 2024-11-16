import Image from 'next/image';

import PageNotFound from '@/app/not-found';
import { getCourseLessonsInfo } from '@/modules/course/actions';
import { CourseItemData } from '@/modules/course/types';
import { courseLevelTitle, CourseStatus } from '@/shared/constants';
import { CourseLessonData, CourseQAData } from '@/shared/types/course.type';
import { formatMinutesToHour } from '@/shared/utils';

import BenefitItem from './benefit-item';
import CourseOutline from './course-outline';
import QaItem from './qa-item';
import RatingItem from './rating-item';
import RequirementItem from './requirement-item';
import SectionInfoItem from './section-info-item';
import SectionItem from './section-item';

export interface CourseDetailsContainerProps {
  userId?: string | null;
  courseDetails: CourseItemData | undefined;
}

async function CourseDetailsContainer({
  courseDetails,
}: CourseDetailsContainerProps) {
  const isEmptyData =
    !courseDetails || courseDetails.status !== CourseStatus.APPROVED;

  if (isEmptyData) return <PageNotFound />;
  const videoId = courseDetails.intro_url?.split('v=')[1];
  const ratings = courseDetails.rating.map((item) => item.content);
  const lessonInfo: CourseLessonData = (await getCourseLessonsInfo({
    slug: courseDetails.slug,
  })) || { duration: 0, lessons: 0 };
  const requirements = courseDetails.info.requirements || [];
  const benefits = courseDetails.info.benefits || [];
  const questionAnswers = courseDetails.info.qa || [];

  return (
    <div className="grid min-h-screen gap-10 lg:grid-cols-[2fr,1fr]">
      <div>
        <div className="relative mb-5 aspect-video">
          {courseDetails.intro_url ? (
            <>
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="size-full object-fill"
                height="480"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="BLACK MYTH WUKONG New Insane Combat Preview and Gameplay Demo | EXCLUSIVE PS5 and PC Launch"
                width="853"
              />
            </>
          ) : (
            <Image
              fill
              alt=""
              className="size-full rounded-lg object-cover"
              src={courseDetails.image}
            />
          )}
        </div>
        <div className="mb-5 flex flex-wrap gap-2">
          {ratings.map((rating: string, index: number) => (
            <RatingItem
              key={index}
              rating={rating}
            />
          ))}
        </div>
        <h1 className="mb-5 text-3xl font-bold">{courseDetails?.title}</h1>
        <SectionItem title="Mô tả">
          <div className="leading-normal">{courseDetails.desc}</div>
        </SectionItem>
        <SectionItem title="Thông tin">
          <div className="mb-10 grid grid-cols-4 gap-5">
            <SectionInfoItem title="Bài học">
              {lessonInfo.lessons}
            </SectionInfoItem>
            <SectionInfoItem title="Lượt xem">
              {courseDetails.views.toLocaleString()}
            </SectionInfoItem>
            <SectionInfoItem title="Trình độ">
              {courseLevelTitle[courseDetails.level]}
            </SectionInfoItem>
            <SectionInfoItem title="Thời lượng">
              {formatMinutesToHour(lessonInfo.duration)}
            </SectionInfoItem>
          </div>
        </SectionItem>
        <SectionItem title="Nội dung khóa học">
          <CourseOutline
            course=""
            lectures={courseDetails.lectures}
            slug=""
          />
        </SectionItem>
        <SectionItem title="Yêu cầu">
          {requirements.map((item) => (
            <RequirementItem
              key={item}
              title={item}
            />
          ))}
        </SectionItem>
        <SectionItem title="Lợi ích">
          {benefits.map((item) => (
            <BenefitItem
              key={item}
              title={item}
            />
          ))}
        </SectionItem>
        <SectionItem title="Q.A">
          <div className="flex flex-col gap-5">
            {questionAnswers.map((item: CourseQAData) => (
              <QaItem
                key={item.question}
                item={item}
              />
            ))}
          </div>
        </SectionItem>
      </div>
      <div />
    </div>
  );
}

export default CourseDetailsContainer;
