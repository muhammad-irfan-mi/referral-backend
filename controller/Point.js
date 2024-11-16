const Point = require('../model/Point')


const handlePoint = async (req, res) => {
    const { point } = req.body;

    try {
        const newPoint = new Point({
            point,
        });

        await newPoint.save();
        res.status(201).json({ point: newPoint });
    }
    catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const handleGetPoint = async (req, res) => {
    try {
        const points = await Point.find({ userId: req.user._id });

        const totalPoints = points.reduce((acc, curr) => acc + curr.point, 0);
        res.status(200).json({ totalPoints });
    }
    catch (err) {
        res.status(500).json({ msg: err.message });
    }
};



module.exports = {
    handlePoint,
    handleGetPoint
}