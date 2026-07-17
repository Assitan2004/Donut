document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('mainNavbar');
    const openBtn = document.getElementById('openBtn');
    const drawer = document.getElementById('mobileDrawer');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

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
});

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active')); 
        if (!isActive) item.classList.add('active'); 
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const iconChat = document.querySelector(".icon-chat");
    const iconClose = document.querySelector(".icon-close");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector("#send-btn");
    const chatbox = document.querySelector(".chatbox");

    if(chatbotToggler) {
        chatbotToggler.addEventListener("click", () => {
            document.body.classList.toggle("show-chatbot");
            if (document.body.classList.contains("show-chatbot")) {
                iconChat.style.display = "none";
                iconClose.style.display = "block";
            } else {
                iconChat.style.display = "block";
                iconClose.style.display = "none";
            }
        });
    }

    const createChatLi = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", className);
        chatLi.innerHTML = `<p>${message}</p>`;
        return chatLi;
    }

    const handleChat = () => {
        const userMessage = chatInput.value.trim();
        if(!userMessage) return;
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
    }

    if(sendChatBtn) sendChatBtn.addEventListener("click", handleChat);
    if(chatInput) {
        chatInput.addEventListener("keydown", (e) => {
            if(e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleChat();
            }
        });
    }
});