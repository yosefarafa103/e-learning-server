import { Message } from "../model/message.model.js";

export const createNewMessage = async (newMsg) => {
  try {
    const msg = await Message.create(newMsg);
    return msg;
  } catch (error) {
    throw new Error(error.message);
  }
};
