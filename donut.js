// ---- MENU MOBILE ----
const openBtn = document.getElementById('openBtn');
const drawer = document.getElementById('mobileDrawer');

if (openBtn && drawer) {
    openBtn.onclick = (e) => {
        e.stopPropagation();
        drawer.classList.toggle('active');
    };

    document.addEventListener('click', (e) => {
        if (!drawer.contains(e.target) && e.target !== openBtn) {
            drawer.classList.remove('active');
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // ---- INTERACTION DU CHATBOT ----
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const iconChat = document.querySelector(".icon-chat");
    const iconClose = document.querySelector(".icon-close");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector("#send-btn");
    const chatbox = document.querySelector(".chatbox");

    if (chatbotToggler) {
        chatbotToggler.addEventListener("click", () => {
            document.body.classList.toggle("show-chatbot");
            
            if (document.body.classList.contains("show-chatbot")) {
                if (iconChat) iconChat.style.display = "none";
                if (iconClose) iconClose.style.display = "block";
            } else {
                if (iconChat) iconChat.style.display = "block";
                if (iconClose) iconClose.style.display = "none";
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
        if (!chatInput || !chatbox) return;
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

    if (sendChatBtn) sendChatBtn.addEventListener("click", handleChat);
    
    if (chatInput) {
        chatInput.addEventListener("keydown", (e) => {
            if(e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleChat();
            }
        });
    }
});

// ---- LOGIQUE DU PANIER ----
function ajouterAuPanier(id, nom, prix, image) {
    let panier = JSON.parse(localStorage.getItem("panier") || "[]");
    const index = panier.findIndex(item => item.id === id);
    
    if (index !== -1) {
        panier[index].quantite += 1;
    } else {
        panier.push({ id, nom, prix, image, quantite: 1 });
    }
    
    localStorage.setItem("panier", JSON.stringify(panier));
    
    const msg = document.createElement("div");
    msg.textContent = `✅ ${nom} ajouté au panier !`;
    msg.style.cssText = `
        position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
        background: #1A1A1A; color: white; padding: 14px 28px;
        border-radius: 100px; font-weight: 700; font-size: 0.85rem;
        z-index: 9999;
    `;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 2500);
}

// ---- MENU UTILISATEUR ----
const user = JSON.parse(localStorage.getItem("user"));
const userBtn = document.getElementById("userBtn");
const userDropdown = document.getElementById("userDropdown");
const userGreeting = document.getElementById("userGreeting");

if (user && userBtn) {
    userBtn.innerText = "account_circle";
    if (userGreeting) {
        userGreeting.innerText = "Bonjour, " + user.prenom + " ";
        userGreeting.style.color = "#1a1a1a";
        userGreeting.style.fontSize = "14px";
    }
}

if (userBtn && userDropdown) {
    userBtn.onclick = (e) => {
        e.stopPropagation();
        userDropdown.style.display = userDropdown.style.display === "none" ? "block" : "none";
    };

    document.addEventListener("click", () => {
        userDropdown.style.display = "none";
    });
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.onclick = (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        window.location.href = "connexion.html";
    };
}