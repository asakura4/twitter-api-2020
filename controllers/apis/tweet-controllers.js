const tweetServices = require('../../services/tweet-services')

const tweetController = {
    getTweets: (req, res, next) => {
        // tweetServices.getTweets(req, (err, data) => err ? next(err) : res.json(data))
        tweetServices.getTweets(req, (err, data) => {
            if (err) {
                return next(err)
            } 
            return res.json(data)
        })
    }
}

module.exports = tweetController