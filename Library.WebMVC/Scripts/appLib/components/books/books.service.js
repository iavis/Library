
(function () {


    angular.module('appLibrary.booksModule')
        .service('booksService', booksService)


    booksService.$inject = ['$http', 'dataServiceFactory', 'bookFactory'];

    function booksService($http, dataServiceFactory, bookFactory) {

        var serviceParams = {},
            controllerPath = '/BooksNg';

        serviceParams.urlGetData = controllerPath + '/GetData';
        serviceParams.urlAddItem = controllerPath + '/Create';
        serviceParams.urlRemoveItem = controllerPath + '/Delete';
        serviceParams.urlUpdateItem = controllerPath + '/Update';
        serviceParams.objectFactory = bookFactory;

        return dataServiceFactory(serviceParams);

    }

})()