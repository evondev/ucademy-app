'use client';

import { debounce } from 'lodash';

import { ITEMS_PER_PAGE } from '@/shared/constants';
import { useQueryString } from '@/shared/hooks';

interface PaginationProps {
  totalPages: number;
  total: number;
}

const IconDoubleLeft = (
  <svg
    className="size-4"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clipRule="evenodd"
      d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
      fillRule="evenodd"
    />
  </svg>
);
const IconLeft = (
  <svg
    className="size-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.75 19.5L8.25 12l7.5-7.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconRight = (
  <svg
    className="size-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconDoubleRight = (
  <svg
    className="size-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const Pagination = ({ total, totalPages }: PaginationProps) => {
  const { currentPage, handleChangePage } = useQueryString();
  const onInputChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);

      if (value < 1) return;
      handleChangePage(Number(event.target.value));
    },
    250,
  );

  if (total <= ITEMS_PER_PAGE) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => handleChangePage(1)}
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
        className="h-10 w-20 rounded-full bg-white px-2 text-center font-medium outline-none"
        placeholder="1"
        type="number"
        value={currentPage}
        onChange={onInputChange}
      />
      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => handleChangePage(currentPage + 1)}
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

interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}
function PaginationButton({
  children,
  disabled,
  onClick,
}: PaginationButtonProps) {
  const paginationButtonClassNames =
    'size-10 rounded-full bg-white shadow-sm p-2 flex items-center justify-center disabled:bg-gray-200';

  return (
    <button
      className={paginationButtonClassNames}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default Pagination;
