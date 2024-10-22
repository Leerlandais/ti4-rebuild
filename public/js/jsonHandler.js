function getProductJson(direction, extra=null){
    showTest ? logThis("Fetching JSON data", true, "JSON") : null;
    fetch("js/products.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(datas) {
            showTest ? logThis("Received this :"+JSON.stringify(datas)) : null;
            handleJsonData(datas, direction, extra);
        })
        .catch(error => console.error('Error fetching datas:', error));
}

function handleJsonData(datas, direction, extra) {
    switch (direction) {
        case "categoryBuild" :
            buildCategoryGrid(datas);
            break;
        case "selectedCat" :
            buildByCatSelection(datas, extra);
            break;
        case "article_grid" :
            const artData = datas.slice((datas.length -4),datas.length);
            buildArticleGrid(artData,direction);
            break;
    }
}

getProductJson("categoryBuild");
getProductJson("article_grid");
