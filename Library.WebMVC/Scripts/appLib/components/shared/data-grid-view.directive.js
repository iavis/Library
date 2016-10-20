

(function () {

    /* Директива выводит представление таблицы данных типа dataTableFactory */
    angular.module('appLibrary.sharedModule')
        .directive('swDataGridView', swDataGridView);

    swDataGridView.$inject = ['$filter', '$timeout'];

    function swDataGridView($filter, $timeout) {

        var scope = {
            source: '=source',
            removeItem: '&removeItem',
            addItem: '&',
            updateItem: '&',
            reloadData: '&reloadData',
        };

        var directive = {
            scope: scope,
            link: link,
            restrict: "EACM",
            templateUrl: "/Scripts/appLib/components/shared/views/_dataGridView.html"
        };

        return directive;

        function link(scope, element, attrs) {
            var sc = scope;

            scope.deleteItemConfirmFormUrl = "/Scripts/appLib/components/shared/views/_deleteItemConfirmForm.html";
            scope.loaderDivUrl = "/Scripts/appLib/components/shared/views/_loaderDiv.html";
            scope.maxRowsButtonPanelUrl = "/Scripts/appLib/components/shared/views/_maxRowsButtonPanel.html";

            sc.orderDirection = "+"; // направление сортировки по умолчанию 
            sc.orderColumn = "1"; // стоблец сортировки по умолчанию, если не задан, то первый 

            scope.isEditInListEnabled = true; /* Достпуность опции - Редактировать элемент в списке */
            scope.isEditInFormEnabled = true; /* Достпуность опции - Редактировать элемент в форме */
            scope.isDeleteItemEnabled = true; /* Достпуность опции - Удалить элемент*/
            scope.isCopyItemEnabed = false; /* Достпуность опции - Копировать элемент*/
            scope.isMultiEditEnabled = false; /* Доступность редактировать несколько элементов в строках */

            scope.maxRows = 5; /* Максимальное количество элементво отображаемых на одной странице таблицы */
            scope.sheetCount = 0; /* количество листов данных таблицы*/
            scope.sheetNum = 0; /* текущий номер листа данных таблицы */

            scope.isLoading = true; /* для отслежования процесса загрузка данных в таблицу */

            sc.newItem = {}; // 
            sc.editItems = []; // Вспомогательный элемент для редактирования существующего элемента

            scope.setSheetNum = setSheetNum; /*ф-я установки текущего листа */

            sc.onAddItem = onAddItem;
            sc.onDeleteItem = onDeleteItem;
            sc.onUpdateItem = onUpdateItem;

            sc.toggleEdit = toggleEdit; // включает/отключает режим редактирования элемента
            sc.cancelEdit = cancelEdit; // выключает редим редактирования без сохранения данных

            scope.$watch("source", onChangeSource); /* При изменении источника данных */
            scope.$watch("maxRows", onChangeMaxRow); /* При изменении маскимального количества строк в таблице */
            scope.$watch("sheetNum", onChangeSheetNum); /* При изменении текущего листа в таблице */

            function onChangeSource() {
                if (angular.isDefined(scope.source)) {

                    sc.additions = sc.source.getAdditions();
                    sc.selectedItem = 27;

                    /* процес загрузки будет показан еще в течении 2 секунд*/
                    $timeout(function () { scope.isLoading = false; }, 1200);

                    var columns = scope.source.getColumns();

                    /* колонки, которые отображаются в таблице */
                    scope.visibleColumns = $filter('filter')(columns, { isVisible: true });

                    /* колонки, которые можно редактировать в таблице */
                    scope.editableColumns = $filter('filter')(columns, { isEditable: true });

                    /* массив данных для отображения на странице */
                    scope.items = scope.source.getItems();

                    /* пересчитываем кол-во страниц */
                    scope.setSheetCount();
                } else {
                    scope.isLoading = true;
                }
            }

            function onChangeMaxRow() {
                if (angular.isDefined(scope.maxRows)) {
                    /* пересчитываем кол-во страниц */
                    scope.setSheetCount();
                }
            }

            function onChangeSheetNum() {
                if (angular.isDefined(scope.sheetNum)) {
                    scope.skipNum = scope.maxRows * scope.sheetNum;
                }
            }

            /* функция вычисляет количество листов данных таблицы */
            scope.setSheetCount = function () {

                var _sheetCount = 0,
                    _items = scope.items,
                    _maxRows = scope.maxRows; // 

                /* обязательно проверяем есть ли у нас массив данных */
                if (angular.isArray(_items)) {

                    /* обязательно проверяем указано ли у нас максимально количество строк  */
                    var _max = angular.isNumber(_maxRows) ? _maxRows : 10;

                    /*  вычислим количество страниц */
                    _sheetCount = Math.ceil(_items.length / _max);

                }

                scope.sheetCount = _sheetCount;

                /* проверим не выходит ли текущий номер листа за рамки */
                scope.setSheetNum(scope.sheetNum);
            }

            /* устанавливает номер текущей страницы данных таблицы */
            function setSheetNum(num) {

                var _sheetCount = scope.sheetCount,
                    _sheetNum = 0;

                if (angular.isNumber(num)) {
                    if ((num < _sheetCount) && (num > -1)) {
                        _sheetNum = num;
                    }
                    else {
                        _sheetNum = (num >= _sheetCount) ? (_sheetCount - 1) : 0;
                        console.log(
                            'Попытка установить номер листа больше чем это возможно.' +
                            'Устанавливаемый номер ' + num.toString() +
                            '. Максимально возможный ' + (_sheetCount - 1)
                            );
                        console.info(_sheetNum);
                    }
                }

                scope.sheetNum = _sheetNum;

            }

            scope.setMaxRows = function (num) {

                scope.maxRows = angular.isNumber(num) ? num : 10;
            }

            /*Функция возвращает ссылку на картинку */
            scope.getPhotoRef = function (value) {

                var imgFolder = "/Content/img/";

                // если значение ссылки задано - то его и возвращаем 
                if (angular.isString(value)) {
                    return imgFolder + value;
                    // можно еще и проверку на существование файла 
                }
                // возвращаем значение по умолчанию
                return imgFolder + "res.jpg";
            }

            /* Функция устанавливает текущий элемент, над которым выполняются действия в данных момент */
            scope.setCurrentItem = function (item) {
                scope.currentItem = angular.isDefined(item) ? item : {};
            }

            /* Функция устанавливает текущий столбец сортировки */
            scope.setSortColumn = function (column, desc) {

                sc.orderDirection = (angular.isDefined(desc) ? '-' : '+');
                sc.orderColumn = column.name;

                scope.sortColumn = (angular.isDefined(desc) ? '-' : '+') + column.name;
            }

            function onDeleteItem(item) {

                /* проверяем является ли выбранный элемент объектом  */
                if (angular.isObject(item)) {

                    /* пытаемся удалить элемент из массива данных*/
                    scope.removeItem()(item)
                        .then(function () { sc.setSheetCount(); })
                        .catch(function () { });
                    // пересчитаем кол-ко страниц
                }
            }

            function onAddItem(item, form) {

                /* проверяем является ли выбранный элемент объектом  */
                if (angular.isObject(item)) {

                    /* пытаемся добавить новый элемент */
                    scope.addItem()(item)
                        .then(function () {
                            sc.newItem = {}; // обнулим объект 
                            sc.setSheetCount(); // пересчитаем страницы
                            form.$setPristine(); // сбросим форму
                        });

                }
            }

            function onUpdateItem(item) {

                /* проверяем является ли выбранный элемент объектом  */
                if (angular.isObject(item.$edit)) {
                    /* пытаемся обновить новый элемент */
                    sc.updateItem()(item.$edit)
                        .then(function () {
                            //alert('Элемент успешно обновлен!!!');
                            item.isEdit = false;
                        })
                        .catch(function () {
                            alert('!!! Не удалось обновить элемент !!!');
                            item.isEdit = true;
                        });
                }

                return true;
            }

            function toggleEdit(item, form) {

                if (!item.isEdit) {
                    item.isEdit = true; // переводим элемент в режим редактирования 
                    item.$edit = {};
                    var columns = scope.source.getColumns();
                    columns.forEach(function (column) { item.$edit[column.name] = item[column.name]; });

                    if (sc.isMultiEditEnabled) {
                        sc.editItems.forEach(function (elem) { elem.isEdit = false; elem.edit })
                    }
                }
                else {
                    /* если есть изменения то отправляем запрос на изменение данных */
                    if (form.$dirty) {
                        onUpdateItem(item);
                    } else {
                        item.isEdit = false; // выводим элемент из режима редактирования 
                        item.$edit = {};
                    }
                }
            }

            function cancelEdit(item) {
                item.isEdit = false;
            }

        }
    }

})()