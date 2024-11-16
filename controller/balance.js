const balnaceModel = require('../model/balance')
const UserModal = require('../model/User_Modal')
const Point = require('../model/Point')

// const handleWithDrawBalance = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const user = await UserModal.findById(id)
//         const approved = "false";

//         if (user) {
//             const balance = await balnaceModel.create(
//                 {
//                     company: req.body.company,
//                     accountId: req.body.accountId,
//                     amount: req.body.amount,
//                     isApproved: approved,
//                 })
//             res.status(201).json({ msg: "Request Successful Send", balance, id: id })
//         }
//         else {
//             res.status(404).json({ msg: "User does not exist" })
//         }
//     }
//     catch (err) {
//         res.status(400).json({ msg: err.message })
//     }
// }

const handleWithDrawBalance = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModal.findById(id);
        const point = await Point.findOne({ userId: id });

        if (user && point) {
            const userPoints = point.point;
            const requestedPoints = req.body.amount;
            const myAmount = requestedPoints * 10;

            if (myAmount <= userPoints) {
                const approved = "false";

                const balance = await balnaceModel.create({
                    userId: user,
                    company: req.body.company,
                    accountId: req.body.accountId,
                    amount: myAmount,
                    isApproved: approved,
                });

                point.point = userPoints - myAmount;
                await point.save();

                res.status(201).json({
                    msg: "Request successfully sent", balance, id: id, updatedPoints: point.point
                });
            } else {
                res.status(300).json({ msg: "Insufficient points" });
            }
        } else {
            res.status(404).json({ msg: "User or points record does not exist" });
        }
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};




const handleGetWithdraw = async (req, res) => {
    try {
        const balance = await balnaceModel.find({ isApproved: "false" })
        res.status(200).json(balance)
    }
    catch (err) {
        res.status(400).json({ msg: "error getting Data" })
    }
}

const handleBalanceRequestApproved = async (req, res) => {
    try {
        const { id } = req.params;
        const balance = await balnaceModel.findByIdAndUpdate(
            id,
            { isApproved: "true" },
            { new: true }
        )

        if (!balance) {
            res.status(404).json({ msg: "Not Found" })
        }
        res.status(200).json({ msg: "Request Approved Successful" })
    }
    catch (err) {
        res.status(404).json({ msg: "Error from server" })
    }
}

const handleMyWithDraw = async (req, res) => {
    try {
        const userId = req.params.id;

        const balances = await balnaceModel.find({ userId: userId });

        if (balances.length > 0) {
            res.status(200).json(balances); 
        } else {
            res.status(404).json({ message: "No balances found for the given user ID." });
        }
    } catch (error) {
        console.error("Error fetching balances:", error);
        res.status(500).json({ error: "An error occurred while fetching balances." });
    }
};

module.exports = {
    handleWithDrawBalance,
    handleGetWithdraw,
    handleBalanceRequestApproved,
    handleMyWithDraw
}