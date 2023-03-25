const socket = io();

let username;

Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Ingresa tu nombre de usuario",
  inputValidator: (value) => {
    return !value && "Es obligatorio instroducir un nombre de usuario";
  },
  allowOutsideClick: false,
}).then((result) => {
  username = result.value;
  socket.emit("new-user", username);
});

const chatInput = document.getElementById("chat-input");

chatInput.addEventListener("keyup", (ev) => {
  if (ev.key === "Enter") {
    const inputMessage = chatInput.value;
    if (inputMessage.trim().length > 0) {
      let timestamp = new Date().toISOString();
      socket.emit("chat-message", {
        timestamp,
        username,
        message: inputMessage,
      });
    }
    chatInput.value = "";
  }
});

const messageElement = document.getElementById("messages-panel");
socket.on("messages", (data) => {
  let messages = "";

  data.forEach((m) => {
    messages += `<b>(${m.timestamp})</b> <b>${m.username}:</b> ${m.message}</br>`;
  });

  messageElement.innerHTML = messages;
});
