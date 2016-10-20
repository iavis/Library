
(function(app){

    app.directive('swInputView', swInputView);

    swInputView.$inject = [];

    function swInputView() {

        var scope = {
            itemModel: '=',
            itemName: '=',
            itemParams: '=',
            itemForm: '='
        };

        var directive = {
            scope: scope,
            link: link,
            restrict: "EACM",
            templateUrl: "/Scripts/appLib/components/shared/views/_input-view.html"
        };

        return directive;

        function link(scope, element, attrs) {
            var sc = scope;

            sc.isRequired = isRequired;

            function isRequired(){
                var val = sc.item.isRequired;
                return angular.isDefined(val) ? val : false;
            }

        }

    }


})(angular.module('appLibrary.sharedModule'))




