//<Header>
const mainHeader = document.createElement('header');
mainHeader.id = '--m-h';
    //Logo (p)
    export const mainLogo = document.createElement('p');
    mainLogo.id = '-m-l';
    mainLogo.textContent = 'Logo';

    //Search input...
    export const searchInput = document.createElement('input');
    searchInput.id = '---s-i';
    searchInput.placeholder = 'Digite o nome ou marca do produto'

    //Cart (div)
    export const directDivCart = document.createElement('button');
    directDivCart.id =  '-g';
    directDivCart.textContent = 'Carrinho'

    //NotItems Msg...
    export const containerNotItems = document.createElement('div');
    containerNotItems.id = '--msg-n'

    //Contact...
    const contactTel = document.createElement('p');
    contactTel.id = '--c-tel';
    contactTel.textContent = 'Contato: (**) *****-****';

    //Filter...
        //(products)
            export const typesContainer = document.createElement('div');
            typesContainer.id = '---t';
            typesContainer.style.display = 'none';

            export function containerPrdctsType__(types) {
                const containerPrdctsType = document.createElement('input');
                containerPrdctsType.type = 'radio';
                containerPrdctsType.id = '---prdcts-t';
                containerPrdctsType.name = '---g-t';

                //Label
                const lbPrdcts = document.createElement('label');
                lbPrdcts.id = '---l-p-t';
                lbPrdcts.htmlFor = '---g-t';

                lbPrdcts.textContent = types.type;

                //Append
                typesContainer.append(containerPrdctsType);
                typesContainer.append(lbPrdcts);
            }
        //

        //(brand)
            export const container = document.createElement('div');
            container.id = '---c';
            container.style.display = 'none';

            export function containerBrdFltr__(brand) {
                const containerBrdFltr = document.createElement('input');
                containerBrdFltr.type = 'radio';
                containerBrdFltr.id = '---c-b-f';
                containerBrdFltr.name = '---g-n';
                
                //Label
                const lbBrdFltr = document.createElement('label');
                lbBrdFltr.id = '---l-b-f';
                lbBrdFltr.htmlFor = '---c-b-f';
        
                lbBrdFltr.textContent = brand.name;
        
                //Append
                container.append(containerBrdFltr);
                container.append(lbBrdFltr);
            }
        //

        //All
            //(types)
                //Input
                const allTypes = document.createElement('input');
                allTypes.type = 'radio';
                allTypes.id = '---a-t';
                allTypes.name = '---g-t';
                allTypes.checked = true;

                //Label
                const lbAllTypes = document.createElement('label');
                lbAllTypes.id = '---lb-a-t';
                lbAllTypes.htmlFor = '---a-t';
                lbAllTypes.textContent = 'TODOS';

                //Append
                container.append(allTypes);
                container.append(lbAllTypes);

                typesContainer.append(allTypes);
                typesContainer.append(lbAllTypes);
            //

            //(brands)
                //Input
                const allBrands = document.createElement('input');
                allBrands.type = 'radio';
                allBrands.id = '---a-b';
                allBrands.name = '---g-n';
                allBrands.checked = true;

                //Label
                const lbAllBrands = document.createElement('label');
                lbAllBrands.id = '---lb-a-b';
                lbAllBrands.htmlFor = '---a-b';
                lbAllBrands.textContent = 'TODOS';

                //Append
                container.append(allBrands);
                container.append(lbAllBrands);
            //
        //

        //Hub filter...
            const hubFilter = document.createElement('div');
            hubFilter.id = '---h-f';

            const hubFilterTxt = document.createElement('p');
            hubFilterTxt.id = '---h-f-txt';
            hubFilterTxt.textContent = '= Filtrar'

            const allFilters = document.createElement('div');
            allFilters.id = '---a-f';
            allFilters.style.display = 'none';

            //Appends
                allFilters.append(typesContainer);
                allFilters.append(container);
                
                hubFilter.append(allFilters);
                hubFilter.append(hubFilterTxt);
            //
        //
    //
    //

    //hr
    const mainHr = document.createElement('hr');
    mainHr.id = '-m-hr';

//</Header>
    
//Redirect page...
    export function rdctPage() {
        mainLogo.addEventListener('click', () => {
            window.location.href = './index.html';
        })
    }
//

//Functions...
    let hb = true;

    export function showFilter__() {
        hubFilterTxt.addEventListener('click', (e) => {
            if(hb === true) {
                allFilters.style.display = 'block';

                typesContainer.style.display = 'block';
                container.style.display = 'block';

                hb = false;
            } else if(hb === false){
                allFilters.style.display = 'none';

                typesContainer.style.display = 'none';
                container.style.display = 'none';

                hb = true;
            }
        })

        typesContainer.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        container.addEventListener('click', (e) => {
            e.stopPropagation();
        })
    }
//

//Appends...
    export function __appendMainElements() {
        mainHeader.append(mainLogo);

        mainHeader.append(searchInput);

        mainHeader.append(directDivCart);

        mainHeader.append(contactTel);

        mainHeader.append(mainHr);

        mainHeader.append(hubFilter);

        document.body.appendChild(mainHeader);
        document.body.appendChild(containerNotItems);
    }
//