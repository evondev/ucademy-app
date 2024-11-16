export interface CourseLessonOutlineProps {
  completeNumber: number;
  children?: React.ReactNode;
}

function CourseLessonOutline({
  children,
  completeNumber,
}: CourseLessonOutlineProps) {
  return (
    <div className="sticky right-0 top-5 max-h-[calc(100svh-100px)] overflow-y-auto">
      <div className="borderDarkMode bgDarkMode mb-2 h-3 w-full rounded-full border">
        <div
          className="h-full w-0 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
          style={{
            width: `${completeNumber}%`,
          }}
        />
      </div>
      {children}
    </div>
  );
}

export default CourseLessonOutline;
