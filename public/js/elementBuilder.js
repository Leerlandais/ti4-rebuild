const checkoutGrid = document.getElementById("checkout_grid");
function buildCategoryGrid(datas) {
    showTest ? logThis("Building Category Grid", true) : null;
    // Retrieve parent
    const categoryGrid = document.getElementById("category_grid");
    // Assure that parent is empty
    let i = 1;
    while (categoryGrid.firstChild) {
        showTest ? logThis("removing category grid child : " + i) : null;
        categoryGrid.removeChild(categoryGrid.firstChild);
        i++;
    }
    // Retrieve distinct category names
    let categoryList = [];
    datas.forEach(data => (
        categoryList.push(data["cat"])
    ));
    let distinctCats = [...new Set(categoryList)];
    showTest ? logThis("Category List : " + distinctCats, false, "List of individual categories") : null;
    let direction = "selectedCat";
    distinctCats.forEach((cat) => {
        // Create main child div for each category
        const divExt = document.createElement("div");
        divExt.classList.add("relative",
            "rounded-sm",
            "overflow-hidden",
            "group");
        divExt.innerHTML = `<img src="images/category/${cat}.jpg" 
                                 alt="${cat}" 
                                 class="w-full"
                                 />
                            <button class="absolute inset-0 bg-black bg-opacity-40 
                                           flex items-center justify-center text-xl 
                                           text-white font-roboto font-medium 
                                           group-hover:bg-opacity-60 transition"
                                    onclick='getProductJson("selectedCat", "${cat}")'>
                                           ${cat}
                            </button>`

        categoryGrid.appendChild(divExt);
    });
    showTest ? logThis("Category Grid built with "+distinctCats.length+" windows", true) : null;
}

function buildByCatSelection(datas, category) {
    showTest ? logThis("Building By Selected Category :"+category, true) : null;
    // filter list to retrieve category matches only
    let articleList = datas.filter(data => data["cat"] === category);
    showTest ? logThis("Filtered data :"+JSON.stringify(articleList), false, `Articles in ${category} category`) : null;
    // change header accordingly
    const artGridHeader = document.getElementById("article_grid_header");
    artGridHeader.textContent = category;
    document.getElementById("reco_grid_hide") ? document.getElementById("reco_grid_hide").remove() : null;
    // create the new grid
    buildArticleGrid(articleList, "article_grid");
}

function buildArticleGrid(datas, grid) {
    showTest ? logThis("Building "+grid, true) : null;
    // Select the relevant grid
    const currentGrid = document.getElementById(grid);
    // Assure that it's empty
    let i = 1;
    while (currentGrid.firstChild) {
        showTest ? logThis(`removing ${grid} child : ` + i) : null;
        currentGrid.removeChild(currentGrid.firstChild);
        i++;
    }

    let soldDatas = JSON.parse(localStorage.getItem("SOLD"));
    let remaining = 0;
    datas.forEach(data => {
        showTest ? logThis("Creating window for "+data["item"]) : null
        for (i = 0; i < soldDatas.length; i++) {
            if (soldDatas[i]["id"] === data["id"]) {

               remaining = parseInt(data["amount"]) - parseInt((soldDatas[i].sold));
               showTest ? logThis("Calculating remaining items : "+remaining) : null;
            }
        }
        // if there are items in the basket, adjust the remaining amount
        if (localStorage.getItem("BASKET")){
            const currentBasket = JSON.parse(localStorage.getItem("BASKET"));
            currentBasket.forEach((item) => {
                if (parseInt(item.id) === parseInt(data.id)) {
                    remaining--;
                }
            })

        }
        data.saved = parseInt(data.price) - parseInt(data.priceRed);
        // Parent Div for each element
        const divExt = document.createElement("div");
            divExt.classList.add("bg-white", "shadow", "rounded", "overflow-hidden", "group",);
        // Div to hold the image
        const divImg = document.createElement("div");
            divImg.classList.add("relative");
            divImg.innerHTML = `<img src="${data['img']}" alt="${data.item}">`
                divExt.appendChild(divImg);
        // Div to hold product info
        const divLink = document.createElement("div");
            divLink.classList.add("pt-4", "pb-3", "px-4",);
        const link = document.createElement("a");
            link.innerHTML = `<h4 class="uppercase font-medium 
                                         text-xl mb-2 text-gray-800 
                                         hover:text-primary transition"
                              > ${data["item"]}
                              </h4>`
                divLink.appendChild(link);
        const divPrice = document.createElement("div");
            divPrice.classList.add("flex", "items-baseline", "mb-1", "space-x-2");
            divPrice.innerHTML = `<p class="text-xl text-primary font-semibold">€ ${data["priceRed"]}</p>
                              <p class="text-sm text-gray-400 line-through">€ ${data["price"]}</p>`
                divLink.appendChild(divPrice);
        // Div to display remaining articles
        const divLeft = document.createElement("div");
            divLeft.classList.add("flex", "items-center");
            divLeft.innerHTML = `<div class="text-xs text-gray-500 ml-3">Remaining : <span id="amt${data['id']}">${remaining}</span></div>`;
        // attaché au parent(divLink)
                divLink.appendChild(divLeft);
        // Finalement, le div pour contenir le bouton (Add to Cart)
        const divBtn = document.createElement("div");
            divBtn.innerHTML = `<button 
                                class="block w-full py-1 text-center text-white 
                                       bg-primary border border-primary rounded-b 
                                       hover:bg-transparent hover:text-primary transition"
                                id="ITEM${data['id']}"
                                onclick="addItemToStorage('${data.id},${data.cat},${data.item},${data.priceRed},${data.saved},${data.amount}')"
                                > 
                                Add to cart
                                </button>`// add onclick here
                divLink.appendChild(divBtn);
                divExt.appendChild(divLink);

            currentGrid.appendChild(divExt);
        // in case the user has returned to this screen, or refreshed it, make sure buttons are disable where necessary
        if (remaining === 0) disableButton(data.id, data.item);
    });

    showTest ? logThis("Article Grid built with "+datas.length+" windows", true) : null;

}

