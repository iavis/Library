
(function () {

    angular.module('appLibrary.sharedModule')
        .directive('swSheetNumButtonPanel', swSheetNumButtonPanel);

    swSheetNumButtonPanel.$inject = [];

    function swSheetNumButtonPanel() {
        
        var directive = {
            scope: scope,
            link: link,
            restrict: "EACM",
            templateUrl: "/Scripts/appLib/components/shared/views/_sheetNumButtonPanel.html"
        };

        return directive;

        var scope = {
            sheetNum: "=",
            sheetCount: "=",
            setSheetNum: "&"
        };

        /* -- */
        function link(scope, element, attrs) {

            scope.onChangeSheetNum = function (num) {
                scope.setSheetNum(num);
            };

            scope.incSheetNum = function (num) {
                var value = angular.isNumber(num) ? num : 1;
                scope.onChangeSheetNum(scope.sheetNum + value);
            }

            scope.isFirstSheetNum = function () {
                return (scope.sheetNum === 0);
            }

            scope.isLastSheetNum = function () {
                return (scope.sheetNum === (scope.sheetCount - 1));
            }

        };
    }

})()

