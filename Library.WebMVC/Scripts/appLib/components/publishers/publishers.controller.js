
(function () {

    angular.module('appLibrary.publishersModule')
        .controller('PublishersController', publishersController);

    publishersController.$inject = ['$scope', 'publishersService'];

    /* */
    function publishersController($scope, publishersService) {
        var sc = $scope;

        sc.publishersData = undefined;

        sc.reloadData = reloadData; /* обновление данных с сервера */

        sc.addItem = publishersService.addItem; /* обработка добавления элемента */
        sc.removeItem = publishersService.removeItem; /* обработка удаления элемента */
        sc.updateItem = publishersService.updateItem; /* обработка обновления элемента */

        sc.dataService = publishersService; /* сервис работы с данными */ 

        init(); /* первый запуск контроллера */

        function init() {
            console.warn('There is init');
            return getPublishersData().then(function () {
                console.info('');
            });
        }

        function getPublishersData() {

            sc.publishersData = undefined;

            return publishersService.getData()
                .then(thenOk)
                .catch(catchError);

            function thenOk(data) {
                sc.publishersData = data;
                return sc.publishersData;
            }

            function catchError(error) {
                sc.publishersData = undefined;
                return error;
            }
        }

        function reloadData() {
            sc.publishersData = undefined;
            getPublishersData();
        };


        //function addItem(item) {
        //    return sc.dataService.addItem(item)
        //        .then(addItemOk)
        //        .catch(addItemFailed);

        //    function addItemOk(response) {
        //        return response;
        //    }
        //    function addItemFailed(error) {
        //        return error;
        //    }

        //}

        //function removeItem(item) {
        //    return sc.dataService.removeItem(item)
        //        .then(removeItemOk)
        //        .catch(removeItemFailed);

        //    function removeItemOk(response){
        //        return response;
        //    }
        //    function removeItemFailed(error) {
        //        return error;
        //    }

        //}

        //function updateItem(item) {
        //    return sc.dataService.updateItem(item)
        //        .then(updateItemOk)
        //        .catch(updateItemFailed);

        //    function updateItemOk(response) {
        //        return response;
        //    }
        //    function updateItemFailed(error) {
        //        return error;
        //    }

        //}




    }

})()