let cart = [];

        const menuItems = [
            {
                id: 1,
                name: 'Signature Iced Elixir',
                description: 'Our premium cold-brewed coffee infused with vanilla and caramel',
                price: 280,
                image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80'
            },
            {
                id: 2,
                name: 'Luxe Vanilla Cold Brew',
                description: 'Smooth cold brew with Madagascar vanilla and a touch of gold leaf',
                price: 320,
                image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
            },
            {
                id: 3,
                name: 'Opulent Caramel Frappé',
                description: 'Indulgent blend with premium caramel and Chantilly cream',
                price: 350,
                image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
            },
            {
                id: 4,
                name: 'Artisanal Mocha Glacé',
                description: 'Single-origin espresso with artisanal chocolate and chilled milk',
                price: 300,
                image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
            },
            {
                id: 5,
                name: 'Hazelnut Silk Cappuccino',
                description: 'Velvety cappuccino with premium hazelnut and cocoa dusting',
                price: 290,
                image: 'vanila.webp'
            },
            {
                id: 6,
                name: 'Prestige Espresso Flight',
                description: 'Curated selection of our finest single-origin espressos',
                price: 400,
                image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
            }
        ];

        function initializeMenu() {
            const menuGrid = document.getElementById('menuGrid');
            menuItems.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.className = 'menu-item';
                menuItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="menu-item-content">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <div class="menu-item-price">₱${item.price.toFixed(2)}</div>
                        <div class="quantity-selector">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 'decrease')">-</button>
                            <span id="quantity-${item.id}">1</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 'increase')">+</button>
                        </div>
                        <button class="add-to-cart" onclick="addToCart(${item.id})">Add to Cart</button>
                    </div>
                `;
                menuGrid.appendChild(menuItem);
            });
        }

        function updateQuantity(itemId, action) {
            const quantityElement = document.getElementById(`quantity-${itemId}`);
            let quantity = parseInt(quantityElement.textContent);
            
            if (action === 'increase') {
                quantity++;
            } else if (action === 'decrease' && quantity > 1) {
                quantity--;
            }
            
            quantityElement.textContent = quantity;
        }

        function addToCart(itemId) {
            const item = menuItems.find(item => item.id === itemId);
            const quantity = parseInt(document.getElementById(`quantity-${itemId}`).textContent);
            
            const existingItem = cart.find(cartItem => cartItem.id === itemId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    ...item,
                    quantity
                });
            }
            
            updateCartUI();
            showNotification(`Added ${quantity} ${item.name} to your selection`);
        }

        function updateCartUI() {
            const cartItems = document.getElementById('cartItems');
            const cartCount = document.querySelector('.cart-count');
            const cartTotal = document.getElementById('cartTotal');
            
            cartItems.innerHTML = '';
            let total = 0;
            let count = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                count += item.quantity;
                
                cartItems.innerHTML += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div>
                            <h4>${item.name}</h4>
                            <p>₱${item.price.toFixed(2)} × ${item.quantity}</p>
                            <button onclick="removeFromCart(${item.id})">Remove</button>
                        </div>
                    </div>
                `;
            });
            
            cartCount.textContent = count;
            cartTotal.textContent = total.toFixed(2);
        }

        function removeFromCart(itemId) {
            cart = cart.filter(item => item.id !== itemId);
            updateCartUI();
        }

        function toggleCart() {
            const cartModal = document.getElementById('cartModal');
            cartModal.classList.toggle('active');
        }

        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--primary);
                color: var(--secondary);
                padding: 1rem;
                border-radius: 5px;
                animation: fadeIn 0.3s ease-out;
                z-index: 1002;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        function checkout() {
            if (cart.length === 0) {
                showNotification('Your selection is empty');
                return;
            }
            
            showNotification('Thank you for your order! Your luxury experience will be ready soon.');
            cart = [];
            updateCartUI();
            toggleCart();
        }

        function searchMenu() {
            const searchInput = document.querySelector('.search-input');
            const query = searchInput.value.toLowerCase();
            const menuItems = document.querySelectorAll('.menu-item');

            menuItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('p').textContent.toLowerCase();
                if (title.includes(query) || description.includes(query)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        function trackOrder() {
            const orderInput = document.getElementById('orderTrackingInput');
            const orderId = orderInput.value.trim();

            if (orderId === '') {
                showNotification('Please enter a valid Order ID');
                return;
            }

            // Simulate order tracking (replace with actual API call in a real application)
            const statuses = ['Preparing', 'Quality Check', 'Ready for Pickup', 'On the Way', 'Delivered'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

            showNotification(`Order ${orderId}: ${randomStatus}`);
        }

        window.onload = initializeMenu;