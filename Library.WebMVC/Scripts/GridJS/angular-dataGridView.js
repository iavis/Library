
(function (angular) {
    angular.module("dataGridViewJs", [])
    .filter('orderByColumns', function () {
        return function (input, optional1, optional2) {
            var output;
            return output;
        }
    })
    .constant("dataGridViewTemplateFolder", 'Scripts/GridJS')
    .constant('alphabetRu', [
        'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й',
        'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф',
        'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'])
    .directive('swSheetNumButtonPanel', function (dataGridViewTemplateFolder) {
        return {
            scope: {
                sheetCount: "=sheetCount", /* количество кнопок */
                sheetNum: "=sheetNum", /* текущий номер листа  */
                setSheetNum: "&"
            },
            link: function (scope, element, attrs) {

                scope.buttons = [];

                scope.$watch("sheetCo111unt", function () {
                    //if (angular.isDefined(scope.source)) {
                    //    scope.columns = scope.source.getVisibleColumns();
                    //}
                });

                /* за изменением количества листов в таблице*/
                scope.$watch("sheetCount", function () {

                    var btns = [], 
                        max = 5, // шаг 
                        num = scope.sheetNum, // номер текущего листа 
                        cnt = scope.sheetCount, // всего листов
                        i = 1; // счетчик в цикле


                    if (angular.isNumber(cnt)) {
                        btns.push({ view: '1', val: 0 });
                        if (cnt > max) {
                            if (num < (max - 1)) {
                                for (; i < (max - 1) ; i++) {
                                    btns.push({ view: (i + 1).toString(), val: i });
                                }
                            }
                        } else {
                            for (var i = 0; i < cnt; i++) {
                                btns.push({ view: (i + 1).toString(), val: i });
                            }
                        }
                        btns.push({ view: (cnt - 1).toString(), val: cnt - 1 });
                    }
                    scope.buttons = btns;
                });

                scope.onChangeSheetNum = function (num) {
                    scope.setSheetNum()(num);
                }

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

            },
            restrict: "EACM",
            templateUrl: dataGridViewTemplateFolder + "/_swSheetNumButtonPanel.html"
        }
    })
    .directive('swAplhabetButtonPanel', function () {
        return {
            scope: {
                alphabet: "=alphabet",
                currentLetter: "=currentLetter",
                setCurrentLetter: "&"
            },
            controller: function ($scope) {
                //
            },
            link: function (scope, element, attrs) {

                scope.onChangeLetter = function (letter) {
                    scope.setCurrentLetter()(letter);
                };

                scope.isCurrentLetter = function (letter) {
                    return scope.currentLetter === letter;
                };

                scope.isZeroCount = function (count) {
                    return count === 0;
                };
            },
            restrict: "EACM",
            templateUrl: "Scripts/GridJS/_swAplhabetButtonPanel.html"
        }
    })
    .directive('swRowGridView', function () {
        return {
            scope: {
            },
            link: function (scope, element, attrs) {

            },
            restrict: "EACM",
            templateUrl: "Scripts/GridJS/_swRowGridView.html"
        }
    })
    .directive('swCellGridView', function () {
        return {
            scope: {
                item: "=itemSource",
            },
            controller: function ($scope) {
                //
            },
            link: function (scope, element, attrs) {

                scope.isPhoto = function (item) {
                    return item.type === 'photo';
                }

            },
            restrict: "EACM",
            templateUrl: "Scripts/GridJS/_swCellGridView.html"
        }
    })
    .directive('swDataGridView', function (alphabetRu, $filter) {
        return {
            scope: {
                source: '=source',
                alphabet: '=alphabet'
            },
            link: function (scope, element, attrs) {

                scope.removeByHashKey = function (sourceArray, hashKey) {
                    angular.forEach(sourceArray, function (obj, index) {
                        if (obj.$$hashKey === hashKey) {
                            sourceArray.splice(index, 1);
                            return;
                        };
                    });
                }

                scope.currentLetter = '*';

                scope.deleteConfirmForm = "Scripts/GridJS/_mdFormDeleteItem.html";

                /*Строка стольбцов для сотрировки выводимых данных */
                scope.getOrderingColumns = function () {
                    return $filter('filter')(scope.source.getColumns(), { isOrderBy: true });
                }

                scope.setSheetNum = function (num) {
                    scope.sheetNum = num;
                }

                /* счетчики для отслеживания событий */
                scope.$watch("item1111", function () {
                    if (angular.isDefined(scope.source)) {
                        scope.columns = scope.source.getVisibleColumns();
                    }
                });

                // переменные контроллера 
                scope.$watch("source", function () {
                    if (angular.isDefined(scope.source)) {
                        scope.columns = scope.source.getVisibleColumns();
                    }
                });

                scope.initLocal = function () {
                    if (angular.isDefined(scope.source)) {
                        scope.maxRows = scope.source.getMaxRows();
                        scope.skipNum = scope.maxRows * scope.source.getSheetNum();
                    }
                    console.info("INIT LOCAL  %d  === %d ", scope.maxRows, scope.skipNum);
                }

                scope.isPhoto = function (column) {

                    if ((angular.isString(column.type)) && (column.type == 'photo')) {
                        return true;
                    }
                    return false;
                }

                /*Функция возвращает ссылку на картинку */
                scope.getPhotoRef = function (value) {
                    // если значение ссылки задано - то его и возвращаем 
                    if (angular.isString(value)) {
                        return value;
                        // можно еще и проверку на существование файла 
                    }
                    // возвращаем значение по умолчанию
                    return "Content/img/res.jpg";
                }

                /* Функция сохранения элемента */
                scope.saveItem = function () {

                }

                /* Функция копирование элемента */
                scope.copyItem = function () {

                }

                /* Функция удаления элемента */
                scope.deleteItem = function (index, item) {

                    if (!confirm("Вы подтверждаете удаление?")) {
                        alert('НЕ Сейчас удалим');
                    } else {
                        alert('Сейчас удалим');
                    }

                    return;

                    if (angular.isUndefined(scope.onDeleteItem)) {
                        console.warn("Funcion 'onDeleteItem' is undefined ");
                        // просто удаляем элемент
                        var j = 0;
                        scope.source.getSelected().splice(index, 1);
                        var i = 0;
                    }
                }


                scope.setCurrentItem = function (item) {
                    scope.currentItem = item;
                }

                scope.isEditInListEnabled = function () { return false; };
                scope.isEditInFormEnabled = function () { return false; };
                scope.isDeleteItemEnabled = function () { return true; };
                scope.isCopyItemEnabed = function () { return false; };

            },
            restrict: "EACM",
            templateUrl: "Scripts/GridJS/_swDataGridView.html"
        }
    });

})(angular)

