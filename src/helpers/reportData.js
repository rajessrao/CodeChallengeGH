const leftPad = require('left-pad')

const reportData = {
  getReport(users) {
    try {
      if (users[0] && users[0].comments) {
        const spaces = users[0].comments.toString().length

        users.map((user) => {
          let comments = leftPad(user.comments.toString(), spaces)
          let login = user.login
          let commits = user.total

          // Logging report data
          console.log(`${comments} comments, ${login} (${commits} commits)`)
        })
      } else {
        console.log('No comments available.')
      }
    } catch (error) {
      console.error(error)
    }
  },
}

module.exports = reportData
