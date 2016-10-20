
/*
*
* Для создания объектов типа ИЗДАТЕЛЬСТВО
*
*/

(function (app) {

    app.factory('publisherFactory', publisherFactory);

    publisherFactory.$inject = [];

    function publisherFactory() {

        return factory;

        function factory(publisher) {

            var object = {
                id: publisher.id || 0,
                name: publisher.name || 'noName'
            };

            return object;
        }


    }

})(angular.module('appLibrary.publishersModule'))