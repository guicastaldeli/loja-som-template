import { calcTotal_ } from "../scripts/catalog.js";

export function __reservePrdctPageMain() {
    const cartItems = JSON.parse(localStorage.getItem('cart-items')) || [];
    const container = document.getElementById('r-p-e--');

    //Back button...
        const backPageBtn = document.createElement('button');
        backPageBtn.id = '-b-p-btn';
        backPageBtn.textContent = '<';

        function _backPage() {
            window.location.href = '../index.html';
        }

        //Append...
        container.append(backPageBtn);

        //Exec...
        backPageBtn.addEventListener('click', _backPage);
    //

    //Info texts...
        const hmPrdctsTxtR = document.createElement('p');
        hmPrdctsTxtR.id = '-h-m-prdcts';

        const hmPriceTxtR = document.createElement('p');
        hmPriceTxtR.id = '-h-m-p';

        //Quantity
            const itemsQuantity = 'Quantidade: ';
        //

        //Total Price
            const totalPriceText = 'Total: ';
            hmPriceTxtR.textContent = `${totalPriceText} ${calcTotal_(cartItems)}`;
            
            container.append(hmPriceTxtR);
        //

        //Total Products
            const totalPrdctsText = 'Quantidade Total: ';
            hmPrdctsTxtR.textContent = `${totalPrdctsText} ${cartItems.length}`;
            
            container.append(hmPrdctsTxtR);
        //
    //

    //Contianer div
        const containerDiv = document.createElement('div')
        containerDiv.id = '--c-div';
    //

    cartItems.forEach(item => {
        const rsvItemDiv = document.createElement('div');
        rsvItemDiv.id = '--rsv-i';

        const photoPrdct = document.createElement('img');
        photoPrdct.id = '-p-p-img';
        photoPrdct.src = item.photo;

        const namePrdct = document.createElement('p');
        namePrdct.id = '-n-p-txt'
        namePrdct.textContent = item.name;

        const pricePrdct = document.createElement('p');
        pricePrdct.id = '-p-p-txt';
        pricePrdct.textContent = `R$ ${item.price}`;

        const quantityPrdct = document.createElement('p');
        quantityPrdct.id = '-q-p-txt';
        quantityPrdct.textContent = `${itemsQuantity} ${item.quantity}`;

        const hrr = document.createElement('hr');
        hrr.id = '---hrr';

        //Increase & Decrease Products...
            const increasePrdct = document.createElement('button');
            increasePrdct.id = '-i-p-btn';
            increasePrdct.textContent = '+';

            const decreasePrdct = document.createElement('button');
            decreasePrdct.id = '-d-p-btn'
            decreasePrdct.textContent = '-';
        //

        function increaseItems_(item) {
            const cartItems = JSON.parse(localStorage.getItem('cart-items')) || [];
            const existItem = cartItems.find(cartItem => cartItem.name === item.name);

            if(existItem) {
                existItem.quantity += 1;

                quantityPrdct.textContent = `${itemsQuantity} ${existItem.quantity}`;
                hmPriceTxtR.textContent = `${totalPriceText} ${calcTotal_(cartItems)}`;

                if(existItem.quantity === item.stquantity) {
                    increasePrdct.disabled = true;
                }

                if(existItem.quantity > 1) {
                    decreasePrdct.disabled = false;
                }
            } else {
                cartItems.push({ ...item, quantity: 1 });
            }

            localStorage.setItem('cart-items', JSON.stringify(cartItems));
        }

        function decreaseItems_() {
            const cartItems = JSON.parse(localStorage.getItem('cart-items')) || [];
            const existItem = cartItems.find(cartItem => cartItem.name === item.name);

            if(existItem && existItem.quantity > 1) {
                existItem.quantity -= 1;

                quantityPrdct.textContent = `${itemsQuantity} ${existItem.quantity}`;
                hmPriceTxtR.textContent = `${totalPriceText} ${calcTotal_(cartItems)}`;

                if(existItem && existItem.quantity === 1) {
                    decreasePrdct.disabled = true;
                }

                if(existItem.quantity < item.stquantity) {
                    increasePrdct.disabled = false;
                }
            } else if(existItem && existItem.quantity === 1) {
                decreasePrdct.disabled = true;
            }

            localStorage.setItem('cart-items', JSON.stringify(cartItems));
        }

        if(item.quantity === item.stquantity) {
            increasePrdct.disabled = true;
        }

        if(item.quantity === 1) {
            decreasePrdct.disabled = true;
        } 
        
        //Appends
            //Append to main div...
                rsvItemDiv.append(photoPrdct);
                rsvItemDiv.append(namePrdct);
                rsvItemDiv.append(pricePrdct);

                rsvItemDiv.append(quantityPrdct);

                rsvItemDiv.append(increasePrdct);
                rsvItemDiv.append(decreasePrdct);

                rsvItemDiv.append(hrr);
            //

            //Append to buttons...
                increasePrdct.addEventListener('click', (e) => increaseItems_(item));
                decreasePrdct.addEventListener('click', decreaseItems_);
            //

            //Append container
            container.append(rsvItemDiv);
        //
    });

    //Phone format...
        function phoneNumberFormat__(inputElement) {
            let phoneNumber = inputElement.value.replace(/\D/g, '');

            if(phoneNumber.length <= 2) {
                inputElement.value = phoneNumber;
            } else if (phoneNumber.length <= 5) {
                phoneNumber = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
            } else if(phoneNumber.length <= 10) {
                phoneNumber = `(${phoneNumber.slice(0,2)}) ${phoneNumber.slice(2,6)}-${phoneNumber.slice(6)}`;
            } else {
                phoneNumber = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
            }

            inputElement.value = phoneNumber;
        }
    //

    function __confReserv() {
        const containerReserv = document.createElement('div');
        containerReserv.id = '--c-reserv';

        const reservBtn = document.createElement('button');
        reservBtn.id = '--rsv-b';
        reservBtn.textContent = 'Ir para a Reserva';

        function __inputsReserv() {
            const cancelReserv = document.createElement('button');
            cancelReserv.id = '--c-r';
            cancelReserv.textContent = 'X'

            //Input Number...
                const numberText = document.createElement('p');
                numberText.id = '--n-txt';
                numberText.textContent = 'Número de Telefone:';
                
                const inputNumber = document.createElement('input');
                inputNumber.id = '--i-nmb';
                inputNumber.placeholder = '(**) ____-____';

                //Exec...
                    inputNumber.addEventListener('input', () => phoneNumberFormat__(inputNumber));
                    inputNumber.addEventListener('input', () => phoneNumberFormat__(this));
                //
            //

            //Input Name...
                const nameText = document.createElement('p');
                nameText.id = '--name-txt';
                nameText.textContent = 'Nome:'

                const inputName = document.createElement('input');
                inputName.id = '--i-n';
                inputName.placeholder = '...';
            //

            const confReservBtn = document.createElement('button');
            confReservBtn.id = '--c-r-b';
            confReservBtn.textContent = 'Reservar';

            reservBtn.disabled = true;

            //Appends
                containerReserv.append(cancelReserv);

                //Input Number
                    containerReserv.append(numberText);
                    containerReserv.append(inputNumber);
                //

                //Input Name...
                    containerReserv.append(nameText);
                    containerReserv.append(inputName);
                //

                containerReserv.append(confReservBtn);

                container.append(containerReserv);
            //

            function cancelRsv_() {
                containerReserv.remove();
                cancelReserv.remove();

                //Input Number
                    numberText.remove();
                    inputNumber.remove();
                //

                //Input Name
                    nameText.remove();
                    inputName.remove();
                //

                confReservBtn.remove();

                reservBtn.disabled = false;
            }

            function sendMsg__() {
                const alertText = document.createElement('p');
                alertText.id = '-a-txt';

                function redirectPage__() {
                    setTimeout(() => {
                        window.location.href = '../index.html';
                    }, 7000)
                }

                if(inputNumber.value && inputName.value) {
                    if(cartItems.length === 1) {
                        alertText.textContent = `Seu item foi reservado. Você será redirecionado.`;
                    } else {
                        alertText.textContent = `Seus itens foram reservados. Você será redirecionado.`;
                    }

                    //Clear cart...
                        localStorage.removeItem('cart-items');
                        cartItems.length = 0;

                        redirectPage__();
                    //
                } else if(!inputNumber.value && inputName.value) {
                    numberText.style.color = '#db3737';
                    inputNumber.style.outline = '1px solid #db3737';
                } else if(inputNumber.value && !inputName.value) {
                    nameText.style.color = '#db3737';
                    inputName.style.outline = '1px solid #db3737';
                } else {
                    numberText.style.color = '#db3737';
                    nameText.style.color = '#db3737';

                    inputNumber.style.outline = '1px solid #db3737';
                    inputName.style.outline = '1px solid #db3737';
                }

                //Return to original color...
                    inputNumber.addEventListener('input', () => {
                        numberText.style.color = '';
                        inputNumber.style.outline = '';
                    });

                    inputName.addEventListener('input', () => {
                        nameText.style.color = '';
                        inputName.style.outline = '';
                    })

                    //Append...
                    container.append(alertText);
                //
            }

            //Exec...
            cancelReserv.addEventListener('click', cancelRsv_);
            confReservBtn.addEventListener('click', sendMsg__);
        }

        //Append
        container.append(reservBtn);

        //Exec
        reservBtn.addEventListener('click', __inputsReserv);
    }

    //Exec...
    __confReserv();
}

document.addEventListener('DOMContentLoaded', __reservePrdctPageMain);