var $grid = $grid || {};

$grid.dataGrid = function () {

    /* значения и настройки таблицы */
    var _data = (function (context) {
        return {
            data: undefined, // массив данных
            columns: undefined, // свойства(столбцы) объектов в массиве данных
            visibleColumns: undefined, // видимые столбцы таблицы  {name: 'name', isPhoto : true, type : 'text|number|date'}
            selectColumns: undefined, // колонки по которым происходит отбор данных
            letter: undefined, // буква или подстрока для отбора значений 
            maxRows: undefined, // макс.кол-во строк отображаемых в таблице
            sheetNum: undefined, // номер отображаемого листа  
            sheetCount: undefined, // количество листов 
            alphabet: undefined, // массив букв в формате {name - буква, count - количество слов начинающихся на эту букву }
            selected: undefined, // массив - отобранных значений из массива данных
            flagTopAlphabetButtonPanel: true,  // флаг показа сверху панели кнопок перехода по буквам отбора 
            flagBottomAlphabetButtonPanel: false,  // флаг показа снизу панели кнопок перехода по буквам отбора
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

            afterChangeColumns: function () {/* функция выполняется после изменения */
                // do nothing 
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






}

