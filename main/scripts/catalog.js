async function _loadCatalog() {
    try {
        const res = await fetch('./catalog.json');
        const data = await res.json();
        
        return data.general.catalog;
    } catch (err) {
        console.error('ERRO', err)
    }
}

export const itemElements = [];

export async function __showCatalog() {
    const catalog = await _loadCatalog();

    if(catalog) {
        const container = document.getElementById('catalog-list');
        container.id = 'catg-c--';

        Object.keys(catalog).forEach(key => {
            const items = catalog[key];

            items.forEach((item) => {
                const itemElement = createItemElmt__(item);
                itemElements.push(itemElement);
                
                container.append(itemElement);
            });
        });
    } else {
        console.error("err!")
    }
}
// --------------------------- CATALOG LIST ---------------------------
    function createItemElmt__(item) {
        const itemElement = document.createElement('div');
        itemElement.id = 'item-element--';

        itemElement.setAttribute('brand-list', item.brand);
        itemElement.setAttribute('prdct-type', item.type);

        if(typeof item === 'object' && item !== null) {
            //Container card...
                const containerCard = document.createElement('div');
                containerCard.id = 'c-card--';
            //
            
            //Photo display...
                const photoDisplay = document.createElement('img');
                photoDisplay.id = 'photo-display--';
                photoDisplay.src = item.photo;
            //

            //Name display...
                const nameDisplay = document.createElement('h3');
                nameDisplay.id = 'name-display--';
                nameDisplay.textContent = item.name;
            //

            //Hr...
                const hr = document.createElement('hr');
                hr.id = 'hr--';
            //

            //Price display...
                const priceDisplay = document.createElement('h3');
                priceDisplay.classList = 'price-display--'
                priceDisplay.id = `price-display--${item.id}`;
                priceDisplay.textContent = `R$ ${item.price}`;
            //

            //Add to Cart button...
                const addCartBtn = document.createElement('button');
                addCartBtn.id = 'add-cart-btn--';
                addCartBtn.textContent = 'Adicionar ao Carrinho';
            //

            //------ Appends ------
                containerCard.append(photoDisplay);
                containerCard.append(nameDisplay);
                containerCard.append(hr);
                containerCard.append(priceDisplay);

                containerCard.append(addCartBtn);

                itemElement.append(containerCard);
            //

            //------ Redirect to product page...
                function __rdctPrdctPage(e) {
                    if(e.target === addCartBtn) {
                        e.stopPropagation();

                        indexItemsCart__();
                        addToCart__(item);

                        return;
                    }

                    localStorage.setItem('selectedProduct', JSON.stringify(item));
                    window.location.href = './product-page-scripts/product-page.html';
                }
            //

            //Execs...
            containerCard.addEventListener('click', __rdctPrdctPage);
            addCartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                addToCart__(item);
            });
        }
        return itemElement;
    }
// ------------------------------------------------------------

