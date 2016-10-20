
(function () {


    angular.module('appLibrary.authorsModule')
    .controller('AuthorsController', authorsController);

    authorsController.$inject = ['$scope', 'authorsService'];

    /* Set the AuthorsController */
    function authorsController($scope, authorsService) {
        var sc = $scope;

        sc.authorsData = undefined; /* модель работы с АВТОРАМИ */

        sc.reloadData = reloadData; /* обновление данных с сервера */

        sc.addItem    = authorsService.addItem;
        sc.removeItem = authorsService.removeItem;
        sc.updateItem = authorsService.updateItem;

        init(); /* первый запуск контроллера */

        function init() {
            return getAuthorsData().then(function () {
                console.info('Activated Avengers View');
            });
        }

        function getAuthorsData() {

            sc.authorsData = undefined;

            return authorsService.getData()
                .then(thenOk)
                .catch(catchError);

            function thenOk(data) {
                sc.authorsData = data;
                return sc.authorsData;
            }

            function catchError(error) {
                sc.authorsData = undefined;
            }
        }

        function reloadData() {
            sc.booksData = undefined;
            getAuthorsData();
        };
    }


})()