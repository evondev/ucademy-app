const LoadingPlayer = () => {
  return (
    <div>
      <div className="skeleton mb-5 aspect-video rounded-lg"></div>
      <div className="mb-5 flex gap-3">
        <div className="skeleton size-10 rounded-lg"></div>
        <div className="skeleton size-10 rounded-lg"></div>
      </div>
      <div className="skeleton mb-10 h-9 w-full"></div>
    </div>
  );
};

export default LoadingPlayer;
