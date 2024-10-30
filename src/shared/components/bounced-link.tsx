import Link from 'next/link';

import { IconPlus } from '@/shared/components/icons';

const BouncedLink = ({ url }: { url: string }) => {
  return (
    <Link
      className="flexCenter fixed bottom-5 right-5 size-10 animate-bounce rounded-full bg-primary text-white"
      href={url}
    >
      <IconPlus />
    </Link>
  );
};

export default BouncedLink;
