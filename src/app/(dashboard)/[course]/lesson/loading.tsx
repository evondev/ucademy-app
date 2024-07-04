const loading = () => {
  return (
    <div className="block xl:grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start">
      <div>
        <div className="aspect-video rounded-lg skeleton mb-5"></div>
        <div className="flex gap-3 mb-5">
          <div className="size-10 rounded-lg skeleton"></div>
          <div className="size-10 rounded-lg skeleton"></div>
        </div>
        <div className="w-full h-9 mb-10 skeleton"></div>
      </div>
      <div>
        <div className="h-3 w-full rounded-full mb-2 skeleton"></div>
        <div className="flex flex-col gap-5">
          <div className="skeleton w-full h-14 rounded-lg"></div>
          <div className="skeleton w-full h-14 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default loading;
