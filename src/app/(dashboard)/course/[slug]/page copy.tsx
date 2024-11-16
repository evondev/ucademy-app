import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';

import PageNotFound from '@/app/not-found';
import {
  fetchCourseBySlug,
  getCourseLessonsInfo,
  updateCourseView,
} from '@/lib/actions/course.actions';
import { getUserInfo } from '@/lib/actions/user.actions';
import LessonContent from '@/modules/course/pages/course-details/components/course-outline';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { courseLevelTitle } from '@/shared/constants';
import { CourseStatus } from '@/types/enums';
import { formatMinutesToHour } from '@/utils';

import AlreadyEnroll from './already-enroll';
import CourseWidget from './course-widget';

const page = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  await updateCourseView({ slug: params.slug });
  const data = await fetchCourseBySlug({
    slug: params.slug,
  });

  if (!data) return null;
  if (data.status !== CourseStatus.APPROVED) return <PageNotFound />;
  const { userId } = auth();
  const findUser = await getUserInfo({ userId: userId || '' });
  const userCourses = findUser?.courses.map((c) => c.toString());
  const videoId = data.intro_url?.split('v=')[1];
  const lectures = data.lectures || [];
  const { duration, lessons }: any = await getCourseLessonsInfo({
    slug: data.slug,
  });
  const ratings = data.rating.map((r: any) => r.content);

  return (
    <div className="grid min-h-screen gap-10 lg:grid-cols-[2fr,1fr]">
      <div>
        <div className="relative mb-5 aspect-video">
          {data.intro_url ? (
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
              src={data.image}
            />
          )}
        </div>
        <div className="mb-5 flex flex-wrap gap-2">
          {ratings.map((rating: string, index: number) => (
            <div
              key={index}
              className="rounded-full bg-gradient-to-tr from-primary to-secondary p-2 px-4 text-sm font-semibold text-white"
            >
              {rating}
            </div>
          ))}
        </div>
        <h1 className="mb-5 text-3xl font-bold">{data?.title}</h1>
        <BoxSection title="Mô tả">
          <div className="leading-normal">{data.desc}</div>
        </BoxSection>
        <BoxSection title="Thông tin">
          <div className="mb-10 grid grid-cols-4 gap-5">
            <BoxInfo title="Bài học">{lessons}</BoxInfo>
            <BoxInfo title="Lượt xem">{data.views.toLocaleString()}</BoxInfo>
            <BoxInfo title="Trình độ">{courseLevelTitle[data.level]}</BoxInfo>
            <BoxInfo title="Thời lượng">
              {formatMinutesToHour(duration)}
            </BoxInfo>
          </div>
        </BoxSection>
        <BoxSection title="Nội dung khóa học">
          <LessonContent
            course=""
            lectures={lectures}
            slug=""
          />
        </BoxSection>
        <BoxSection title="Yêu cầu">
          {data.info.requirements.map((r, index) => (
            <div
              key={index}
              className="mb-3 flex items-center gap-2"
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded bg-primary p-1 text-white">
                <svg
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 12.75l6 6 9-13.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>{r}</span>
            </div>
          ))}
        </BoxSection>
        <BoxSection title="Lợi ích">
          {data.info.benefits.map((r, index) => (
            <div
              key={index}
              className="mb-3 flex items-center gap-2"
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded bg-primary p-1 text-white">
                <svg
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 12.75l6 6 9-13.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>{r}</span>
            </div>
          ))}
        </BoxSection>
        <BoxSection title="Q.A">
          {data.info.qa.map((qa, index) => (
            <Accordion
              key={index}
              collapsible
              type="single"
            >
              <AccordionItem value={qa.question}>
                <AccordionTrigger>{qa.question}</AccordionTrigger>
                <AccordionContent>{qa.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </BoxSection>
      </div>
      <div>
        {userCourses?.includes(data._id.toString()) ? (
          <AlreadyEnroll />
        ) : (
          <CourseWidget
            data={data ? JSON.parse(JSON.stringify(data)) : null}
            duration={formatMinutesToHour(duration)}
            findUser={findUser ? JSON.parse(JSON.stringify(findUser)) : null}
          />
        )}
      </div>
    </div>
  );
};

function BoxInfo({
  children,
  title,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bgDarkMode borderDarkMode rounded-lg border p-5">
      <h4 className="text-sm font-normal text-slate-400">{title}</h4>
      <h3 className="font-bold">{children}</h3>
    </div>
  );
}

function BoxSection({
  children,
  title,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className="mb-5 text-xl font-bold">{title}</h2>
      <div className="mb-10">{children}</div>
    </>
  );
}

export default page;
