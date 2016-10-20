
(function () {

    angular.module('appLibrary.authorsModule')
        .service('authorsService', authorsService)

    authorsService.$inject = ['$http', 'dataServiceFactory', 'authorFactory'];

    function authorsService($http, dataServiceFactory, authorFactory) {

        var serviceParams = {},
            controllerPath = '/AuthorsNg';

        serviceParams.urlGetData = controllerPath + '/GetData';
        serviceParams.urlAddItem = controllerPath + '/Create';
        serviceParams.urlRemoveItem = controllerPath + '/Delete';
        serviceParams.urlUpdateItem = controllerPath + '/Update';
        serviceParams.objectFactory = authorFactory;

        return dataServiceFactory(serviceParams);

    }

})()