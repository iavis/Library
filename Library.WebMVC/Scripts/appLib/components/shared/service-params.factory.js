(function (app) {

    app.factory('serviceParamsFactory', serviceParamsFactory);

    serviceParamsFactory.$inject = [];

    function serviceParamsFactory() {

        return factory;

        function factory(params) {

            return {

                urlAddItem: params.urlAddItem || 'nothing.xxx', // url для добавления нового элемента
                urlRemoveItem: params.urlRemoveItem || 'nothing.xxx',  // url для удаления нового элемента
                urlUpdateItem: params.urlUpdateItem || 'nothing.xxx',  // url для обновления нового элемента
                objectFactory: params.objectFactory || function (item) { return item; }

            };
        }
    }

})(angular.module('appLibrary.sharedModule'))