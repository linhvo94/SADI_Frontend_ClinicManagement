export const sortListToPages = (list) => {
    var pageNum = 1;
    var count = 0;
    var listWithPagination = [];
    var listOf15Items = []
    var currentIndex;


    //put 15 items in the list into a page
    for (currentIndex = 0; currentIndex < list.length; currentIndex++) {
        count++;
        listOf15Items = listOf15Items.concat(list[currentIndex])
        if (count == 15) {
            listWithPagination = [].concat(listWithPagination, { pageNum: pageNum, listOf15Items: listOf15Items });
            count = 0;
            pageNum++;
            listOf15Items = [];
        }
    }

    //add the remainding to the last page
    if (currentIndex !== list.length - 1) {
        listOf15Items = listOf15Items.concat(list.slice(currentIndex, list.length));
        listWithPagination = [].concat(listWithPagination, { pageNum: pageNum, listOf15Items: listOf15Items });
    }

    return listWithPagination;
}