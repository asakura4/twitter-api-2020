'use strict'
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      "SELECT id, name FROM Users where role = 'user';", {
        type: queryInterface.sequelize.QueryTypes.SELECT
      }
    )

    const tweets = await queryInterface.sequelize.query(
      'SELECT * FROM Tweets;', {
        type: queryInterface.sequelize.QueryTypes.SELECT
      }
    )
    const insertedReplies = tweets.map(tweet => {
      return Array.from({ length: 3 }, () => {
        const newDate = new Date(+(tweet.createdAt) + Math.floor(Math.random() * 1000000000)) // add 10^9 milisecond from tweet createdAt date
        return {
          UserId: users[Math.floor(Math.random() * users.length)].id,
          comment: faker.lorem.text().substring(1, 40),
          TweetId: tweet.id,
          createdAt: newDate,
          updatedAt: newDate
        }
      })
    }).flat()

    await queryInterface.bulkInsert('Replies', insertedReplies, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Replies', null, {})
  }
}
