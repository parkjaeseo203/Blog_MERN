
const express = require('express')
const router = express.Router()
const passport = require('passport')

const authCheck = passport.authenticate('jwt', {session: false})

const profileModel = require('../model/profile')

// profile register
// @route GET http://localhost:7524/profile/register
// @desc post profile
// @access private

router.post('/register', authCheck, (req, res) => {


    const profileFields = {}
    profileFields.user = req.user.id
    if (req.body.handle) profileFields.handle = req.body.handle
    if (req.body.company) profileFields.company = req.body.company
    if (req.body.website) profileFields.website = req.body.website
    if (req.body.location) profileFields.location = req.body.location
    if (req.body.status) profileFields.status = req.body.status
    if (req.body.bio) profileFields.bio = req.body.bio
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername

    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',')
    }

    new profileModel(profileFields)
        .save()
        .then(profile => {
            res.json({
                message: 'Completed',
                profileInfo: profile
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
    // const {user, handle, company, website, location, status, bio, skills, githubusername, experience, education, social} = req.body
    //
    // const newProfile = new profileModel({
    //     user, handle, company, website, location, status, bio, skills,githubusername, experience, education,social
    // })
    //
    // newProfile
    //     .save()
    //     .then(user => {
    //         res.json({
    //             message: 'Complete'
    //         })
    //     })
    //     .catch(err => {
    //         res.json({
    //             message: err.message
    //         })
    //     })
})









module.exports = router