var Question = require('../models/question');

exports.new = function (req, res) {
    // console.log('ques:')
    // console.log(req.body)
    var questionObj = req.body.question;
    var options = req.body.options;
    questionObj.options = options;

    _question = new Question(questionObj);
    _question.save(function (err, question) {
        if (err) {
            console.log(err)
        }
        res.json({
            success:true,
            message:'添加题目成功'
        })
    })

}

exports.list = function (req, res) {
    Question.find({}).exec(function (err, questions) {
        if (err) {
            console.log(err)
        }
        res.json({
            success: true,
            data: questions
        })
    })
}