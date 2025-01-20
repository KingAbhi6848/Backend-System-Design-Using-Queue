import mongoose from "mongoose";

const queueSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    payload: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const Queue = mongoose.model("Queue", queueSchema);
export default Queue;
