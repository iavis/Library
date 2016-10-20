//var app = angular.module('EmployeeApp', []);

var app = angular.module('appLibrary', ['dataGridViewJs', 'ngSanitize', 'lr.upload']);

app.constant('alphabetRu', [
    'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё',
    'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М',
    'Н', 'О', 'П', 'Р', 'С', 'Т', 'У',
    'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ',
    'Ы', 'Ь', 'Э', 'Ю', 'Я'
]);

// ФИЛЬТРЫ 
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
})
.filter("take", function ($filter) {
    return function (data, from, count) {
        var arr = $filter("skipItems")(data, from);
        return $filter("limitTo")(arr, count);
    }
});


//ДИРЕКТИВЫ
app.directive('showAlphabet', function (alphabetRu) {
    return {
        link: function (scope, element, attributes) {
            //scope.data = scope[attributes['showAlphabet']];
            scope.alphabet = alphabetRu;
        },
        restrict: "EACM",
        templateUrl: "ngDir/_alphabetNav.html"
    }
});

app.directive('showPages', function () {
    return {
        link: function (scope, element, attributes) {
            scope.pages = [1, 2, 3, 4];
        },
        restrict: "EACM",
        templateUrl: "ngDir/_pageNumNav.html"
    }
});

/* выводит таблицу данных для просмотра и редактирования */
app.directive('vdShowDataGridView', function () {
    return {
        scope: {
            //source: '=sourceData',
            //visibleColumns: '&visibleColumns'
        },
        link: function (scope, element, attrs) {
            scope.source = attrs["sourceData"];
            //scope.visibleColumns = scope.source.getVisibleColumns();
            console.info('------------------------------------------------------');
            console.warn(scope.source);
            console.warn(angular.isString(scope.source));
            console.info('-----------------------------------------------------');
        },
        controller: function ($scope) {
            console.info('----------------------------------');
            console.warn($scope.source);
            console.info('----------------------------------');
        },
        restrict: "EACM",
        templateUrl: "ngDir/_dataGridView.html"
    }
});

/**/
app.directive('vdShowDataGridRow', function () {
    return {
        scope: {
            source: '=rowSource',
            num: '=rowNum',
            columns: '&rowColumns',
        },
        restrict: "A",
        templateUrl: "ngDir/_dataGridRow.html"
}
});

/* */
app.directive('vdShowAlphabetButtonPanel', function () {
    return {
        scope: {
            source: '=sourceData',
            alphabet: '=sourceAplhabet',
            setCurrentLetter: '=setCurrentLetter',
            getCurrentLetter: '=getCurrentLetter'
        },
        restrict: "EACM",
        templateUrl: "ngDir/_alphabetButtonPanel.html"
    }
});

/* Директива создает кнопки перехода по листам данных */
app.directive('vdShowNumButtonPanel', function () {
    return {
        scope: {
            source: '=sourceData',
            isFirstSheetNum: '=isFirstSheetNum',
            isLastSheetNum: '=isLastSheetNum',
            incSheetNum: '=incSheetNum',
            getSheetCount: '=getSheetCount',
            setSheetNum: '=setSheetNum',
            getSheetNum: '=getSheetNum'
        },
        restrict: "EACM",
        templateUrl: "ngDir/_sheetNumButtonPanel.html"
    }
});


