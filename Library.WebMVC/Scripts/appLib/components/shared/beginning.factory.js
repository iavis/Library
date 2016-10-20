/*
* Сервис создает объект  
*
*/

(function (app) {

    app.factory('beginningFactory', beginningFactory);

    beginningFactory.$inject = [];

    function beginningFactory() {

        return factory;

        function factory(name, count) {
            return {
                name: name || '*',
                count: count || 0
            }
        }
    }

})(angular.module('appLibrary.sharedModule'))