import { CommentStatus } from "@/shared/types/enums";
import { Document, Schema, model, models } from "mongoose";

export interface Comment extends Document {
  _id: string;
  content: string;
  lesson: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  status: CommentStatus;
  created_at: Date;
  parentId?: Schema.Types.ObjectId;
  level: number;
}
const commentSchema = new Schema<Comment>({
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
    default: CommentStatus.PENDING,
    enum: Object.values(CommentStatus),
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
    default: null,
  },
});
const CommentSchema =
  models.Comment || model<Comment>("Comment", commentSchema);
export default CommentSchema;
