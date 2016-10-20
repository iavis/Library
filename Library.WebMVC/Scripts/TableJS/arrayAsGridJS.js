var $TableJS = $TableJS || {};

$TableJS.getArrayAsHtmlGrid = function (dataArray, cssClass) {

    var arr = angular.isArray(dataArray) ? dataArray : [];

    var tab = "<table class='table'>"
        
    if (arr.length === 0 ){

        tab += "<tr><td> Исходный массив не содержит строк </td></tr>";

    }else{
        // выводим столбцы 
        tab += "<tr>";
        for (var prop in arr[0]) {
            tab += "<th>";
            tab += prop;
            tab += "</th>";
        }
        tab += "</tr>";

        // выводим строки 
        arr.forEach(function (elem) {
            tab += "<tr>";
            for (var prop in arr[0]) {
                tab += "<td>";
                tab += elem[prop];
                tab += "</td>";
            }
            tab += "</tr>";
        });

    }

    tab += "</table>";
    return tab;
};




