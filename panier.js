 // SCRIPT DES DIALOGUES/MENUS D'ORIGINE
    const openBtn = document.getElementById('openBtn');
    const drawer = document.getElementById('mobileDrawer');

    openBtn.onclick = (e) => {
        e.stopPropagation();
        drawer.classList.toggle('active');
    };

    document.addEventListener('click', (e) => {
        if (!drawer.contains(e.target) && e.target !== openBtn) {
            drawer.classList.remove('active');
        }
    });

    // --- LOGIQUE JAVASCRIPT DU NOUVEAU CHATBOT ---
    document.addEventListener('DOMContentLoaded', () => {
        const chatbotToggler = document.querySelector(".chatbot-toggler");
        const iconChat = document.querySelector(".icon-chat");
        const iconClose = document.querySelector(".icon-close");
        const chatInput = document.querySelector(".chat-input textarea");
        const sendChatBtn = document.querySelector("#send-btn");
        const chatbox = document.querySelector(".chatbox");

        // OUVERTURE / FERMETURE
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

            // Message Utilisateur
            chatbox.appendChild(createChatLi(userMessage, "outgoing"));
            chatbox.scrollTo(0, chatbox.scrollHeight);

            // Réponse IA simulée
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

        sendChatBtn.addEventListener("click", handleChat);
        
        // Envoyer avec la touche Entrée
        chatInput.addEventListener("keydown", (e) => {
            if(e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleChat();
            }
        });
    });