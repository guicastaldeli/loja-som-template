import { addToCart__ } from "../scripts/catalog.js";

const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

export function __prdctPageMain() {
    const container = document.getElementById('p-p-e--');
    
    //Back page
        function _backPage() {
            const backPageBtn = document.createElement('button');
            backPageBtn.id = 'b-p-b--';
            backPageBtn.textContent = '<';
            
            //Back page action...
            backPageBtn.addEventListener('click', () => {
                window.location.href = '../index.html';
            })

            container.append(backPageBtn);
        }
    //
    
    //Product Page (Items)...
        function showPrdctPage__() {
            if(selectedProduct) {
                //Product Photos...
                    //Main Photo
                        const photoPrdct = document.createElement('img');
                        photoPrdct.id = 'p-p-img--';
                        photoPrdct.src = selectedProduct.photo.startsWith('assets/') ? `../${selectedProduct.photo}` : selectedProduct.photo;

                        container.append(photoPrdct);
                    //

                    //Photo Functions...
                        const photoSrc = [
                            selectedProduct.photo,
                            selectedProduct.photo1,
                            selectedProduct.photo2
                        ];

                        const thumbs = [];

                        //Change photos...
                            photoSrc.forEach((src, i) => {
                                const thumb = document.createElement('img');
                                thumb.id = `p-p-img-${i}--`;
                                thumb.classList.add('p-p-img-thumb--');

                                thumb.src = src.startsWith('assets/') ? `../${src}` : src;

                                thumbs.push(thumb);

                                //Change photo and add border
                                thumb.addEventListener('click', () => {
                                    photoPrdct.src = src.startsWith('assets/') ? `../${src}` : src;

                                    thumbs.forEach(t => t.classList.remove('selected-photo--'));

                                    thumb.classList.add('selected-photo--');
                                });

                                container.append(thumb);
                            });

                            thumbs[0].classList.add('selected-photo--');
                        //
                    //
                //
        
                const namePrdct = document.createElement('p');
                namePrdct.id = 'n-p-txt--';
                namePrdct.textContent = selectedProduct.name;
        
                const pricePrdct = document.createElement('p');
                pricePrdct.id = 'p-prdct-txt--'
                pricePrdct.textContent = `R$ ${selectedProduct.price}`;

                const hrsv = document.createElement('hr');
                hrsv.id = 'hrsv--';

                const addCartBtn = document.createElement('button');
                addCartBtn.id = 'rsv-b--';
                addCartBtn.textContent = 'Adicionar ao carrinho';

                //Append other elements...
                container.append(namePrdct);
                container.append(hrsv);
                container.append(pricePrdct);

                container.append(addCartBtn);

                //Redirect to reserve page...
                    addCartBtn.addEventListener('click', () => {
                        addToCart__(selectedProduct);
                    })
                //
            }
        }
    //
    
    //Append...
        document.body.appendChild(container);
    //
    
    //Execs...
        _backPage();
        showPrdctPage__();
    //
}