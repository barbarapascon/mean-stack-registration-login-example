var config = require('config.json');
var express = require('express');
var router = express.Router();
var questionarioService = require('services/questionario.service');

// routes
//router.post('/authenticate', authenticateQuestao);
router.post('/register', registerQuestao);
router.get('/current', getCurrentQuestao);
//router.put('/:_id', updateQuestao);
router.delete('/:_id', deleteQuestao);
router.get('/all', getAllQuestion);

module.exports = router;



function registerQuestao(req, res) {
    questionarioService.create(req)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrentQuestao(req, res) {
    questionarioService.getById(req.session.questionarioId)
        .then(function (questionario) {
            if (questionario) {
                res.send(questionario);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function deleteQuestao(req, res) {
    var questionarioId = req.session.questionarioId;
    if (req.params._id !== questionarioId) {
        // can only delete own account
        return res.status(401).send('You can only delete your own account');
    }

    questionarioService.delete(questionarioId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAllQuestion(req, res) {
    questionarioService.getAllQuestion()
        .then(function (questions) {
            if (questions) {
                res.send(questions);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
