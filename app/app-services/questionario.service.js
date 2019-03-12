(function () {
    'use strict';

    angular
        .module('app')
        .factory('QuestionarioService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetCurrent = GetCurrent;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Delete = Delete;

        return service;

        function GetCurrent() {
            return $http.get('/api/questionario/current').then(handleSuccess, handleError);
        }

        function GetAll() {
            return $http.get('/api/questionario/all').then(handleSuccess, handleError);
        }

        function GetById(_id) {
            return $http.get('/api/questionario/' + _id).then(handleSuccess, handleError);
        }
      

        function Create(questao) {
            return $http.post('/api/questionario/register', questao).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/questionario/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
