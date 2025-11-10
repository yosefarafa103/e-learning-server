import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "receiver is required"],
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    attachments: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

MessageSchema.index({ chat: 1, createdAt: -1 });

export const Message =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);
