const socket = io();

socket.on("message", (data) => {
  console.log(data);
});

socket.on("input-changed", (data) => {
  const productList = document.getElementById("productList");
  productList.innerHTML = data;
});

const textInput = document.getElementById("text-input");
textInput.addEventListener("input", (ev) => {
  socket.emit("input-changed", ev.target.value);
});

const sendButton = document.getElementById("send-button");
sendButton.addEventListener("click", (ev) => {
  socket.emit("new-message", textInput.value);
});
