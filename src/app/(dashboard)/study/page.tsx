import { StudyPage } from '@/modules/course/pages';
import { Heading } from '@/shared/components/common';

const StudyPageRoot = async () => {
  return (
    <>
      <Heading className="mb-8">Khu vực học tập</Heading>
      <StudyPage />
    </>
  );
};

export default StudyPageRoot;
