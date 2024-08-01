import Link from "next/link";

const AlreadyEnroll = () => {
  return (
    <div className="bgDarkMode border borderDarkMode rounded-lg p-5">
      Bạn đã đăng ký khóa học này rồi. Vui lòng nhấn vào{" "}
      <Link href="/study" className="text-primary font-bold">
        Khu vực học tập
      </Link>
    </div>
  );
};

export default AlreadyEnroll;
