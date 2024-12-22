const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");

const sendMessageToServer = async (userMessage) => {
    const response = await fetch('/send_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage })
    });
    return await response.json();
};

const appendMessage = (message, sender = 'bot') => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat', sender === 'user' ? 'outgoing' : 'incoming');
    messageDiv.innerHTML = `<div class="chat-content">
      <p>${message}</p>
    </div>`;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

sendButton.addEventListener("click", async () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;
    appendMessage(userMessage, 'user');
    chatInput.value = "";
    const { response } = await sendMessageToServer(userMessage);
    appendMessage(response, 'bot');
});

deleteButton.addEventListener("click", () => {
    chatContainer.innerHTML = "";
});

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
});
