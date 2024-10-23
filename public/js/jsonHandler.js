function getProductJson(direction, extra=null){
    showTest ? logThis("Fetching JSON data for "+direction.toUpperCase()) : null;
    fetch("js/products.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(datas) {
          //  showTest ? logThis("Received this :"+JSON.stringify(datas)) : null;
                handleJsonData(datas, direction, extra);
        })
        .catch(error => console.error('Error fetching datas:', error));
}

function handleJsonData(datas, direction, extra) {
    // check which function asked for JSON and act accordingly
    switch (direction) {
        case "categoryBuild" :
            buildCategoryGrid(datas);
            break;
        case "selectedCat" :
            buildByCatSelection(datas, extra);
            break;
        case "article_grid" :
            // for the article grid, only the last 4 items added to the JSON are needed
            const artData = datas.slice((datas.length -4),datas.length);
            buildArticleGrid(artData,direction);
            break;
        case "recommended_grid" :
            // to guarantee uniqueness between grids, first remove the 'new arrivals'
            const data = datas.slice((datas.length -4),datas.length);
            const restData = datas.filter(item => !data.includes(item));
            const shuffledData = restData.sort((a, b) => 0.5 - Math.random());
            const recoData = shuffledData.slice(0,4);
            buildArticleGrid(recoData,direction);
            break;
        case "storageSold" :
            createSoldItems(datas);
            break;
    }
}
if (!localStorage.getItem("SOLD")) {
    showTest ? logThis("No local storage found. Creating a new one", true) : null;
    getProductJson("storageSold");
}
    if (document.getElementById("article_grid") && document.getElementById("recommended_grid")) {
        // only activated if art_grid is present (therefore current page = homepage)
        getProductJson("categoryBuild");
        getProductJson("article_grid");
        getProductJson("recommended_grid");
    }

