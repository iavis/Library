/*
*
* Для создания объектов типа КНИГА
*
*/

(function () {

    angular.module('appLibrary.booksModule')
    .factory('bookFactory', bookFactory);

    bookFactory.$inject = [];

    function bookFactory() {

        return factory;

        function factory(book) {

            return {
                id: book.id || 0,
                name: book.name || 'noName',
                pageCount: book.pageCount || 1,
                year: book.year || 2016,
                isbn: book.isbn || '',
                photo: book.photo || '',
                publisher: book.publisher || {},
                authors: book.authors || []
            };
        }

    }

})()