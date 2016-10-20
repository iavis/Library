
(function (app) {

    app.factory('dataServiceFactory', dataServiceFactory);

    dataServiceFactory.$inject = ['$http', 'dataModelFactory'];

    function dataServiceFactory($http, dataModelFactory) {

        return factory;

        function factory(serviceParams) {
          
            console.warn(serviceParams);

            var urlAddItem = serviceParams.urlAddItem || 'nothing.xxx', // url для добавления нового элемента
                urlRemoveItem = serviceParams.urlRemoveItem || 'nothing.xxx',  // url для удаления нового элемента
                urlUpdateItem = serviceParams.urlUpdateItem || 'nothing.xxx',  // url для обновления нового элемента
                objectFactory = serviceParams.objectFactory || function (item) { return item;} 

            var serviceData = undefined; // для хранения данных сервиса 

            var service = {
                getData: getData,
                reloadData : reloadData,
                addItem: addItem,
                removeItem: removeItem,
                updateItem: updateItem
            };

            return service;

            function getData() {

                return $http({ method: 'POST', url: serviceParams.urlGetData })
                    .then(getOk)
                    .catch(getFailed);

                function getOk(response) {

                    var data = {},
                        f = ['items', 'columns', 'additions'];

                    f.forEach(function (elem) { data[elem] = response.data.data[elem] });

                    serviceData = dataModelFactory(data);

                    return serviceData;
                }

                function getFailed(error) {
                    console.info('Load Failed for getData.' + error.data);
                    return error;
                }
            };

            function reloadData(controllerData) {
                controllerData = undefined;
                controllerData = getData();
            }

            function addItem(item) {

                var url = serviceParams.urlAddItem;

                return $http({
                    method: 'POST',
                    url: urlAddItem,
                    data: objectFactory(item)
                })
                    .then(addOk)
                    .catch(addFailed);

                function addOk(response) {

                    var item = response.data.data;
                    console.warn(response.data.data);

                    serviceData.addItem(objectFactory(item));

                    return serviceData;
                }

                function addFailed(error) {
                    console.error('Элемент не добавлен в таблицу ИЗДАТЕЛИ ', item);
                    return error;
                }
            }

            function removeItem(item) {

                return $http({
                    method: 'POST',
                    url: urlRemoveItem,
                    data: { 'id': item.id }
                })
                .then(removeOk)
                .catch(removeFailed)

                function removeOk(data) {
                    serviceData.removeItemByHashKey(item.$$hashKey);
                    return true;
                };

                function removeFailed(error) {
                    return error;
                };

            };

            function updateItem(item) {

                return $http({
                    method: 'POST',
                    url: urlUpdateItem,
                    data: objectFactory(item)
                })
                .then(updateOk)
                .catch(updateFailed)

                function updateOk(response) {

                    var updatedItem = objectFactory(response.data.data);
                    serviceData.replaceItemByKey('id', item.id, updatedItem);

                    return serviceData;
                }
                function updateFailed(error) { return error; }

            };

        }

    }

})(angular.module('appLibrary.sharedModule'))