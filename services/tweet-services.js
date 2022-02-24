const { User, Tweet, Reply } = require('../models')

const tweetController = {
    getTweets: async (req, cb) => {
        try {
          const tweets = await Tweet.findAll({
            include: User,
            raw: true,
            nest: true
          })
          return cb(null, tweets)
        } catch (err) {
          return cb(err)
        }
      },    
    getTweet: async (req, cb) => {
        try{
            const tweet = await Tweet.findByPk(req.params.tweet_id, {
                include: [
                    Reply,
                    User
                ],
                raw: true,
                nest: true
            })
            return cb(null, tweet)
        }catch(err){
            return cb(err)
        }

    },
    postTweet: async (req, cb) => {
        try{
            const { description } = req.body
            const userId = req.user
            console.log(req)
            if (!description) {
                return cb('Description is required.')
            }
            const newTweet = await Tweet.create({
                description,
                userId
            })
            const tweetData = {
                status: "suceess",
                data: {
                    tweet: newTweet 
                }
            }
            return cb(null, tweetData)
        }catch(err){
            return cb(err)
        }
    }
}
module.exports = tweetController
