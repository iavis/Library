(function () {

    angular.module('appLibrary.sharedModule')
        .factory('dataTableFactory', dataTableFactory);

    dataTableFactory.$inject = ['$filter', 'beginWordFactory'];

    function dataTableFactory($filter, beginWordFactory) {

        return factory;

        function factory(source) {

            var _this = this;
            var isArray = angular.isArray,
                isString = angular.isString,
                isNumber = angular.isNumber,
                isDefined = angular.isDefined;

            var _events = (function () {
                return {

                    /* События для _data.data */
                    beforeChangeData: function () { },
                    afterChangeData: function (beginnings) {
                        setBeginnings(beginnings);
                    },

                    /* События для _data.items */
                    beforeChangeItems: function () { },
                    afterChangeItems: function (beginnings) {
                        setBeginnings(beginnings);
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

                };
            })();
            var _data = (function () {
                return {
                    items: [], // массив данных из объектов типа {column0 : value0, ..., columnN : valueN}
                    columns: [], // массив объектов типа 'columnTableFactory', описывающий столбцы объектов массива данных  
                    beginnings: [], // массив объектов начальных букв                   
                    // must be next kind : [{A0, ... , An}], 
                    //    where Ai     = { order: value, values : array }
                    //          values = [V0,..,Vm]
                    //          Vi     = {word: val, count : val2 }
                    alphabets: [] // массив алфавитов начальных букв или цифр [A0, ..., An]
                    // where Ai = {order : val, values : [L0,...,Lm]}, Li - letter or word
                };
            })();

            /* проверка совместимости для _data.data */
            var isCompatibleWithData = function (data) {
                return isArray(data) ? true : false;
            };
            /* проверка совместимости для _data.columns */
            var isCompatibleWithColumns = function (columns) {
                return isArray(columns) ? true : false;
            };
            /* проверка совместимости для _data.beginnings */
            var isCompatibleWithBeginnings = function (beginnings) {
                return isArray(beginnings) ? true : false;
            };
            /* проверка совместимости для _data.alphabets */
            var isCompatibleWithAlphabets = function (alphabets) {
                return isArray(alphabets) ? true : false;
            };

            /* init */
            (function () {

                var columns   = source.columns
                var alphabets = source.alphabets;
                var items = source.items;

                setColumns(columns);
                setAlphabets(alphabets);
                setItems(items, undefined);

            })();

            var service = {
                getItems: getItems,
                setItems: setItems,
                getColumns: getColumns,
                setColumns: setColumns,
                getBeginnings: getBeginnings,
                setBeginnings: setBeginnings,
                setAlphabets: setAlphabets,
                getAlphabets: getAlphabets,
                addItem: addItem,
                removeItemByHashKey: removeItemByHashKey,
                replaceItemByKey : replaceItemByKey,
                counter : 0
            }

            return service;

            /* Функция возвращает массив данных */
            function getItems() {
                return isArray(_data.items) ? _data.items : [];
            }

            /* Фукнция устанавливает массив данных и */
            function setItems(items, beginnings) {

                _events.beforeChangeItems();
                //  console.info(JSON.stringify(data));
                _data.items = isArray(items) ? items : [];

                _events.afterChangeItems(beginnings);
            }

            /* get _data.columns */
            function getColumns() {
                return isArray(_data.columns) ? _data.columns : [];
            }

            /* set  _data.columns */
            function setColumns(columns) {

                _events.beforeChangeColumns();

                _data.columns = isArray(columns) ? columns : [];

                _events.afterChangeColumns();
            }

            /* get _data.beginnings */
            function getBeginnings() {
                return isArray(_data.beginnings) ? _data.beginnings : [];
            }

            /* set _data.beginnings */
            function setBeginnings(beginnings) {

                _events.beforeChangeBeginnings();

                if (isArray(beginnings)) {

                    _data.beginnings = beginnings;

                } else { // создадим новые 

                    var _beginnings = [];

                    /* столбцы по которым проходит фильтрация данных */
                    var filterByColumns = $filter('filter')(getColumns(), { isFilterBy: true });

                    /* массив для хранения первых букв значений полей */
                    var letters = [];

                    /* выбираем наши данные */
                    var data = _data.items;

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
                    var alphabets = getAlphabets();

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
            function setAlphabets(alphabets) {
                _events.beforeChangeAlphabets();
                _data.alphabets = isCompatibleWithAlphabets(alphabets) ? alphabets : [];
                _events.afterChangeAlphabets();
            }

            /* set _data.alphabets */
            function getAlphabets() {
                var value = _data.alphabets;
                return isArray(value) ? value : [];
            }

            function addItem(item) {
//                _data.data.push(item);
                _data.items.push(item);
                return true;
            }

            function removeItem() {
                return true;
            }

            /* remove item by hashKey from _data.items*/
            function removeItemByHashKey(hashKey) {

                var source = _data.items;

                angular.forEach(source, function (item, index) {

                    /* найдем нужный элемент и удалим его */
                    if (item.$$hashKey === hashKey) {

                        //console.warn('Item will be removed ' + JSON.stringify(item));
                        source.splice(index, 1);

                        return;

                    };
                });
            }

            /* replace item by Key from _data.items*/
            function replaceItemByKey(keyName, keyValue, newItem) {
                    
                if (angular.isUndefined(keyName)){
                    return;
                }

                var source = _data.items;

                angular.forEach(source, function (item, index) {
                    /* найдем нужный элемент и удалим его */
                    if (item[keyName] === keyValue) {

                        console.warn('Производим замену ');
                        console.warn(source[index]);
                        console.warn(newItem);

                        source[index] = newItem;
                        return;
                    };
                });
            }


        }
    }

})()