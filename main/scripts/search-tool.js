import { containerBrdFltr__, containerNotItems, containerPrdctsType__, searchInput } from "./scr.js";

import { itemElements } from "./catalog.js";

//Lists...
    //Brnands
        async function _loadBrands() {
            try {
                const res = await fetch('./catalog.json');
                const data = await res.json();

                return data.general.brandlist.brands;
            } catch (err) {
                console.error('ERRO', err);
            }
        }
    //

    //Product types...
        async function _loadTypes() {
            try {
                const res = await fetch('./catalog.json');
                const data = await res.json();

                return data.general.productstype.types;
            } catch (err) {
                console.log('ERRO', err);
            }
        } 
    //
//

//Search bar...
    export async function ___searchTool() {
        //Search filter...
            searchInput.addEventListener('input', async (e) => {
                const searchTerm = e.target.value.toLowerCase();

                itemElements.forEach(itemElement => {
                    const itemName = itemElement.querySelector('#name-display--').textContent.toLowerCase();

                    if(itemName.includes(searchTerm)) {
                        itemElement.style.display = 'block';
                    } else {
                        itemElement.style.display = 'none';
                    }
                });
            });
        //

        //Filters...
            let selectedBrand = null;
            let selectedType = null;

            //Brands
                const brandList = await _loadBrands();

                brandList.forEach(brand => {
                    containerBrdFltr__(brand);
                });

                document.querySelectorAll('input[name="---g-n"]').forEach(radio => {
                    radio.addEventListener('change', (e) => {
                        if(e.target.id === '---a-b') {
                            selectedBrand = null;
                        } else {
                            selectedBrand = e.target.nextElementSibling.textContent;
                        }

                        filterItems(selectedBrand, selectedType);
                    });
                });
            //

            //Types
                const typeList = await _loadTypes();

                typeList.forEach(types => {
                    containerPrdctsType__(types);
                });

                document.querySelectorAll('input[name="---g-t"]').forEach(radio => {
                    radio.addEventListener('change', (e) => {
                        if(e.target.id === '---a-t') {
                            selectedType = null;
                        } else {
                            selectedType = e.target.nextElementSibling.textContent;
                        }

                        filterItems(selectedBrand, selectedType);
                    });
                });
            //

            //Filter function
                function filterItems(selectedBrand, selectedType) {
                    let hasItems = false;
                    const notItem = document.getElementById('---nt-itms');

                    itemElements.forEach(itemElement => {
                        const itemBrand = itemElement.getAttribute('brand-list');
                        const itemType = itemElement.getAttribute('prdct-type');
    
                        const verifBrand = selectedBrand ? itemBrand === selectedBrand : true;
                        const verifType = selectedType ? itemType === selectedType : true;

                        if(verifBrand && verifType) {
                            itemElement.style.display = 'block';
                            hasItems = true;
                        } else {
                            itemElement.style.display = 'none';
                        }
                    });

                    if(!hasItems) {
                        if(!notItem) {
                            const notItemTxt = document.createElement('p');
                            notItemTxt.id = '---nt-itms';

                            notItemTxt.textContent = 'Não há nenhum item aqui.';

                            containerNotItems.append(notItemTxt);
                        }
                    } else if(notItem) {
                        notItem.remove();
                    }
                }
            //
        //
    }
//