// --------------------------- CART --------------------------- 
    export function indexItemsCart__() {
        const cartItems = JSON.parse(localStorage.getItem('cart-items')) || [];
        const container = document.createElement('div');

        //Empty cart...
            function emptyCartMsg_() {
                const emptyMsg = document.createElement('h1');
                emptyMsg.id = 'empty-msg--';
                emptyMsg.textContent = 'Seu carrinho está vazio';

                container.append(emptyMsg);

                return emptyMsg;
            }

            if(cartItems.length === 0) {
                const emptyMsg = emptyCartMsg_();

                return emptyMsg;
            }
        //
        
        //Create card for cart items...
            //Info texts...
                const quantityText = 'Quantidade: ';

                const totalPriceText = document.createElement('p')
                totalPriceText.id = 't-p--';
                totalPriceText.textContent = 'Total: '

                const hmPriceTxt = document.createElement('p');
                hmPriceTxt.id = 'h-m-p--';
                hmPriceTxt.textContent = `${totalPriceText.textContent} ${calcTotal_(cartItems)}`;

                const hmPrdctsTxt = document.createElement('p');
                hmPrdctsTxt.id = 'h-m-prdcts--';
                hmPrdctsTxt.textContent = `Quantidade Total: ${cartItems.length}`;

                const reserveItem = document.createElement('button');
                reserveItem.id = 'r-i-btn--';
                reserveItem.textContent = 'Reservar';

                //Append texts...
                    container.append(hmPriceTxt);
                    container.append(hmPrdctsTxt);

                    container.append(reserveItem);
                //
            //

            //Reserve products...
                function __reservePrdcts() {
                    window.location.href = './reserve-page-scripts/reserve-page.html';
                }

                //Append
                    reserveItem.addEventListener('click', __reservePrdcts);
                //
            //

            const cartItemsElmts = cartItems.map(item => {
                const indexCartItem = document.createElement('div');
                indexCartItem.id = 'i-c-i--';
                
                //Cart container...
                    const hrc = document.createElement('hr');
                    hrc.id = 'hrc--';

                    const photoCartItem = document.createElement('img');
                    photoCartItem.id = 'p-c-i--'
                    photoCartItem.src = item.photo;

                    const nameCartItem = document.createElement('h1');
                    nameCartItem.id = 'n-c-i--';
                    nameCartItem.textContent = item.name;

                    const priceCartItem = document.createElement('h1');
                    priceCartItem.id = 'price-c-i--';
                    priceCartItem.textContent = item.price;

                    const quantityCartItem = document.createElement('p');
                    quantityCartItem.id = 'q-c-i--'
                    quantityCartItem.textContent = `${quantityText} ${item.quantity}`;

                    const deleteBtn = document.createElement('button');
                    deleteBtn.id = 'del-b-i--'
                    deleteBtn.classList.add('i-d-d-i--');
                    deleteBtn.textContent = 'x';

                    //Increase && Decrease
                        const increaseBtn = document.createElement('button');
                        increaseBtn.id = 'i-b-i--'
                        increaseBtn.classList.add('i-d-d-i--');
                        increaseBtn.textContent = '+';

                        const decreaseBtn = document.createElement('button');
                        decreaseBtn.id = 'd-b-i--';
                        decreaseBtn.classList.add('i-d-d-i--');
                        decreaseBtn.textContent = '-';
                    //
                //

                //Add Items...
                    function increaseItems_(item) {
                        const cartItems = JSON.parse(localStorage.getItem('cart-items')) || [];
                        const existItem = cartItems.find(cartItem => cartItem.name === item.name);

                        if(existItem) {
                            existItem.quantity += 1;
    
                            quantityCartItem.textContent = `${quantityText} ${existItem.quantity}`;
                            hmPriceTxt.textContent = `${totalPriceText.textContent} ${calcTotal_(cartItems)}`;

                            //Disable & enable button stock...
                            if(existItem.quantity === item.stquantity) {
                                increaseBtn.disabled = true;
                            }

                            if(existItem.quantity > 1) {
                                decreaseBtn.disabled = false;
                            }
                        } else {
                            cartItems.push({ ...item, quantity: 1 });
                        }

                        localStorage.setItem('cart-items', JSON.stringify(cartItems));
                    }
                //

                //Delete Items...
                    //Delete 1...
                        function decreaseItems_() {
                            const cartItems = JSON.parse(localStorage.getItem('cart-items')) || [];
                            const existItem = cartItems.find(cartItem => cartItem.name === item.name);

                            if(existItem && existItem.quantity > 1) {
                                existItem.quantity -= 1;

                                quantityCartItem.textContent = `${quantityText} ${existItem.quantity}`;
                                hmPriceTxt.textContent = `${totalPriceText.textContent} ${calcTotal_(cartItems)}`;

                                if(existItem && existItem.quantity === 1) {
                                    decreaseBtn.disabled = true;
                                }

                                //Enable button stock...
                                if(existItem.quantity < item.stquantity) {
                                    increaseBtn.disabled = false;
                                }
                            } else if(existItem && existItem.quantity === 1) {
                                decreaseBtn.disabled = true;
                            }

                            localStorage.setItem('cart-items', JSON.stringify(cartItems));
                        }
                    //

                    //Delete all...
                        function deleteItems_() {
                            const upCartItems = cartItems.filter(cartItem => 
                                        cartItem.name !== item.name || 
                                        (cartItem.name === item.name && item !== cartItem
                                    )
                                )
                            ;
                
                            localStorage.setItem('cart-items', JSON.stringify(upCartItems));

                            hmPrdctsTxt.textContent = `${quantityText} ${upCartItems.length}`;
                            hmPriceTxt.textContent = `${totalPriceText.textContent} ${calcTotal_(upCartItems)}`;
                            
                            
                            if(upCartItems.length === 0) {
                                const emptyMsg = emptyCartMsg_();

                                indexCartItem.remove();
                                hmPrdctsTxt.remove();
                                hmPriceTxt.remove();
                                reserveItem.remove();

                                return emptyMsg;
                            }
                        }
                    //
                //

                //Verify item quantity...
                    if(item.quantity === item.stquantity) {
                        increaseBtn.disabled = true;
                    }

                    if(item.quantity === 1) {
                        decreaseBtn.disabled = true;
                    }
                //
                
                //Appends
                    increaseBtn.addEventListener('click', (e) => increaseItems_(item));
                    decreaseBtn.addEventListener('click', decreaseItems_);

                    deleteBtn.addEventListener('click', deleteItems_);
                //

                //Append to index cart item...
                    indexCartItem.append(hrc);
                    indexCartItem.append(photoCartItem);
                    indexCartItem.append(nameCartItem);
                    indexCartItem.append(priceCartItem);
                    indexCartItem.append(quantityCartItem);

                    indexCartItem.append(increaseBtn);
                    indexCartItem.append(decreaseBtn);

                    indexCartItem.append(deleteBtn);
                //

                //Append to cart div...
                return indexCartItem;
            });
        //

        cartItemsElmts.forEach(itemElement => container.append(itemElement));

        return container;
    }
