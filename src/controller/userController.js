import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import con from '../db/connections.js'

const userSingup = async (req, res) => {
    try {
        const reqData = req.body
        const email = req.body.email
        con.query(`SELECT * from user WHERE email='${email}'`, async (err, result) => {
            if (result.length == 0) {
                reqData.password = await bcrypt.hash(reqData.password, 10)
                let userData = {
                    name: reqData.name,
                    email: email,
                    password: reqData.password,
                    images: req.file.filename
                }

                con.query('INSERT INTO user SET ?', userData, async (err, data) => {
                    err ? err : res.json({
                        status: 200,
                        data: data,
                    })
                });
            } else {
                res.json({
                    status: 200,
                    msg: "Email is already exits"
                })
            }
        });
    } catch (e) {
        res.json({
            status: 404,
            msg: e.message
        })
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        con.query(`SELECT * from user WHERE email='${email}'`, async (err, result) => {
            console.log("<< result >>", result);
            if (result.length == 0) {
                res.json({
                    status: 200,
                    msg: "Email is Not valid"
                })
            } else {
                const match = await bcrypt.compare(password, result[0].password)
                console.log(match);
                if (match == false) {
                    res.json({
                        status: 200,
                        msg: "password is not valid"
                    })
                } else {
                    const token = jwt.sign({
                        _id: result[0]._id
                    }, process.env.KEY)
                    res.json({ status: 200, status: 'login done', data: token })
                }
            }
        })
    } catch (e) {
        res.json({
            status: 404,
            msg: e.message
        })
    }
}

// const getAllUser = async (req, res) => {
//     try {
//         const user = await models.User.find({ isDeleted: false })

//         res.json({ status: 200, data: user })
//     } catch (e) {
//         res.json({
//             status: 404,
//             msg: e.message
//         })
//     }
// }

// const getOneUser = async (req, res) => {
//     const id = req.params.id
//     try {
//         const user = await models.User.find({ _id: id, isDeleted: false })
//         res.json({ status: 200, data: user })
//     } catch (e) {
//         res.json({
//             status: 404,
//             msg: e.message
//         })
//     }
// }

// const userUpdate = async (req, res) => {
//     try {
//         const data = req.user
//         const _id = req.params.id
//         const result = await models.User.findOneAndUpdate({ _id, isDeleted: false }, { ...req.body, updatedBy: data._id }, { new: true })
//         res.json({
//             status: 200,
//             data: result
//         })
//     } catch (e) {
//         res.json({
//             status: 404,
//             msg: e.message
//         })
//     }
// }

// const userRemove = async (req, res) => {
//     try {
//         const _id = req.params.id
//         const result = await models.User.findOneAndUpdate({ _id, isDeleted: false }, { $set: { isDeleted: true } }, { new: true })
//         res.json({ status: 200, message: "User is deleted" })
//     } catch (e) {
//         res.json({
//             status: 404,
//             msg: e.message
//         })
//     }
// }

const userController = { userSingup, userLogin }
export default userController