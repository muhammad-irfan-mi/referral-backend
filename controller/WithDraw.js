const WidthDraw = require('../model/WithdrawRequest')
const Points = require('../model/Point')
const User = require('../model/User_Modal')

const createWithdrawReq = async (req, res) => {
    try {
        console.log("Processing withdraw request");

        // Fetch the user's current points
        const userPoints = await Points.findOne({ userId: req.body.userId });
        const currentPoints = userPoints?.point || 0;
        const reqPoints = +req.body.pointRequested;

        console.log(req.body, currentPoints);
        console.log({ reqPoints, currentPoints });

        // Check if the user has enough points
        if (currentPoints >= reqPoints) {
            // Deduct the requested points
            const updatedPoints = currentPoints - reqPoints;
            userPoints.point = updatedPoints;

            // Save the updated points to the database
            await userPoints.save();

            console.log("Withdrawal accepted. Points updated.");

            // Optionally, save the withdrawal request in another collection
            const withDraw = new WidthDraw({ ...req.body });
            await withDraw.save();
            console.log({ withDraw })
            res.json({ message: "Withdrawal request accepted", withDraw });
        } else {
            console.log("Insufficient points");

            res.status(400).json({ message: "Insufficient points for this withdrawal request" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred while processing the request", error });
    }
};



const acceptWithdrawReq = async (req, res) => {
    console.log("approving user")
    try {
        const withDraw = await WidthDraw.updateOne({ _id: req.params.id }, { $set: { status: "approved" } });
        console.log({withDraw})
        // const withDraw = await WidthDraw.findById(req.params.id)
        // set points to zero
        // const pointToWidthDraw = +withDraw.pointRequested
        // const user = await User.findById(withDraw.userId)
        // const userPoints = await Points.findOne({ userId: withDraw.userId })
        // console.log({ pointToWidthDraw, userPoints, user })
        // set req to accepted
        // if (userPoints > pointToWidthDraw) {
        //     console.log("can withdraw")
        // }
        res.json({ message: "success", withDraw })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const getAllReqs = async (req, res) => {
    try {

        const withDraw = await WidthDraw.find()
        res.json({ count: withDraw.length, data: withDraw })
    } catch (error) {
        console.log(error)
        res.send(error)
    }

}
const getMyReqs = async (req, res) => {
    try {
        const { id } = req.params
        console.log({ id })
        if (req.query.status) {
            const withDraw = await WidthDraw.find({ userId: id, status: req.query.status })
            res.json({ count: withDraw.length, data: withDraw })

        }
        else {
            const withDraw = await WidthDraw.find({ userId: id })
            res.json({ count: withDraw.length, data: withDraw })

        }

    } catch (error) {
        console.log(error)
        res.send(error)
    }

}


module.exports = { createWithdrawReq, acceptWithdrawReq, getAllReqs, getMyReqs }