
(function () {

    angular.module('appLibrary.sharedModule')
        .filter("skipItems", skipItems)
        .filter("take",takeItems);


    skipItems.$inject = ['$filter'];
    takeItems.$inject = ['$filter'];


    /* Возвращает массив */
    function skipItems($filter) {
        return function (value, count) {
            if (angular.isArray(value) && angular.isNumber(count)) {
                if (count > value.length || count < 1) {
                    return value;
                } else {
                    return value.slice(count);
                }
            } else {
                return value;
            }
        }
    }

    /*Возвращает массив  */
    function takeItems($filter) {
        return function (data, from, count) {
            var arr = $filter("skipItems")(data, from);
            return $filter("limitTo")(arr, count);
        }
    }    

})()
