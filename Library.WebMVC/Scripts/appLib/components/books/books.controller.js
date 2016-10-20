
(function () {

    angular.module('appLibrary.booksModule')
        .controller('BooksController', booksController);

    booksController.$inject = ['$scope', 'booksService'];

    /* */
    function booksController($scope, booksService) {
        var sc = $scope;

        sc.booksData = undefined;

        sc.reloadData = reloadData; /* обновление данных с сервера */

        sc.addItem = booksService.addItem;
        sc.removeItem = booksService.removeItem;
        sc.updateItem = booksService.updateItem;

        init(); /* первый запуск контроллера */

        function init() {
            return getBooksData()
                .then(function () { console.info('Data is loaded'); })
                .catch(function () { console.info('Data is not loaded'); });
        }

        function getBooksData() {

            sc.booksData = undefined;

            return booksService.getData()
                .then(thenOk)
                .catch(catchError);

            function thenOk(data) {
                sc.booksData = data;
                return sc.booksData;
            }

            function catchError(error) {
                sc.booksData = undefined;
            }
        }

        function reloadData() {
            sc.booksData = undefined;
            getBooksData();
        };

    }

})()