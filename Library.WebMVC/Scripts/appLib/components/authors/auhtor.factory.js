/*
*
* Для создания объектов типа АВТОР
*
*/

(function () {

    angular.module('appLibrary.authorsModule')
    .factory('authorFactory', authorFactory);

    authorFactory.$inject = [];

    function authorFactory() {

        return factory;

        function factory(author) {

            return {
                id: author.id  || 0,
                firstName: author.firstName  || 'NoFirstName',
                middleName: author.middleName || '',
                lastName: author.lastName || 'NoLastName',
                photo: author.photo ||  '',
                books: author.books || []
            };

        }

        /* */
        factory.prototype.shortName = function () {

        }

        /* */
        factory.prototype.longName = function () {

        }

    }

})()