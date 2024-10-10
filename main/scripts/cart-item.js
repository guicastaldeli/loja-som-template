import { indexItemsCart__ } from "./catalog.js";
import { directDivCart } from "./scr.js";

export const cartMenu = directDivCart;

export function cart__() {
    const divMaster = document.createElement('div');
    divMaster.id = 'div-master';

    //Menu Elements
        //Cart Div
            const cartDiv = document.createElement('div');
            cartDiv.id = 'cart-div';

            const closeCartBtn = document.createElement('button');
            closeCartBtn.id = 'close-cart-btn';
            closeCartBtn.textContent = 'X';
        //
    //

    //Functions
        function _closeMenuAnim() {
            cartDiv.remove();
            divMaster.remove();
        }
    //

    //Appends
        //Append Cart Items
            cartDiv.append(closeCartBtn);
        //

        //Append Div MASTER
        divMaster.append(cartDiv);

        document.body.appendChild(divMaster);

        //Index cart item...
            const indexCartItemImport = indexItemsCart__();
            cartDiv.append(indexCartItemImport);
        //
    //

    //Execs...
        closeCartBtn.addEventListener('click', _closeMenuAnim);
    //

}

//OPEN CART
export function __openCart() {
    cartMenu.addEventListener('click', cart__);
}