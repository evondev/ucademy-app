import { ECommentStatus } from "@/types/enums";
import { Document, Schema, model, models } from "mongoose";

export interface Icomment extends Document {
  _id: string;
  content: string;
  lesson: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  status: ECommentStatus;
  created_at: Date;
}
const commentSchema = new Schema<Icomment>({
  content: {
    type: String,
    required: true,
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: "Lesson",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: ECommentStatus.PENDING,
    enum: Object.values(ECommentStatus),
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const comment = models.comment || model<Icomment>("comment", commentSchema);
export default comment;
