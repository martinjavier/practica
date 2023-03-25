import messageModel from "../db-models/message.model.js";

export default class MessageManager {
  constructor() {
    console.log("Working with messages using MongoDB");
  }

  getMessages = async () => {
    const messages = await messageModel.find().lean();
    return messages;
  };

  create = async (message) => {
    const result = await messageModel.create(message);
    return result;
  };
}
