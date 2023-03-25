import fs from "fs";
import __dirname from "../../utils.js";

const path = __dirname + "/dao/file-managers/files/Message.json";

export default class MessageManager {
  constructor() {
    console.log("Working with message using filesystem");
  }
}