app.controller('LibraryCtrl', ['$scope', 'upload', '$http', function ($scope, upload, $http) {
    // Функция получения данных с сервера
    $scope.getData = function () {
        $http({
            method: 'POST',
            url: 'Library/GetData'
        })
        .then(function (response) {

            console.log(response);

            $scope.books = response.data.books;
            $scope.authors = response.data.authors;

            // данные для таблицы 
            $scope.tabSet.initValues($scope.authors, ['firstName', 'middleName', 'lastName'], response.data.authorsAlphabet);

            $scope.authorTable = new $TableJS.dataGridView(
                $scope.authors,
                response.data.authorsAlphabet,
                [
                    { name: 'photo', vname: 'Фото', isVisible: true, isFilterBy: false, type: 'photo'},
                    { name: 'firstName', vname: 'Имя', isVisible: true, isFilterBy: true, isOrderBy: true },
                    { name: 'middleName', vname: 'Среднее имя / Отчество', isVisible: true, isFilterBy: true,},
                    { name: 'lastName', vname: 'Фамилия', isVisible: true, isFilterBy: true, isOrderBy: true },
                    { name: 'bookCount'  , vname: 'Кол-во книг', isVisible: true, isFilterBy: false }
                ],
                undefined,
                undefined
                );

            $scope.authorTable.getData().forEach(function (elem) {
                console.info(elem.books.length);
                elem.bookCount = elem.books.length;
            })

            $scope.bookTable = new $TableJS.dataGridView(
                $scope.books,
                undefined,
                [
                    { name: 'name', vname: 'Название', isVisible: true, isFilterBy: true, isOrderBy : true},
                    { name: 'pageCount', vname: 'Кол-во страниц', isVisible: true, isFilterBy: false, isOrderBy: true },
                    { name: 'year', vname: 'Год выпуска', isVisible: true, isFilterBy: false }
                ],                
                undefined,
                undefined,
                [   { name: 'name', vname: 'Название' },
                    { name: 'pageCount', vname: 'Кол-во страниц' },
                    { name: 'year', vname: 'Год выпуска' }
                ]);

            $scope.curAuthors = $scope.authors;

            angular.forEach($scope.books, function (item) {
                item['showEdit'] = true;
                item['type'] = 'book';
                item['isEdited'] = false;
            })

            angular.forEach($scope.authors, function (item) {
                item["showEdit"] = true;
                item["type"] = 'author';
                item['isEdited'] = false;
            })

        }, function (error) {
            console.log(error);
        });
    }

    $scope.tableJS = $TableJS;

    /* функция описывает настройки таблицы отображения данных о авторах*/
    $scope.tabSet = {
            
        data: undefined, // массив данных
        fields: undefined, // свойства объектов в массиве данных
        letter: undefined, // буква или подстрока для отбора значений 
        maxRows: undefined, // макс.кол-во строк отображаемых в таблице
        sheetNum: undefined, // номер отображаемого листа  
        sheetCount: undefined, // количество листов 
        alphabet : undefined, // массив букв в формате {name - буква, count - количество слов начинающихся на эту букву }

        selected:[], // отобранные данные  

        /* функция устанавливает текущую букву для отбора в списке авторов */
        setLetter : function (letter) {
            this.letter = angular.isString(letter) ? letter : '';
            this.afterChangeLetter(); // обработаем зависимости
        },

        /* функция установки */
        setMaxRows : function (max) {
            this.maxRows = angular.isString(max) ? max : 3;
            this.afterChangeMaxRows(); // обработаем зависимости
        },

        /* функция установки */
        setSheetNum : function (num) {
            if (angular.isNumber(num)) {
                if (num < this.sheetCount) {
                    this.sheetNum = num;
                }
                else {
                    console.log(
                        'Попытка установить номер листа больше чем это возможно.' +
                        'Устанавливаемы номер ' + num.toString() +
                        '. Максимально возможный ' + this.sheetCount
                        );
                }
            }
            else {
                this.sheetNum = 0;
            }

            this.afterChangeSheetNum(); // обработаем зависимости 
        },

        /* функция определяет количество листов в таблице  */
        setSheetCount : function () {
        
            // обязательно проверяем есть ли у нас массив данных 
            var arr = angular.isArray(this.selected) ? this.selected : {};
        
            // обязательно проверяем указано ли у нас максимально количество строк  
            var max = angular.isNumber(this.maxRows) ? this.maxRows : 1;
       
            // вычислим количество страниц
            this.sheetCount = Math.ceil(arr.length / max);

            this.afterChangeSheetCount(); // обработаем зависимости

        },        

        /* функция установки массива данных*/
        setData : function(data, alphabet){
            this.data = angular.isArray(data) ? data : [];
            
            this.afterChangeData(alphabet); // обработаем зависимости 
        },
        
        /* функция установки массива свойств объектов массива данных*/
        setFields : function(fields){
            this.fields = angular.isArray(fields) ? fields : [];
            this.afterChangeFields();
        },

        /* функция установки массива данных*/
        setSelected : function(){
            this.selected = this.getData();
            this.afterChangeSelected();
        },

        /*функция увеличивает значение */
        incSheetNum: function (num) {
            this.setSheetNum( this.sheetNum + (angular.isNumber(num) ? num : 1) );
        },

        isFirstSheetNum : function(){
            return this.sheetNum === 0 ? true : false;
        },

        isLastSheetNum : function(){
            return this.sheetNum === (this.sheetCount - 1) ? true : false;
        },

        /* функция установки массива данных*/
        getData: function (subStr, everyWhere) {

            var _subStr = subStr || this.letter;

            //alert('letter ' + _subStr);

            var arr = angular.isArray(this.data) ? this.data : [];

            if (angular.isString(_subStr)) {

                if (_subStr === ''){
                    return arr;
                }

                var func;

                var fields = this.fields;

                if (angular.isUndefined(everyWhere)) {
                    func = function (elem) {

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
        },

        /* функция задания массива буквы */
        setAlphabet : function(alphabet){

            if (angular.isArray(alphabet)){
                this.alphabet = alphabet;
            }else{ // сформируем алфавит по массиву данных
                this.alphabet = [];
                var arr = [];
                this.data.forEach(function(elem){
                });
            }

            this.afterChangeAplhabet();
        },




        /* функция выполняется после изменения */ 
        afterChangeData: function (alphabet) {
            // меняем алфавит 
            this.setAlphabet(alphabet); 
        },

        /* функция выполняется после изменения */
        afterChangeAplhabet: function () {
            this.setLetter();
        },

        /* функция выполняется после изменения */ 
        afterChangeFields: function () {
            // do nothing 
        },

        /* функция выполняется после изменения */ 
        afterChangeLetter: function () {
            this.setSelected();
        },

        /* функция выполняется после изменения */
        afterChangeSelected: function () {
            this.setSheetCount();
        },


        /* функция выполняется после изменения */
        afterChangeSheetCount: function () {
            this.setSheetNum();
        },

        /* функция выполняется после изменения */
        afterChangeSheetNum: function () {
            // do nothing 
        },

        /* функция выполняется после изменения */ 
        afterChangeMaxRows: function () {
            this.setSheetCount();
        },

        // установка значенйи по умолчанию
        initDefault: function () {
            this.setLetter();
            this.setMaxRows();
            this.setSheetCount();
            this.setSheetNum();
        },

        /*  */
        initValues: function (data, fields, alphabet, letter, maxRows) {
            this.setData(data);
            this.setFields(fields);
            this.setAlphabet(alphabet);
            this.setLetter(letter);
            this.setMaxRows(maxRows);
            this.setSheetCount();
            this.setSheetNum();
        },

    };


    // функция устанавливает текщий массив авторов 
    // subStr - буква или несколько букв с которых начинается слово 
    // everyWhere - если неопределено то ищем только в начале имени или фамилии, иначе везде 
    $scope.setCurAuthors = function (subStr, everyWhere) {

        var arr = angular.isArray($scope.authors) ? $scope.authors : [];

        if (angular.isString(subStr)) {

            var func;

            if (angular.isUndefined(everyWhere)) {
                func = function (elem) {
                    return elem.fisrtName.indexOf(subStr) === 0 ||
                        elem.middleName.indexOf(subStr) === 0 ||
                        elem.lastName.indexOf(subStr) === 0;
                }
            }
            else {
                func = function (elem) {
                    return elem.fisrtName.indexOf(subStr) !== -1 ||
                        elem.middleName.indexOf(subStr) !== -1 ||
                        elem.lastName.indexOf(subStr) !== -1;
                }
            }

            arr = arr.filter(func);
        }

        $scope.curAuthors = arr;

        return true;
    }

 //   $scope.curExpensesPageCount = Math.ceil($scope.curExpenses.length / $scope.maxRowInTable); // кол-во страниц в таблице "Расходы за текущйи период"

    // функция инициализации контроллера  
    $scope.init = function () {
        $scope.getData();

        //инициируем 
    }

    // инициализируем контроллер 
    $scope.init();

}]);


