const express = require('express');
const app = express();

const { getQuestions, postQuestion, putQHelpful, putQReport } = require('./controller/questions.js');
const { getAnswers, postAnswer, putAHelpful, putAReport } = require('./controller/answers.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// questions
app.get('/qa/questions', getQuestions);
app.post('/qa/questions', postQuestion);
app.put('/qa/questions/:question_id/helpful', putQHelpful);
app.put('/qa/questions/:question_id/report', putQReport);

// answers
app.get('/qa/questions/:question_id/answers', getAnswers);
app.post('/qa/questions/:question_id/answers', postAnswer);
app.put('/qa/answers/:answer_id/helpful', putAHelpful);
app.put('/qa/answers/:answer_id/report', putAReport);

module.exports = app;
