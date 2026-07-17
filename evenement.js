// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('mainNavbar');
const openBtn = document.getElementById('openBtn');
const drawer = document.getElementById('mobileDrawer');

window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 50
        ? "rgba(255, 255, 255, 0.98)"
        : "rgba(255, 255, 255, 0.8)";
});

// ---- MENU MOBILE ----
openBtn.onclick = (e) => {
    e.stopPropagation();
    drawer.classList.toggle('active');
    openBtn.innerText = drawer.classList.contains('active') ? 'close' : 'menu';
};

document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && e.target !== openBtn) {
        drawer.classList.remove('active');
        openBtn.innerText = 'menu';
    }
});

// ---- MODALES ÉVÉNEMENTS ----
const modalOverlay = document.getElementById("eventModal");
const modalTitle = document.getElementById("modalTitle");
const closeModal = document.getElementById("closeModal");
const bookingForm = document.getElementById("bookingForm");

document.querySelectorAll(".open-booking-modal").forEach(btn => {
    btn.addEventListener("click", () => {
        modalTitle.innerText = btn.getAttribute("data-title");
        modalOverlay.classList.add('active');
    });
});

const hideModal = () => {
    modalOverlay.classList.remove('active');
    bookingForm.reset();
};

closeModal.addEventListener("click", hideModal);
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) hideModal();
});

bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nomClient = document.getElementById("userName").value;
    alert(`✨ Merci ${nomClient} ! Votre demande pour "${modalTitle.innerText}" a bien été transmise à notre atelier.`);
    hideModal();
});

// ---- CHATBOT ----
const chatbotToggler = document.querySelector(".chatbot-toggler");
const iconChat = document.querySelector(".icon-chat");
const iconClose = document.querySelector(".icon-close");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector("#send-btn");
const chatbox = document.querySelector(".chatbox");

if (chatbotToggler) {
    chatbotToggler.addEventListener("click", () => {
        document.body.classList.toggle("show-chatbot");
        const isOpen = document.body.classList.contains("show-chatbot");
        iconChat.style.display = isOpen ? "none" : "block";
        iconClose.style.display = isOpen ? "block" : "none";
    });
}

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    chatLi.innerHTML = `<p>${message}</p>`;
    return chatLi;
};

const handleChat = () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Je prépare votre réponse... ✨", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            incomingChatLi.querySelector("p").textContent = "C'est noté ! Un de nos chefs pâtissiers va vous répondre d'ici quelques instants. En attendant, nos donuts Mms sont en promotion ! 🍩";
            chatbox.scrollTo(0, chatbox.scrollHeight);
        }, 1000);
    }, 500);
};

if (sendChatBtn) sendChatBtn.addEventListener("click", handleChat);
if (chatInput) {
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleChat();
        }
    });
}