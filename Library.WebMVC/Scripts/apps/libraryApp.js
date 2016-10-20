// определяем модуль нашего приложения 
// 
(function () {


   var app = angular.module('appLibrary', ['ngSanitize', 'lr.upload']);

    var isDefined = angular.isDefined,
        isBoolean = function (value) { return typeof value === 'boolean'; },
        isUndefined = angular.isUndefined,
        isFunction = angular.isFunction,
        isString = angular.isString,
        isNumber = angular.isNumber,
        isObject = angular.isObject,
        isArray = angular.isArray;


    /* Additional Array Function */
    (function () {

        /* функция возвращает количество раз вхождения элемента в массив  */
        Array.prototype.countOf = function (searchElement) {
            var i = 0,
                k = 0,
                n = 0,
                arr = Object(this);

            var len = arr.length;

            while (n < len) {
                if (n in arr && arr[n] === searchElement) {
                    k++;
                }
                n++;
            }

            return k;

        }
    })();


    /* КОНСТАНТЫ нашего модуля (begin)*/
    (function () {

        app.constant(
            'alphabets',
            [
                {
                    name: 'alphabetDg',
                    values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                    order: 100
                },
                {
                    name: 'alphabetEn',
                    values: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                             'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                    order: 200
                },
                {
                    name: 'alphabetRu',
                    values: ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р',
                             'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'],
                    order: 300
                }
            ]
            );

    })(); /* КОНСТАНТЫ нашего модуля (end) */


    /* ЗНАЧЕНИЯ нашего модуля (begin) */
    (function () {
    })();/*(end) ЗНАЧЕНИЯ нашего модуля */

    /* ФИЛЬТРЫ нашего модуля (begin) */
    (function () {

        /* Возврашает массив данных */
        app.filter("skipItems", function () {
            return function (value, count) {
                if (angular.isArray(value) && angular.isNumber(count)) {
                    if (count > value.length || count < 1) {
                        return value;
                    } else {
                        return value.slice(count);
                    }
                } else {
                    return value;
                }
            }
        });


        /* */
        app.filter("take", function ($filter) {
            return function (data, from, count) {
                var arr = $filter("skipItems")(data, from);
                return $filter("limitTo")(arr, count);
            }
        });


    })();/*(end) ФИЛЬТРЫ нашего модуля */


    /* СЕРВИСЫ нашего приложения (begin )*/
    (function () {

        /* Создает объект beginWord для хранения сводной информации о данных таблицы 
           beginWord - хранит информации о начальной букве(буквах) значения столбца таблицы,
           по которым установилен признак фильтрации isFilterBy = true
        */
        app.factory('beginWordFactory', function () {
            return function (name, count, subBeginWords) {
                if (!name) {
                    console.error("Не должно быть пустое ");
                }
                this.name = name;
                this.count = count || 0;
                // this.subBeginWords = isArray(subBeginWords) ? subBeginWords : [];
            }
        });


        /* Создает объект для хранения информации о столбце таблицы */
        app.factory('columnTableFactory', function () {
            /* 
                column = 
                {   
                    name  - имя столбца, как оно задано у источника данных 
                    vname - видимое название столбца
                    type  - типа столбца 
                    isVisible  - видимость столбца для пользователя 
                    isPossible - возможность редактирования 
                    isOrderBy - возможность сортировки по данному столбцу 
                    isFilterBy - возможность поиска по тексту в данном стоблце 
                }
            */
            return function (column) {

                var name = column.name,
                    vname = column.vname,
                    type = column.type,
                    isVisible = column.isVisible,
                    isEditable = column.isEditable,
                    isOrderBy = column.isOrderBy,
                    isFilterBy = column.isFilterBy,
                    _isData = column.isData || false,
                    _isPhoto = column.isPhoto || false,
                    _isNumber = column.isNumber || false;

                /* Проверка введенных значений */

                /* проверка введенного имени столбца, обязательно непустая строка */
                if (!(isString(name) && (name !== ''))) {
                    throw new Error("Имя столбца должно быть непустой строкой!!!");
                }

                /* проверка введного типа данных */
                if (isDefined(type)) {
                    var types = ['photo', 'text', 'number', 'data']; // доступные для обработки типы 
                    if (types.indexOf(type) === -1) {
                        console.warn("Указанный тип " + (type || '').toString());
                        throw new Error("Указаный тип данных недопустим!!!");
                    }
                } else {
                    type = "text";
                }

                /* Установка значений параметров по введенным данным */

                this.name = name; //наименование столбца
                this.vname = isString(vname) ? vname : this.name; //видимое наименование столбца
                this.type = type;

                this.isVisible = Boolean(isVisible);// флаг видимости в пердставленнии таблицы
                this.isEditable = Boolean(isEditable); // флаг доступности для редактирования
                this.isOrderBy = Boolean(isOrderBy); // флаг возможности сортировки по данному столбцу
                this.isFilterBy = Boolean(isFilterBy);// флаг возможности фильтровать по столбцу 

                this.isPhoto = Boolean(_isPhoto);
                this.isData = Boolean(_isData);
                this.isNumber = Boolean(_isNumber);

                /* если окажется так что поле доступно для редактирования, но при этом оно невидимо,
                   то нужно сделать его видимым */
                if (this.isEditable) { this.isVisible = true; }

            };
        });

        /* Создает объект для хранения и обработки информации для набора данных типа Таблица  */
        app.factory('dataTableFactory', ['$filter', 'beginWordFactory', function ($filter, beginWordFactory) {
            return function (data, columns, alphabets, beginnings) {

                var factoryThis = this;
                var _this = this;

                /* ДАННЫЕ */
                var _data = (function () {
                    return {
                        data: [], // массив данных из объектов типа {column0 : value0, ..., columnN : valueN}
                        columns: [], // массив объектов типа 'columnTableFactory', описывающий столбцы объектов массива данных  
                        beginnings: [], // массив объектов начальных букв                   
                        // must be next kind : [{A0, ... , An}], 
                        //    where Ai     = { order: value, values : array }
                        //          values = [V0,..,Vm]
                        //          Vi     = {word: val, count : val2 }
                        alphabets: [] // массив алфавитов начальных букв или цифр [A0, ..., An]
                        // where Ai = {order : val, values : [L0,...,Lm]}, Li - letter or word
                    }
                })();

                /* СОБЫТИЯ */
                var _events = (function () {

                    return {

                        /* События для _data.data */
                        beforeChangeData: function () { },
                        afterChangeData: function (beginnings) {
                            _this.setBeginnings(beginnings);
                        },

                        /*События для _data.columns */
                        beforeChangeColumns: function () { },
                        afterChangeColumns: function () { },

                        /*События для _data.beginnings */
                        beforeChangeBeginnings: function () { },
                        afterChangeBeginnings: function () { },

                        /*События для _data.alphabets */
                        beforeChangeAlphabets: function () { },
                        afterChangeAlphabets: function () { },

                    }

                })();

                /* функции проверки совместимости данных */
                /* TEST COMPATIBLE FUNCTIONS*/
                (function () {

                    /* проверка совместимости для _data.data */
                    factoryThis.isCompatibleWithData = function (data) {
                        return isArray(data) ? true : false;
                    }

                    /* проверка совместимости для _data.columns */
                    factoryThis.isCompatibleWithColumns = function (columns) {
                        return isArray(data) ? true : false;
                    }

                    /* проверка совместимости для _data.beginnings */
                    factoryThis.isCompatibleWithBeginnings = function (beginnings) {
                        return isArray(data) ? true : false;
                    }

                    /* проверка совместимости для _data.alphabets */
                    factoryThis.isCompatibleWithAlphabets = function (alphabets) {
                        return isArray(data) ? true : false;
                    }

                })();


                /* Функция возвращает массив данных */
                this.getData = function () {
                    return isArray(_data.data) ? _data.data : [];
                }
                /* Фукнция устанавливает массив данных и */
                this.setData = function (data, beginnings) {

                    _events.beforeChangeData();

                    _data.data = isArray(data) ? data : [];

                    _events.afterChangeData(beginnings);
                }

                /* get _data.columns */
                this.getColumns = function () {
                    return isArray(_data.columns) ? _data.columns : [];
                }
                /* set  _data.columns */
                this.setColumns = function (columns) {

                    _events.beforeChangeColumns();

                    _data.columns = isArray(columns) ? columns : [];

                    _events.afterChangeColumns();
                }

                /* get _data.beginnings */
                this.getBeginnings = function () {
                    return isArray(_data.beginnings) ? _data.beginnings : [];
                }

                /* set _data.beginnings */
                this.setBeginnings = function (beginnings) {

                    _events.beforeChangeBeginnings();

                    if (isArray(beginnings)) {

                        _data.beginnings = beginnings;

                    } else { // создадим новые 

                        var _beginnings = [];

                        /* столбцы по которым проходит фильтрация данных */
                        var filterByColumns = $filter('filter')(factoryThis.getColumns(), { isFilterBy: true });

                        /* массив для хранения первых букв значений полей */
                        var letters = [];

                        /* выбираем наши данные */
                        var data = _data.data;

                        /* по всем элементам набора данных */
                        data.forEach(function (item) {

                            /* по всем полям, которые участвуют в фильтрации данных */
                            filterByColumns.forEach(function (column) {

                                var value = item[column.name];

                                if (value !== '') {

                                    if (isString(value) || isNumber(value)) {

                                        letters.push(value.toString().substring(0, 1).toUpperCase());

                                    }
                                }
                            });

                        });


                        /* берем все наши алфавиты  */
                        var alphabets = factoryThis.getAlphabets();

                        /* начинаем считать буквы по алфавитам */
                        for (var i = 0; i < alphabets.length; i++) {
                            var alphabet = alphabets[i].values; // алфавит 

                            var beginWords = []; // массив объектов beginWords

                            /* пройдем по всем буквам(цифрам) алфавита, и посчитаем сколько раз они есть в letters */
                            alphabet.forEach(function (word /* letter or digit */) {
                                beginWords.push(new beginWordFactory(word, letters.countOf(word)));
                            });

                            _beginnings.push(beginWords);

                            _data.beginnings = _beginnings;
                        }
                    }
                    _events.afterChangeBeginnings();
                }


                /* get _data.alphabets */
                this.setAlphabets = function (alphabets) {
                    _events.beforeChangeAlphabets();
                    _data.alphabets = _this.isCompatibleWithAlphabets(alphabets) ? alphabets : [];
                    _events.afterChangeAlphabets();
                }

                /* set _data.alphabets */
                this.getAlphabets = function () {
                    var value = _data.alphabets;
                    return isArray(value) ? value : [];
                }

                /* remove item by hashKey from _data.data*/
                this.removeItemByHashKey = function (hashKey) {

                    var source = _data.data;

                    angular.forEach(source, function (item, index) {

                        /* найдем нужный элемент и удалим его */
                        if (item.$$hashKey === hashKey) {

                            //console.warn('Item will be removed ' + JSON.stringify(item));
                            source.splice(index, 1);

                            return;

                        };
                    });
                }


                /* выполним инициализацию объекта */

                this.setColumns(columns);

                this.setAlphabets(alphabets);

                this.setData(data, undefined);

            };
        }]);


        /* Сервис работы с объектами АВТОР (begin)*/
        app.service("authorsService", ['$http', 'dataTableFactory', 'columnTableFactory', 'alphabets', function ($http, dataTableFactory, columnTableFactory, alphabets) {

            /*Для указателя для контекст сервиса */
            var serviceThis = this;

            /* Создаем объект обработки данных по авторам  */
            this.authors = undefined;

            this.testPromise = function () {

                'use strict'

                var resolve = function (data) {
                    console.info('testPromise.resolve is OK ' + JSON.stringify(data));
                }

                var reject = function (error) {
                    console.warn('console.info(testPromise.reject is BAD  ');
                }

                return new Promise(function (resolve, reject) {

                    var i = 90;

                    for (; i < 100000;i++){

                    }

                    resolve(222);

                });


            }

            this.removeItem = function (item) {
                return $http({
                    method: 'POST',
                    url: 'LibTest/DeleteAuthor',
                    data: { 'id': item.id }
                    })
                    .then(
                        /* элемент удален на сервере */
                        function (data) {
                            /* удалим элемент из массива данных */
                            serviceThis.authors.removeItemByHashKey(item.$$hashKey);
                            console.info('Item is removed');
                            console.info(JSON.stringify(data));
                        },

                        /* неудачная попытка удаления элемента */
                        function (error) {
                            console.warn('Item is not removed');
                            console.warn(JSON.stringify(error));
                        });
            }

            /*Функция получения данных с сервера */
            this.loadData = function () {
                return $http({
                    method: 'POST',
                    url: 'LibTest/GetAuthorsData'
                })
                .then(
                    /* в случае успешного выполнения запроса */
                    function (response) {
                        /*  */
                        var data = response.data.authors;
                        var beginnings = response.data.beginnings;

                        /* задаем столбцы, с которыми будем работать */
                        var columns = [];
                        columns.push(new columnTableFactory({ name: 'id', vname: 'id', isVisible: true, isFilterBy: false}));
                        columns.push(new columnTableFactory({ name: 'photo', vname: 'Фото', isVisible: true, isFilterBy: false, type: 'photo', isPhoto: true }));
                        columns.push(new columnTableFactory({ name: 'firstName', vname: 'Имя', isVisible: true, isFilterBy: true, isOrderBy: true }));
                        columns.push(new columnTableFactory({ name: 'middleName', vname: 'Среднее имя / Отчество', isVisible: true, isFilterBy: true, }));
                        columns.push(new columnTableFactory({ name: 'lastName', vname: 'Фамилия', isVisible: true, isFilterBy: true, isOrderBy: true }));
                        columns.push(new columnTableFactory({ name: 'bookCount', vname: 'Кол-во книг', isVisible: true, isFilterBy: false }));

                        /* Добавим новый столбец кол-во книг и заполним его значениями */
                        data.forEach(function (item) {
                            item.bookCount = item.books.length;
                        });

                        serviceThis.authors = new dataTableFactory(data, columns, alphabets, beginnings);

                        /* добавим функцию, которая удаляет элемент на сервере  */
                        serviceThis.authors.onRemoveItem = function (item) {

                        }

                    },
                    /* в случае неуспешного выполнения запроса */
                    function (error) {
                        serviceThis.authors = [];
                        console.info(JSON.stringify(error));
                        console.warn('Не удалось загрузить данные!!!');
                    });
            }

        }]);/*(end) Сервис работы с объектами АВТОР */

        /* Сервис работы с объектами КНИГА (begin) */
        app.service("booksService", ['$http', 'dataTableFactory', function ($http, dataGridFactory) {

            /* Создаем объект обработки данных по книгам */
            this.books = undefined;

            /* загружаем данные из источника */
            this.load = function () { }


        }]);/*(end) Сервис работы с объектами КНИГА */


    })(); /*(end) СЕРВИСЫ нашего приложения */


    /* ДИРЕКТИВЫ  нашего приложения (begin)*/
    (function () {

        /* ДИРЕКТИВА  выводит панель кнопок перехода по начальным словам данных */
        //app.directive();


        /* Директива выводит панель кнопок перехода по листам таблицы */
        app.directive('swSheetNumButtonPanel', function () {
            return {
                scope: {
                    sheetNum: "=",
                    sheetCount: "=",
                    setSheetNum: "&"
                },
                link: function (scope, element, attrs) {

                    scope.onChangeSheetNum = function (num) {
                        scope.setSheetNum()(num);
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

                },
                restrict: "EACM",
                templateUrl: "Scripts/apps/dataGridView/_sheetNumButtonPanel.html"
            }
        });

        /* Директива выводит представление таблицы данных типа dataTableFactory */
        app.directive('swDataGridView', ['$filter', '$timeout', function ($filter, $timeout) {
            return {
                scope: {
                    source: '=source',
                    removeItem: '&removeItem',
                    reloadData: '&reloadData',
                },
                link: function (scope, element, attrs) {

                    /* Максимальное количество элементво отображаемых на одной странице таблицы */
                    scope.maxRows = 10;

                    scope.isLoading = true;

                    /* количество листов данных таблицы*/
                    scope.sheetCount = 0; // даже если нет ниодного элемента, все равно одна страница есть 

                    /* текущий номер листа данных таблицы */
                    scope.sheetNum = 0;

                    /* Если меняется '(SOURCE) ИСТОЧНИК ДАННЫХ' - меняем зависимые объекты */
                    scope.$watch("source", function () {
                        if (angular.isDefined(scope.source)) {

                            /* процес загрузки будет показан еще в течении 2 секунд*/
                            $timeout(function () { scope.isLoading = false; }, 2000);

                            var columns = scope.source.getColumns();

                            /* колонки, которые отображаются в таблице */
                            scope.visibleColumns = $filter('filter')(columns, { isVisible: true });

                            /* колонки, которые можно редактировать в таблице */
                            scope.editableColumns = $filter('filter')(columns, { isEditable: true });

                            /* массив данных для отображения на странице */
                            scope.data = scope.source.getData();

                            /* пересчитываем кол-во страниц */
                            scope.setSheetCount();
                        } else {
                            scope.isLoading = true;
                        }
                    });

                    scope.$watch("maxRows", function () {
                        if (angular.isDefined(scope.maxRows)) {

                            /* пересчитываем кол-во страниц */
                            scope.setSheetCount();
                        }
                    });

                    /* При изменении номера страницы данных */
                    scope.$watch("sheetNum", function () {
                        if (isDefined(scope.sheetNum)) {
                            scope.skipNum = scope.maxRows * scope.sheetNum;
                        }
                    });


                    /* функция вычисляет количество листов данных таблицы */
                    scope.setSheetCount = function () {

                        var _sheetCount = 0,
                            _data = scope.data,
                            _maxRows = scope.maxRows; // 

                        /* обязательно проверяем есть ли у нас массив данных */
                        if (isArray(_data)) {

                            /* обязательно проверяем указано ли у нас максимально количество строк  */
                            var _max = isNumber(_maxRows) ? _maxRows : 10;

                            /*  вычислим количество страниц */
                            _sheetCount = Math.ceil(_data.length / _max);

                        }

                        scope.sheetCount = _sheetCount;

                        /* проверим не выходит ли текущий номер листа за рамки */
                        scope.setSheetNum(scope.sheetNum);
                    }

                    /* устанавливает номер текущей страницы данных таблицы */
                    scope.setSheetNum = function (num) {

                        var _sheetCount = scope.sheetCount,
                            _sheetNum = 0;

                        if (isNumber(num)) {
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
                        
                        scope.maxRows = isNumber(num) ? num : 10; 
                    }


                    /*Функция возвращает ссылку на картинку */
                    scope.getPhotoRef = function (value) {

                        var imgFolder = "Content/img/";

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
                        scope.currentItem = isDefined(item) ? item : {};
                    }

                    /* Функция устанавливает текущий столбец сортировки */
                    scope.setSortColumn = function (column, desc) {

                        scope.sortColumn = (isDefined(desc) ? '-' : '+') + column.name;
                    }

                    /* Функция удаления элемента */
                    scope.onDeleteItem = function (item) {

                        /* проверяем является ли выбранный элемент объектом  */
                        if (angular.isObject(item)) {

                            /* пытаемся удалить элемент из массива данных - удаляем по $$hashKey объекта  */
                            scope.removeItem()(item);
                            //if (scope.source.removeItemByHashKey(item.$$hashKey)) {

                            //    /* после удаления элемента определим количество листов в таблице данных*/
                            //    scope.setSheetCount();

                            //}

                        }
                    }

                    scope.addItem = function () { }
                    scope.updateItem = function () { }

                    scope.isEditInListEnabled = false;
                    scope.isEditInFormEnabled = false;
                    scope.isDeleteItemEnabled = true;
                    scope.isCopyItemEnabed = false;

                    scope.deleteItemConfirmFormUrl = "Scripts/apps/Shared/_deleteItemConfirmForm.html";
                    scope.loaderDivUrl = "Scripts/apps/Shared/_loaderDiv.html";
                    scope.maxRowsButtonPanelUrl = "Scripts/apps/Shared/_maxRowsButtonPanel.html";

                },
                restrict: "EACM",
                templateUrl: "Scripts/apps/dataGridView/_dataGridView.html"
            }
        }]);

    })();/*(end) ДИРЕКТИВЫ  нашего приложения */


    /* КОНТРОЛЛЕРЫ нашего приложения  (begin)*/
    (function () {


        /* Контроллер для работы с авторами (begin) */
        app.controller('AuthorCtrl', ['$scope', 'authorsService', function ($scope, authorsService) {

            authorsService.testPromise();//.then(function () { console.info('it is OK ')});

            /* Загрузка данных из сервиса */ 
            $scope.loadData = function () {

                $scope.authors = undefined;

                /* Получаем данные из сервиса */
                authorsService.loadData()
                    .then(

                        /* в случае успешного выполнения */
                        function () {

                            $scope.loadInfo = "Данные загруженны";
                            $scope.authors = authorsService.authors;

                            $scope.removeItem = authorsService.removeItem;

                        },

                        /* в случае неуспешного выполнения */
                        function () {

                            $scope.authors = undefined;
                            console.warn("ERROR LOADING DATA");

                        })
                    .catch(function (error) {

                        $scope.loadInfo = "Данные НЕ загруженны";

                    });
            }

            $scope.loadData();

        }]);/*(end) Контроллер для работы с авторами */


        /* Контроллер для работы с книгами (begin)*/
        app.controller('BookCtrl', ['$scope', function ($scope) {

        }]);/*(end) Контроллер для работы с книгами */


    })(); /*(end) КОНТРОЛЛЕРЫ нашего приложения */



})()

