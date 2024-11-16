const mongoose = require('mongoose')
const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: {
        type: [
            {
                optionText: { type: String, required: true },
                isCorrect: { type: Boolean, required: true } // This will indicate if the option is correct
            }
        ],
        validate: {
            validator: function (options) {
                // Ensure exactly one option is marked as correct
                const correctCount = options.filter(option => option.isCorrect).length;
                return correctCount === 1;
            },
            message: "There must be exactly one correct answer"
        },
        required: true
    }
});

// Create a model for questions
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;