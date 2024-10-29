import Link from "next/link";

const IconLeftArrow = (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-bold text-7xl">404</h1>
      <h2 className="mb-5">Page not found</h2>
      <Link className="flex items-center gap-2 hover:text-primary" href="/">
        {IconLeftArrow}
        Trang chủ
      </Link>
    </div>
  );
};

export default PageNotFound;
