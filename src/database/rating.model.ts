import { ERatingStatus } from "@/types/enums";
import { Document, Schema, model, models } from "mongoose";

export interface IRating extends Document {
  _id: string;
  rate: number;
  content: string;
  user: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  status: ERatingStatus;
  created_at: Date;
}
const ratingSchema = new Schema<IRating>({
  rate: {
    type: Number,
    default: 5,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(ERatingStatus),
    default: ERatingStatus.UNACTIVE,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const Rating = models.Rating || model<IRating>("Rating", ratingSchema);
export default Rating;
