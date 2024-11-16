const Question = require("../model/question_Modal");

// Add Question 
const addQuestion = async (req, res) => {
    const { questionText, options } = req.body;
    // Validation
    if (!questionText || !options || options.length !== 4) {
        return res.status(400).json({ message: "Please provide a valid question and exactly 4 options" });
    }

    try {
        // Create the question
        const newQuestion = new Question({
            questionText,
            options
        });

        // Save the question to the database
        await newQuestion.save();
        res.status(201).json({ message: 'Question added successfully', question: newQuestion });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get Latest Question 
const getQuestion = async (req, res) => {
    try {
        const questions = await Question.find().sort({ _id: -1 }).limit(10);

        res.status(200).json(questions)
    }
    catch (err) {
        console.log(err)
    }
}
// Get All Question 
const getAllQuestion = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions)
    }
    catch (err) {
        console.log(err)
    }
}


module.exports = { 
    addQuestion,
    getQuestion,
    getAllQuestion
 };