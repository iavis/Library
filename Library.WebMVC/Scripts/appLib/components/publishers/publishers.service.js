(function (app) {

    app.service('publishersService', publishersService);

    publishersService.$inject = ['$http', 'dataServiceFactory', 'publisherFactory'];

    function publishersService($http, dataServiceFactory, publisherFactory) {

        var serviceParams = {};

        serviceParams.urlGetData = '/PublishersNg/GetData';
        serviceParams.urlAddItem = '/PublishersNg/Create';
        serviceParams.urlRemoveItem = '/PublishersNg/Delete';
        serviceParams.urlUpdateItem = '/PublishersNg/Update';
        serviceParams.objectFactory = publisherFactory;

        return dataServiceFactory(serviceParams);


    };


})(angular.module('appLibrary.publishersModule'))



