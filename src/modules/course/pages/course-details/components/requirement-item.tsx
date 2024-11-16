export interface RequirementItemProps {
  title: string;
}

function RequirementItem({ title }: RequirementItemProps) {
  return (
    <div className="mb-3 flex items-center gap-2">
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
      <span>{title}</span>
    </div>
  );
}

export default RequirementItem;