// ------------------------------------------------------------ 

//Calculate total price...
    export function calcTotal_(cartItems) {
        const totalPrc = cartItems.reduce((total, item) => {
            return total + (parseFloat(item.price) * (item.quantity || 1))
        }, 0);

        //Return numbers...
        return totalPrc.toLocaleString('pt-BR', 
            { minimumFractionDigits: 2, 
                maximumFractionDigits: 2
            }
        );
    }
//

//Add to cart
    export function addToCart__(item) {
        const cartItems = JSON.parse(localStorage.getItem('cart-items')) || [];
        const existItem = cartItems.find(cartItem => cartItem.name === item.name);

        if(existItem) {
            existItem.quantity = existItem.quantity || 1;
        } else {
            cartItems.push({...item, quantity: 1, stquantity: item.stquantity});
        }

        //Alert Cart...
            function __alertCart() {
                if(existItem && existItem.showAlert) {
                    return;
                }

                const alertCart = document.createElement('div')
                alertCart.id = '--alert-cart';
                alertCart.innerHTML = `<strong><p style="font-size: 38px;">!</p></strong> 
                                        <p style="position: relative; left: 2rem;">O item foi adicionado ao carrinho</p>
                                    `;
                document.body.appendChild(alertCart);

                if(existItem) {
                    existItem.showAlert = true;
                }

                //Animation...
                    alertCart.addEventListener('animationend', (e) => {
                        if(e.animationName === 'alertCartAnimOpen') {
                            setTimeout(() => {
                                alertCart.style.animation = 'alertCartAnimClose 0.3s forwards';

                                setTimeout(removeAlertCart, 1000);
                            }, 2000)
                        }
                    })
                //
            }

            //Exec...
            __alertCart();
        //

        localStorage.setItem('cart-items', JSON.stringify(cartItems));
    }
//