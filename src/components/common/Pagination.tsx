"use client";

import useQueryString from "@/hooks/useQueryString";
import { debounce } from "lodash";

interface IPaginationProps {
  totalPages: number;
}
const IconDoubleLeft = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-4"
  >
    <path
      fillRule="evenodd"
      d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
      clipRule="evenodd"
    />
  </svg>
);
const IconLeft = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);
const IconRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>
);
const IconDoubleRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
    />
  </svg>
);
const Pagination = ({ totalPages }: IPaginationProps) => {
  const { handleChangePage, currentPage } = useQueryString();
  const onInputChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 1) return;
    handleChangePage(Number(e.target.value));
  }, 250);
  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      <PaginationButton
        onClick={() => handleChangePage(1)}
        disabled={currentPage === 1}
      >
        {IconDoubleLeft}
      </PaginationButton>
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => handleChangePage(currentPage - 1)}
      >
        {IconLeft}
      </PaginationButton>
      <input
        type="number"
        placeholder="1"
        value={currentPage}
        className="w-20 h-10 rounded-full bg-white outline-none text-center px-2 font-medium"
        onChange={onInputChange}
      />
      <PaginationButton
        onClick={() => handleChangePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {IconRight}
      </PaginationButton>
      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => handleChangePage(totalPages)}
      >
        {IconDoubleRight}
      </PaginationButton>
    </div>
  );
};
interface IPaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}
function PaginationButton({
  onClick,
  disabled,
  children,
}: IPaginationButtonProps) {
  const paginationBtnClassNames =
    "size-10 rounded-full bg-white shadow-sm p-2 flex items-center justify-center disabled:bg-gray-200";
  return (
    <button
      className={paginationBtnClassNames}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
export default Pagination;
