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
    let articleList = datas.filter(data => data["cat"] === category);
    showTest ? logThis("Filtered data :"+JSON.stringify(articleList), false, `Articles in ${category} category`) : null;

    buildArticleGrid(articleList, "article_grid");
}

function buildArticleGrid(datas, grid) {
    showTest ? logThis("Grid : "+grid, false, "string") : null;
    const currentGrid = document.getElementById(grid);
    let i = 1;
    while (currentGrid.firstChild) {
        showTest ? logThis(`removing ${grid} child : ` + i) : null;
        currentGrid.removeChild(currentGrid.firstChild);
        i++;
    }


}


