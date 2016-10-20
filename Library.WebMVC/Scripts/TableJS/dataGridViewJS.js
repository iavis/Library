var $TableJS = $TableJS || {};

/* создает объект таблица похожий на DataGridView из ASP.NET WebForms */
/* 
    data, 
    alphabet, 
    columns, 
    letter, 
    maxRows

*/
$TableJS.rrr = { re: 234, rer: 667 };

$TableJS.dataGridView = function (data, alphabet, columns, letter, maxRows, visibleColumns ) {

    var _alphabetRu = [
        'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й',
        'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф',
        'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];


    var isDefined = angular.isDefined,
        isBoolean = function (value) { return typeof value === 'boolean'; },
        isUndefined = angular.isUndefined,
        isFunction = angular.isFunction,
        isString = angular.isString,
        isNumber = angular.isNumber,
        isObject = angular.isObject,
        isArray = angular.isArray;

    console.log("isBoolean");
    console.log(isBoolean(false));

    var rowGridViev = function () {

        this.beforeChange = function (elem) {

        }

        this.onChange = function (elem) {

        }

        this.afterChange = function (elem) {

        }

    }

    /* 
        объект - столбец таблицы 
        params:   
            name  - имя столбца, как оно задано у источника данных 
            vname - видимое название столбца
            type  - типа столбца 
            isVisible  - видимость столбца для пользователя 
            isPossible - возможность редактирования 
            isOrderBy - возможность сортировки по данному столбцу 
            isFilterBy - возможность поиска по тексту в данном стоблце 
    */
    var gridColumn = function (column) {

        var name = column.name,
            vname = column.vname,
            type = column.type,
            isVisible = column.isVisible,
            isPossible = column.isPossible,
            isOrderBy = column.isOrderBy,
            isFilterBy = column.isFilterBy;
        
        /* проверка введенного имени столбца, обязательно непустая строка */
        if ((isString(name) && (name !== ''))) {
            this.name = name;
        } else {
            throw new Error("Имя столбца должно быть непустой строкой!!!");
        }

        /* проверка введеного отображаего имени столбца */
        this.vname = isString(vname) ? vname : this.name; 

        /* проверка введного типа данных */
        if (isDefined(type)) {
            var types = ['photo', 'text', 'number', 'data'];
            if (types.indexOf(type) !== -1) {
                this.type = type;
            } else {
                console.warn("Указанный тип " + (type || '').toString());
                throw new Error("Указаный тип данных недопустим!!!");
            }
        }else{ 
            this.type = "text";
        }

        /* флаг видимости */ 
        this.isVisible = Boolean(isVisible);

        /* флаг доступности для редактирования */
        this.isPossible = Boolean(isPossible); 

        /* флаг возможности сортировки по данному столбцу  */
        this.isOrderBy = Boolean(isOrderBy);

        /* флаг возможности фильтровать по столбцу  */
        this.isFilterBy = Boolean(isFilterBy);

        /* если окажется так что поле доступно для редактирования, но при этом оно невидимо,
           то нужно сделать его видимым */
        if ((!this.isVisible) && (this.isPossible)) { this.isVisible = true;}

    }

    /* значения и настройки таблицы */
    var _data = (function(context){
        return {
            data: undefined, // массив данных
            columns: undefined, // свойства объектов в массиве данных
            visibleColumns: undefined, // видимые столбцы таблицы  {name: 'name', isPhoto : true, type : 'text|number|date'}
            selectColumns: undefined, // колонки по которым происходит отбор данных
            letter: undefined, // буква или подстрока для отбора значений 
            maxRows: undefined, // макс.кол-во строк отображаемых в таблице
            sheetNum: undefined, // номер отображаемого листа  
            sheetCount: undefined, // количество листов 
            alphabet: undefined, // массив букв в формате {name - буква, count - количество слов начинающихся на эту букву }
            selected: undefined, // массив - отобранных значений из массива данных
            flagTopAlphabetButtonPanel : true,  // флаг показа сверху панели кнопок перехода по буквам отбора 
            flagBottomAlphabetButtonPanel : false,  // флаг показа снизу панели кнопок перехода по буквам отбора
            flagTopNumBottonPanel: true, // флаг показа сверху панели кнопок перехода по листам таблицы
            flagBottomNumBottonPanel: false,// флаг показа снизу панели кнопок перехода по листам таблицы
        };
    })(this)

    /* события таблицы */
    var _events = (function (context) {

        return {
            /*функция вызывется перед началом изменения массива данных таблицы _data.data */
            beforeChangeData: function () { /* функция выполняется после изменения */
                //do nothing
            },
            /*функция вызывется после изменения массива данных таблицы _data.data */
            afterChangeData: function (alphabet) { /* функция выполняется после изменения */
                context.setAlphabet(alphabet);
            },

            /*функция вызывется перед началом изменения _data.aplphabet */
            beforChangeAplhabet: function () {
                //do nothing
            },
            /*функция вызывется после изменения _data.aplphabet */
            afterChangeAplhabet: function () { /* функция выполняется после изменения */
                context.setLetter();
            },

            /* функция вызывется перед началом изменения _data.columns */
            beforeChangeColumns: function () {/* функция выполняется после изменения */
                // do nothing 
                console.info('beforeChangeColumns');
            },
            /* функция вызывется после изменения _data.columns */
            afterChangeColumns: function () {/* функция выполняется после изменения */
                // do nothing 
                console.info('afterChangeColumns');
            },

            afterChangeLetter: function () { /* функция выполняется после изменения */
                context.setSelected();
            },

            afterChangeSelected: function () {/* функция выполняется после изменения */
                context.setSheetCount();
            },

            afterChangeSheetCount: function () {/* функция выполняется после изменения */
                context.setSheetNum();
            },

            afterChangeSheetNum: function () {/* функция выполняется после изменения */
                // do nothing 
            },

            afterChangeMaxRows: function () {/* функция выполняется после изменения */
                context.setSheetCount();
            }
        }
    })(this);

    /* функции работы со свойствами таблицы */
    this.setLetter = function (letter) {
        _data.letter = angular.isString(letter) ? letter : '*';
        console.warn('Current letter ' + _data.letter);
        _events.afterChangeLetter(); // обработаем зависимости
    };
    this.getLetter = function(){return _data.letter || '';}

    /* функция установки */
    this.setMaxRows = function (max) {
        _data.maxRows = angular.isString(max) ? max : 3;
        _events.afterChangeMaxRows(); // обработаем зависимости
    };
    this.getMaxRows = function () { return _data.maxRows || 5; }

    /* функция установки */
    this.setSheetNum = function (num) {
        console.warn("setSheetNum " + (num || '').toString());
        if (isNumber(num)) {
            if ((num < _data.sheetCount) && (num > -1)) {
                _data.sheetNum = num;
            }
            else {
                console.log(
                    'Попытка установить номер листа больше чем это возможно.' +
                    'Устанавливаемы номер ' + num.toString() +
                    '. Максимально возможный ' + _data.sheetCount
                    );
            }
        }
        else {
            _data.sheetNum = 0;
            console.log("Входящий  " + (num || '').toString() + " => Установлен " + _data.sheetNum.toString());
        }
        _events.afterChangeSheetNum(); // обработаем зависимости 
    };
    this.getSheetNum = function () { return _data.sheetNum || 0; };

    /* функция определяет количество листов в таблице  */
    this.setSheetCount = function() {
        
        // обязательно проверяем есть ли у нас массив данных 
        var arr = angular.isArray(_data.selected) ? _data.selected : {};
        
        // обязательно проверяем указано ли у нас максимально количество строк  
        var max = angular.isNumber(_data.maxRows) ? _data.maxRows : 1;
       
        // вычислим количество страниц
        _data.sheetCount = Math.ceil(arr.length / max);

        _events.afterChangeSheetCount(); // обработаем зависимости

    };     
    this.getSheetCount = function(){ return _data.sheetCount || 1;}

    /* функция установки массива данных*/
    this.setData = function(data, alphabet){
        _data.data = angular.isArray(data) ? data : [];
            
        _events.afterChangeData(alphabet); // обработаем зависимости 
    };
    this.getData = function () { return _data.data || [];}

    /* */    
    this.setAlphabet = function(alphabet){

        if (angular.isArray(alphabet)){
            _data.alphabet = alphabet;
        }else{ // сформируем алфавит по массиву данных
            _data.alphabet = [];
            var arr = [];

            _alphabetRu.forEach(function (elem) {
                arr.push({name:elem, count:0});
            });

            /* выберем все колонки по которым проводиться фильтрация данных */
            var columns = this.getFilterByColumns();

            // пройдем по каждому элемент массива данных 
            _data.data.forEach(function (elem) {
                // пройдем по каждому столбцу фильтрации элемента
                columns.forEach(function (column) {
                    // добавим в массив алфавита первую букву 
                    var val = elem[column.name];
                    if (isString(val) || isNumber(val)){
                        if (val !== ''){
                            arr.push({ name: val.toString().trim().substring(0, 1).toUpperCase(), count: 1 });
                        }
                    }
                })
            });

            arr.sort(function (a, b) {
                var keyA = a.name,
                    keyB = b.name;
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });

            // нужно свернуть буквы и просуммировать по ним количество 
            var grouped = function (data, key, prop) {
                var keys  = [];
                var values = [];

                data.forEach(function (item) {
                    var keyValue = item[key];
                    var propValue = item[prop];
                    var idx = keys.indexOf(keyValue)
                    if (idx === -1) {
                        keys.push(keyValue);
                        values.push(propValue);
                    } else {
                        values[idx] += propValue;
                    }
                });

                var res = [];
                for (var i = 0; i < keys.length; i++) {
                    var item = {};
                    item[key] = keys[i];
                    item[prop] = values[i];
                    res.push(item);
                }

                return res;
            };

            _data.alphabet = grouped(arr, 'name','count');
        }

        var count = 0; // всего значений для фильтрации

        _data.alphabet.forEach(function (elem) { count += elem.count;});

        _data.alphabet.unshift({name : '*', count : count});
            
        _events.afterChangeAplhabet();
    },
    this.getAlphabet = function (value) {
        console.info('ЗАПРОС к  getAlphabet %d', value);
        return _data.alphabet || [];
    }

    /* функция установки массива свойств объектов массива данных*/
    this.setColumns = function (columns) {
        _events.beforeChangeColumns();

        console.warn('setColumns');
        _data.columns = [];
        if (isArray(columns)) {
            columns.forEach(function (elem) {
                _data.columns.push(new gridColumn(elem));
            });
        }else{
            console.warn("Не указано ниодного столбца для таблицы данных");
        }

        _events.afterChangeColumns();

    };
    this.getColumns = function () {
        //console.warn('getColumns');
        return _data.columns || [];
    }

    /* функция установки массива видимых столбцов массива данных*/
    this.setVisibleColumns = function (visibleColumns) {
        console.info('setVisibleColumns');
        _data.visibleColumns = visibleColumns || [];
    }
    this.getVisibleColumns = function () {
        console.info('getVisibleColumns');
        if (isArray(_data.columns)) {
            //console.warn(_data.columns);
            return _data.columns.filter(function (elem) {
                return elem.isVisible === true;
            });
        }else{
            console.warn([]);
            return [];
        }
    }

    this.getFilterByColumns = function(){
        if (isArray(_data.columns)) {
            return _data.columns.filter(function (elem) {
                return elem.isFilterBy === true;
            });
        }else{
            console.warn([]);
            return [];
        }
    }

    /* функция установки массива данных*/
    this.setSelected = function () {

        _data.selected = (function (context, subStr, everyWhere) {
            var _subStr = subStr || _data.letter;

            var arr = angular.isArray(_data.data) ? _data.data : [];

            if (angular.isString(_subStr)) {

                if (_subStr === '*') {
                    return arr;
                }

                var func; // функция условия отбора 

                var filterByColumns = context.getFilterByColumns();
                var fields = _data.columns;

                if (angular.isUndefined(everyWhere)) {
                    func = function (elem) {
                        
                        return filterByColumns.some(function (column) {
                            return (elem[column.name] || '').indexOf( _subStr ) === 0 ; 
                        });

                        return (elem.firstName || '').indexOf(_subStr) === 0 ||
                            (elem.middleName || '').indexOf(_subStr) === 0 ||
                            (elem.lastName || '').indexOf(_subStr) === 0;
                    }
                }
                else {
                    func = function (elem) {
                        return elem.firstName.indexOf(_subStr) !== -1 ||
                            elem.middleName.indexOf(_subStr) !== -1 ||
                            elem.lastName.indexOf(_subStr) !== -1;
                    }
                }

                var t = arr.filter(func);
                return t;
            }

            return arr;
        })(this);

        _events.afterChangeSelected();
    };
    this.getSelected = function () { return _data.selected || [];}

    /*функция увеличивает значение */
    this.incSheetNum = function (num) {
        console.log("incSheetNum  Входящий  " + (num || '').toString() + " => Установлен " + _data.sheetNum.toString());
        console.log("Текущее значение this.getSheetNum() == " + (this.getSheetNum()).toString());

        this.setSheetNum(this.getSheetNum() + (angular.isNumber(num) ? num : 1));
    };

    this.isFirstSheetNum = function () {
        return this.getSheetNum() === 0 ? true : false;
    };

    this.isLastSheetNum = function () {
        return this.getSheetNum() === (this.getSheetCount() - 1) ? true : false;
    };

    /* get- set- */
    this.getFlagTopAlphabetButtonPanel = function(){
        return Boolean(_data.flagTopAlphabetButtonPanel);
    }
    this.setFlagTopAlphabetButtonPanel = function (flag) {
        _data.flagTopAlphabetButtonPanel = Boolean(flag);
    }
    
    /* get- set- */
    this.getFlagBottomAlphabetButtonPanel = function () {
        return Boolean(_data.flagBottomAlphabetButtonPanel);
    }
    this.setFlagBottomAlphabetButtonPanel = function (flag) {
        _data.flagBottomAlphabetButtonPanel = Boolean(flag);
    }

    /* get- set- */
    this.getFlagTopNumBottonPanel = function () {
        return Boolean(_data.flagTopNumBottonPanel);
    }
    this.setFlagTopNumBottonPanel = function (flag) {
        _data.flagTopNumBottonPanel = Boolean(flag);
    }

    /* get- set- */
    this.getFlagBottomNumBottonPanel = function () {
        return Boolean(_data.flagBottomNumBottonPanel);
    }
    this.setFlagBottomNumBottonPanel = function (flag) {
        _data.flagBottomNumBottonPanel = Boolean(flag);
    }

    this.getOrderColumn = function () {
        return 'lastName';
    }


    this.testValue = 1; // 
    /* функции событий */
    
    /* функция инициализации */
    //var init = function (data, alphabet, columns, letter, maxRows) {
    this.setData(data);
    this.setColumns(columns);
    this.setAlphabet(alphabet);
    this.setLetter(letter);
    this.setMaxRows(maxRows);
    this.setSheetCount();
    this.setSheetNum();
//    this.setVisibleColumns(visibleColumns);


    //}
    
    //init(data, alphabet, columns, letter, maxRows);

/* */

}

