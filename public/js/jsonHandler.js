function getProductJson(direction, extra=null){
    showTest ? logThis("Fetching JSON data", true, "JSON") : null;
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
        case "recommended_grid" :
            const data = datas.slice((datas.length -4),datas.length);
            const restData = datas.filter(item => !data.includes(item));
            const shuffledData = restData.sort((a, b) => 0.5 - Math.random());
            const recoData = shuffledData.slice(0,4);
            buildArticleGrid(recoData,direction);
            break;
        case "storageSold" :
            createSoldItems(datas);
            break
    }
}

getProductJson("categoryBuild");
getProductJson("article_grid");
getProductJson("recommended_grid");
