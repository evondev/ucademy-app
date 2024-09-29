import { ECommentStatus } from "@/types/enums";
import { Document, Schema, model, models } from "mongoose";

export interface IComment extends Document {
  _id: string;
  content: string;
  lesson: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  status: ECommentStatus;
  created_at: Date;
  parentId?: Schema.Types.ObjectId;
  level: number;
}
const commentSchema = new Schema<IComment>({
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
  level: {
    type: Number,
    default: 0,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
});
const Comment = models.Comment || model<IComment>("Comment", commentSchema);
export default Comment;
