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

// ---- LISTE DES DONUTS EN BRUT (FRONT ONLY) ----
let donutsList = [
    {
        id: 2,
        nom: "Choco Loco",
        prix: 5.50,
        image: "image/d8.jpg",
        description: "Édition Saisonnière aux éclats de myrtilles."
    },
    {
        id: 2,
        nom: "Choco Loco",
        prix: 5.50,
        image: "image/d11_modifie.png",
        description: "Édition Saisonnière aux éclats de myrtilles."
    },
    {
        id: 3,
        nom: "Choco Loco",
        prix: 5.50,
        image: "image/d7_modifie.png",
        description: "Chocolat noir intense et pépites craquantes."
    }
];

// ---- LOGIQUE DYNAMIQUE DES FAVORIS ----
document.addEventListener("DOMContentLoaded", () => {
    afficherFavoris();
});

function afficherFavoris() {
    const grid = document.getElementById("favorites-grid");

    if (donutsList.length === 0) {
        grid.innerHTML = `
            <div class="empty-favorites">
                <span class="material-symbols-outlined" style="font-size:4rem; color:var(--accent-pink); margin-bottom:15px;">favorite_border</span>
                <p style="font-weight:600; margin-bottom:20px;">Votre liste de coups de cœur est vide.</p>
                <a href="donut.html" class="shop-now-btn">Découvrir la carte</a>
            </div>
        `;
        return;
    }

    grid.innerHTML = "";
    donutsList.forEach(produit => {
        grid.innerHTML += `
            <div class="product-card" id="fav-card-${produit.id}">
                <div class="image-container">
                    <img src="${produit.image}" class="product-image" alt="${produit.nom}">
                </div>
                <h3>${produit.nom}</h3>
                <div class="product-price">${parseFloat(produit.prix).toFixed(2)}€</div>
                <p class="product-desc">${produit.description || 'Une douceur artisanale irrésistible.'}</p>
                <button class="add-to-cart" onclick="ajouterAuPanier(${produit.id}, '${produit.nom}')">
                    <span class="material-symbols-outlined" style="font-size: 1.2rem;">add</span>
                    Ajouter
                </button>
            </div>
        `;
    });
}

function retirerDesFavoris(id) {
    donutsList = donutsList.filter(item => item.id !== id);
    afficherFavoris();
    toastNotification("💔 Retiré des favoris");
}

function ajouterAuPanier(id, nom) {
    toastNotification(`✅ ${nom} ajouté au panier !`);
}

function toastNotification(texte) {
    const msg = document.createElement("div");
    msg.textContent = texte;
    msg.style.cssText = `
        position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
        background: #1A1A1A; color: white; padding: 14px 28px;
        border-radius: 100px; font-weight: 700; font-size: 0.85rem;
        z-index: 9999; box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 2500);
}