function disableButton(id, item) {
    const cartBtn = document.getElementById("ITEM"+id);
        cartBtn.disabled = true;
        cartBtn.textContent = "Sold Out!";
        cartBtn.style.opacity = "0.5";
    showTest ? logThis("Article "+item+" marked out of stock", true) : null;
}

function    createCheckoutBasket(datas){
   const checkoutGrid = document.getElementById("checkout_grid");
   showTest ? logThis("Emptying Checkout Grid", true) : null
   // make sure table grid is empty (even though it is)
    while (checkoutGrid.firstChild) {
        checkoutGrid.removeChild(checkoutGrid.firstChild);
    }
    if (datas === null || datas === undefined || datas.length < 1) {
        showTest ? logThis("Empty basket detected") : null;
        const tr = document.createElement("tr");
            tr.classList.add("border-b", "border-blue-gray-200");
            tr.innerHTML = `<td class="py-3 px-4 font-medium text-center" colspan="7"><a href="?route=home">Basket is Empty</a></td`
                checkoutGrid.appendChild(tr);
            showTest ? logThis("Checkout creation completed with empty basket message", true) : null;
        return;
    }

    let finalPrice = 0;
    datas.forEach((data) => {
        finalPrice += parseInt(data.price);
        let fullPrice = parseInt(data.price) * parseInt(data.occurs);
        // create the basket table
        const tr = document.createElement("tr");
            tr.classList.add("border-b", "border-blue-gray-200", "text-center");
            tr.innerHTML = `<td class="py-3 px-4 text-center">${data.item}</td>
                        <td class="py-3 px-4 text-center">€${data.price}</td>
                        <td class="py-3 px-4 text-center">${data.occurs}</td>
                        <td class="py-3 px-4 text-center">€${fullPrice}</td>
                        <td class="py-3 px-4">
                            <button onclick="increaseBasket(${data.id})" id="increaseBtn${data.id}"><img src="../public/images/icons/arrow-up.svg" alt="X" class="h-6 h-6"></button>
                        </td>
                        <td class="py-3 px-4">
                            <button onclick="deleteFromBasket(${data.id})"><img src="../public/images/icons/removeItem.svg" alt="X" class="h-6 h-6"></button>
                        </td>
                        <td class="py-3 px-4">
                            <button onclick="decreaseBasket(${data.id})"><img src="../public/images/icons/arrow-down.svg" alt="X" class="h-6 h-6"></button>
                        </td>
`
            showTest ? logThis("Price Table created :", false, "tr") : null;
        checkoutGrid.appendChild(tr);


        if (checkSoldAmount(data)) {
            showTest ? logThis("Maximum sold amount detected, increase button disabled", true) : null;
            const disableThisButton = document.getElementById(`increaseBtn${data.id}`)
            disableThisButton.disabled = true;
        }
    });

    createTotalPriceGrid(datas);
}

function  checkSoldAmount(data) {
    // for each increase button created, check if total current items exceeds amount in stock - disable if true
    const soldDatas = JSON.parse(localStorage.getItem("SOLD"));
    for (i = 0; i < soldDatas.length; i++) {
        if (parseInt(soldDatas[i]["id"]) === parseInt(data["id"])) {
            let totalSold = parseInt(soldDatas[i]["sold"]) + parseInt(data.occurs);
            // returns boolean response
            return totalSold > (data["amount"] - 1);
        }
    }
}

function createTotalPriceGrid(datas) {
    let finalPrice = 0;
    showTest ? logThis("Calculating total price and creating Table", true) : null;
    datas.forEach((data) => {
        finalPrice += (parseInt(data.price) * parseInt(data.occurs));
        showTest ? logThis('Current total : '+finalPrice, false, "int"): null;
        const trPrice = document.createElement("tr");

        if (document.querySelector(".tempRemove")) {
            const tempRemove =  document.querySelector(".tempRemove");
            showTest ? logThis("Removing unnecessary element : "+ tempRemove) : null;
            checkoutGrid.removeChild(tempRemove);
        }
        trPrice.classList.add("border-b", "border-blue-gray-200", "tempRemove");
        trPrice.innerHTML = `<td class="py-3 px-4 font-medium" colspan="3">Total Wallet Value</td>
                        <td class="py-3 px-8 font-medium text-left" colspan="4">€${finalPrice}</td>`
        showTest ? logThis("Total Price Section created :"+ trPrice, false, "object") : null;
        checkoutGrid.appendChild(trPrice);
    });

    showTest ? logThis("Price Table Creation Complete", true) : null;
}