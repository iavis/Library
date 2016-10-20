(function (app) {

    app.factory('columnItemFactory', columnItemFactory);

    /* Создает объект для хранения информации о столбце таблицы

        name  - имя столбца, как оно задано у источника данных 
        vname - видимое название столбца

        isVisible  - видимость столбца для пользователя 
        isPossible - возможность редактирования 
        isOrderable - возможность сортировки по данному столбцу 
        isFilterable - возможность поиска по тексту в данном стоблце  

        isText - тип значения колонки СТРОКА
        isNumber - тип значения колонки ЧИСЛО 
        isDate - тип значения колонки ДАТА 
        isPhoto - тип значения колонки ФОТО (имя файла ссылки на картинку) 
    */
    function columnItemFactory() {

        return factory;

        function factory(column) {

            var service = {
                name: column.name || '',
                vname: column.vname || '',
                type: column.type || 'text',

                isVisible: Boolean(column.isVisible || false),
                isEditable: Boolean(column.isEditable || false),

                isOrderable: Boolean(column.isOrderable || false),
                isFilterable: Boolean(column.isFilterable || false),

                isText: Boolean(column.isPhoto || false),
                isPhoto: Boolean(column.isPhoto || false),
                isDate: Boolean(column.isDate || false),
                isNumber: Boolean(column.isNumber || false),

                isMarked: false
            }

            return service;

            /* проверка введенного имени столбца, обязательно непустая строка */
            if (!(angular.isString(service.name) && (service.name !== ''))) {
                throw new Error("Имя столбца должно быть непустой строкой!!!");
            }

            /* если окажется так что поле доступно для редактирования, но при этом оно невидимо,
               то нужно сделать его видимым */
            if (service.isEditable) { service.isVisible = true; }

            /* тип данных не указан то isText = true*/
            if (!service.isText && !service.isData && !service.isPhoto && !service.isNumber) {
                service.isText = true;
            }

        }

    }


})(angular.module('appLibrary.sharedModule'))