const leftPad = require('left-pad')

module.exports = function(users) {
  const spaces = users[0].comments.toString().length

  users.map((user) => {
    let comments = leftPad(user.comments.toString(), spaces)
    let login = user.login
    let commits = user.total

    // Logging report data
    console.log(`${comments} comments, ${login} (${commits} commits)`)
  })
}
