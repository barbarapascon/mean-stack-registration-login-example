(function () {
    'use strict';

    angular
        .module('app')
        .controller('questionario.QuestionarioController', Controller);// esse questionarioconroller ta chamando de onde

    function Controller($window, QuestionarioService, FlashService) {
        var vm = this;

        vm.questao = null;
        vm.saveQuestionario = saveQuestionario;
        vm.deleteQuestionario = deleteQuestionario;
        vm.allquestion = null;
        vm.getAll = getAll;

        initController();

        function initController() {
            // get current questionario
            QuestionarioService.GetAll().then(function (questionario) {
                vm.questao = questionario;
            });
        }
        function saveQuestionario() {
            QuestionarioService.Create(vm.questao)
                .then(function () {
                    FlashService.Success('Question created');
                })
                .catch(function (err) {
                    FlashService.Success(err);
                });
        }

        function deleteQuestionario() {
            QuestionarioService.Delete(vm.questionario._id)
                .then(function () {
                    // log questionario out
                    $window.location = '/login';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
        function getAll(){
            QuestionService.GetAll()
                .then(function(questions){
                    vm.allQuestion = JSON.stringify(questions);
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();