export interface RatingItemProps {
  rating: string;
}

function RatingItem({ rating }: RatingItemProps) {
  return (
    <div className="rounded-full bg-gradient-to-tr from-primary to-secondary p-2 px-4 text-sm font-semibold text-white">
      {rating}
    </div>
  );
}

export default RatingItem;
