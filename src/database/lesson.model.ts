import { LessonType } from "@/types/enums";
import { Schema, model, models } from "mongoose";

export interface LessonProps extends Document {
  _id: string;
  title: string;
  slug: string;
  lecture: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  order: number;
  duration: number;
  video_url: string;
  content: string;
  type: LessonType;
  _destroy: boolean;
  created_at: Date;
}
const lessonSchema = new Schema<LessonProps>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
  },
  video_url: {
    type: String,
  },
  _destroy: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  lecture: {
    type: Schema.Types.ObjectId,
    ref: "Lecture",
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  type: {
    type: String,
    enum: Object.values(LessonType),
    default: LessonType.VIDEO,
  },
});
const Lesson = models.Lesson || model<LessonProps>("Lesson", lessonSchema);
export default Lesson;
