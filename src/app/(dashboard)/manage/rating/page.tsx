import { getRatings } from "@/lib/actions/rating.actions";
import RatingManage from "./RatingManage";

const page = async () => {
  const ratings = await getRatings();
  return <RatingManage ratings={ratings}></RatingManage>;
};

export default page;
