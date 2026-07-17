   document.addEventListener('DOMContentLoaded', () => {
        const openBtn = document.getElementById('openBtn');
        const drawer = document.getElementById('mobileDrawer');

        // GESTION NAV INTERACTIVE
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

        // GESTION NOUVELLE QUANTITÉ COMPACTE
        let currentQty = 1;
        const qtyNumEl = document.getElementById('current-qty');
        document.getElementById('minus-qty').onclick = () => {
            if(currentQty > 1) { currentQty--; qtyNumEl.textContent = currentQty; }
        };
        document.getElementById('plus-qty').onclick = () => {
            currentQty++; qtyNumEl.textContent = currentQty;
        };

        // NOTIFICATIONS TOAST
        const toast = document.getElementById('toast');
        function triggerToast(msg) {
            toast.textContent = msg;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2500);
        }

        // PANIER LOGIQUE LOCALSTORAGE
        document.getElementById('mainAddCartBtn').onclick = () => {
            let panier = JSON.parse(localStorage.getItem("panier") || "[]");
            const index = panier.findIndex(item => item.id === 8);
            if (index !== -1) {
                panier[index].quantite += currentQty;
            } else {
                panier.push({ id: 8, nom: 'Passion Fruit Cake', prix: 5.50, image: 'image/d7_modifie.png', quantite: currentQty });
            }
            localStorage.setItem("panier", JSON.stringify(panier));
            triggerToast(`✅ ${currentQty}× Passion Fruit Cake ajouté au panier !`);
        };

        // BOUTON FAVORIS INTERACTIF
        const wishBtn = document.getElementById('mainWishBtn');
        wishBtn.onclick = function() {
            const icon = this.querySelector('.material-symbols-outlined');
            if (icon.textContent === 'favorite_border') {
                icon.textContent = 'favorite';
                icon.style.color = 'var(--accent-pink)';
                this.style.borderColor = 'var(--accent-pink)';
                triggerToast('❤️ Ajouté à vos favoris !');
            } else {
                icon.textContent = 'favorite_border';
                icon.style.color = '';
                this.style.borderColor = '';
            }
        };
    });