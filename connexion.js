    // ---- MENU MOBILE ----
    const openBtn  = document.getElementById('openBtn');
    const drawer   = document.getElementById('mobileDrawer');
    const overlay  = document.getElementById('navOverlay');

    function openDrawer() {
        drawer.classList.add('active');
        overlay.classList.add('active');
        openBtn.textContent = 'close';
        openBtn.style.color = '#f43484';
    }

    function closeDrawer() {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
        openBtn.textContent = 'menu';
        openBtn.style.color = '';
    }

    openBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        drawer.classList.contains('active') ? closeDrawer() : openDrawer();
    });

    overlay.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDrawer();
    });

    // ---- CONNEXION VIA API FLASK ----
    document.querySelector("form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const inputs = document.querySelectorAll("input");
        const email = inputs[0].value.trim();
        const mot_de_passe = inputs[1].value.trim();

        try {
            const res = await fetch("http://127.0.0.1:5000/auth/connexion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, mot_de_passe })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                window.location.href = "index.html";
            } else {
                alert("❌ " + data.erreur);
            }
        } catch (err) {
            alert("❌ Impossible de contacter le serveur. Flask est-il lancé ?");
        }
    });

    // ---- CHATBOT ----
    document.addEventListener('DOMContentLoaded', () => {
        const chatbotToggler = document.querySelector(".chatbot-toggler");
        const iconChat = document.querySelector(".icon-chat");
        const iconClose = document.querySelector(".icon-close");
        const chatInput = document.querySelector(".chat-input textarea");
        const sendChatBtn = document.querySelector("#send-btn");
        const chatbox = document.querySelector(".chatbox");

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

        sendChatBtn.addEventListener("click", handleChat);
        chatInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleChat();
            }
        });
    });