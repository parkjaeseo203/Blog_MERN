

const mongoose = require('mongoose')

const profileSchema = mongoose.Schema(
    {
        user: {},
        handle: {},
        company: {},
        website: {},
        location: {},
        status: {},
        skills: {},
        bio: {},
        githubusername: {},
        experience: [],
        education: [],
        social: {}
    },
    {
        timestamps: true
    }
)



module.exports = mongoose.model('profile', profileSchema)