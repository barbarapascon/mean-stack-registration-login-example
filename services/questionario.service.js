var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('questionario');

var service = {};

//service.authenticate = authenticate;
service.getById = getById;
service.create = create;
//service.update = update;
service.delete = _delete;
service.getAllQuestion = getAllQuestion;

module.exports = service;

function getById(_id) {
    var deferred = Q.defer();

    db.questionario.findById(_id, function (err, questao) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (questao) {
            // return questao (without hashed password)
            deferred.resolve(_.omit(questao, 'hash'));
        } else {
            // questao not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(questionParam) {
    var deferred = Q.defer();  

    createUser();

    function createUser() {
        // set user object to userParam without the cleartext password
        var question = questionParam.body;

        db.questionario.insert(
            question,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
    
                deferred.resolve();
            });
    }
    
    

    return deferred.promise;
}


function _delete(_id) {
    var deferred = Q.defer();

    db.questionario.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function getAllQuestion(){
    var deferred = Q.defer();

    db.questionario.find({}).toArray(function(err,questions){
        console.log(questions);
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (questions) {
            var questionArray = "{\"questionario\": [ ";
            var i = 0;
            while(i < questions.length){
                if(i>0) questionArray = questionArray + ", ";
                questionArray = questionArray+"\""+questions[i].questao+"\"";
                i = i+1;
            }
            questionArray = questionArray+"]}";

            deferred.resolve(questionArray);
        } else {

            deferred.resolve();
        }
    });
    
    return deferred.promise;
}