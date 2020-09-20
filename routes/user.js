
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const normalize = require('normalize-url')

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


                bcrypt.hash(password, 10, (err, hash) => {

                    if (err) {
                        return res.json({
                            message: err.message
                        })
                    }

                    else {

                        // make a avatar
                        const avatar = normalize(
                            gravatar.url(email, {
                                s: '200',
                                r: 'pg',
                                d: 'mm'
                            }),
                            { forceHttps: true }
                        )


                        const newUser = new userModel({
                            name,
                            email,
                            password: hash,
                            avatar
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
                bcrypt.compare(password, user.password, (err, result) => {

                    if (err || result === false) {
                        return res.json({
                            message: 'wrong password'
                        })
                    }
                    else {
                        // make a token
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
                            token: token
                        })
                    }
                })
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