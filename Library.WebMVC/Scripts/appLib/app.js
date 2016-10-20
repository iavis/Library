
(function () {

    angular.module('appLibrary',
        [
        'appLibrary.authorsModule',
        'appLibrary.booksModule',
        'appLibrary.publishersModule',
        'appLibrary.sharedModule'
        ]);

    angular.module('appLibrary')
        .controller('MainController', mainController);

    mainController.$inject = ['$scope'];

    function mainController($scope) {
        var vm = this;

        $scope.AuthorsUrl = '/Scripts/appLib/components/authors/views/authors.view.html';
        $scope.BooksUrl = '/Scripts/appLib/components/books/views/books.view.html';
        $scope.PublishersUrl = '/Scripts/appLib/components/publishers/views/publishers.view.html';

        return vm;
    }

})()