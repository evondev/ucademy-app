import Link from 'next/link';

const AlreadyEnroll = () => {
  return (
    <div className="bgDarkMode borderDarkMode rounded-lg border p-5">
      Bạn đã đăng ký khóa học này rồi. Vui lòng nhấn vào{' '}
      <Link
        className="font-bold text-primary"
        href="/study"
      >
        Khu vực học tập
      </Link>
    </div>
  );
};

export default AlreadyEnroll;
