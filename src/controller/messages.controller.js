export const createNewMessage = async (newMsg) => {
  try {
    const msg = await fetch("http://localhost:3000/api/messages", {
      method: "POST",
      body: JSON.stringify({
        chatId: newMsg.chat,
        senderId: newMsg.sender,
        reciverId: newMsg.receiver,
        content: newMsg.content,
      }),
    }).then((msg) => msg.json());
    return msg;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editMessage = async (editedMessage) => {
  return fetch("http://localhost:3000/api/messages", {
    method: "PATCH",
    body: JSON.stringify(editedMessage),
  });
};

export const deleteMessage = async (messageId) => {
  return fetch("http://localhost:3000/api/messages", {
    method: "PATCH",
    body: JSON.stringify({ ...messageId, isDeleted: true }),
  });
};
