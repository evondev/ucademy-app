const LoadingOutline = () => {
  return (
    <div>
      <div className="skeleton mb-2 h-3 w-full rounded-full" />
      <div className="flex flex-col gap-5">
        <div className="skeleton h-14 w-full rounded-lg" />
        <div className="skeleton h-14 w-full rounded-lg" />
      </div>
    </div>
  );
};

export default LoadingOutline;
