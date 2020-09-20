
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const userModel = require('../model/user')

// 회원가입
// @route POST http://localhost:7524/user/register
// @desc register user
// @access public
router.post('/register', (req, res) => {


    // email check -> password 암호화 -> 데이터 저장
    const {name, email, password} = req.body


    userModel
        .findOne({email})
        .then(user => {
            if (user) {
                return res.json({
                    message: 'already exsists email'
                })
            }
            else {
                const newUser = new userModel({
                    email, name, password
                })

                newUser
                    .save()
                    .then(user => {
                        res.json({
                            message: 'WELCOME',
                            userInfo: user
                        })
                    })
                    .catch(err => {
                        res.json({
                            message: err.message
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })

})


// 로그인
// @route POST http://localhost:7524/user/login
// @desc login user / return jwt
// @access public
router.post('/login', (req, res) => {

    // email check -> password matching -> token return
    const {email, password} = req.body

    userModel
        .findOne({email})
        .then(user => {
            // email checking
            if (!user) {
                return res.json({
                    message: 'email not exists'
                })
            }
            else {
                // password matching
                user
                    .comparePassword(password, (err, isMatch) => {
                        if (err || !isMatch) {
                            return res.json ({
                                message: 'wrong password'
                            })
                        }
                        else {
                            const token = jwt.sign(
                                {
                                    email: user.email,
                                    id: user._id
                                },
                                'key',
                                {expiresIn: '1d'}
                            )
                            // token return
                            res.json({
                                message: 'auth successful',
                                isMatch,
                                token: token
                            })
                        }
                    })

                // bcrypt.compare(password, user.password, (err, result) => {
                //
                //     if (err || result === false) {
                //         return res.json({
                //             message: 'wrong password'
                //         })
                //     }
                //     else {
                //         // make a token

                //     }
                // })
            }

        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })






    // userModel
    //     .findOne({email})
    //     .then(user => {
    //         if (!user) {
    //             res.json({
    //                 message: 'Already email exsists or password was wrong'
    //             })
    //         }
    //         else {
    //            bcrypt.compare(password, user.password, (err, result) => {
    //
    //                if (err || result === false) {
    //                    return res.json({
    //                        message: 'wrong password'
    //                    })
    //                }
    //                else {
    //                    console.log(result)
    //                }
    //            })
    //
    //         }
    //     })
    //     .catch(err => {
    //         res.json({
    //             message: err.message
    //         })
    //     })


})



// 현유저정보


module.exports = router