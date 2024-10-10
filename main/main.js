import { __openCart } from "./scripts/cart-item.js";

import { __appendMainElements } from "./scripts/scr.js";
import { rdctPage } from "./scripts/scr.js";
import { showFilter__ } from "./scripts/scr.js";

import { __showCatalog } from "./scripts/catalog.js";

import { ___searchTool } from "./scripts/search-tool.js";

//Exec...
    __openCart();
    __appendMainElements();

    __showCatalog();

    ___searchTool();
    
    rdctPage();

    showFilter__();
//