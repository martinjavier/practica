import express from "express";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import messagesRouter from "./routes/message.router.js";
import { Server } from "socket.io";
import mongoose from "mongoose";

const app = express();
const messages = [];

app.use(express.json());

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/../public"));

// Routers
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/messages", messagesRouter);

mongoose.connect("connection-string").then((conn) => {
  console.log("Connected To DB!");
});

const httpServer = app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("New client connected!");

  socket.on("message", (data) => {
    socket.emit("input-changed", JSON.stringify(data));
  });

  socket.on("chat-message", (data) => {
    messages.push(data);
    socket.emit("messages", messages);
  });

  socket.on("new-user", (username) => {
    socket.emit("messages", messages);
    socket.broadcast.emit("new-user", username);
  });

  socket.on("input-changed", (data) => {
    socketServer.emit("input-changed", data);
  });

  socket.on("new-message", (data) => {
    messages.push({ socketId: socket.id, mensaje: data });
    socketServer.emit("input-changed", JSON.stringify(messages));
  });
});
