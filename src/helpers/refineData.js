module.exports = async function (totalData) {
  let users = []
  let uniqUsers = []

  await totalData.map((response) => {
    response.map((data) => {
      users.push(data)
    })
  })

  await users.map((user) => {
    if (!uniqUsers.includes(user.login)) {
      uniqUsers.push(user.login)
    }
  })

  // Return combined user data
  await uniqUsers.map((login, i) => {
    users.map((user) => {
      // Set first loop values
      let comments = 0
      let total = 0

      if (login === user.login) {
        // Update value if properties exist
        if (uniqUsers[i].comments) {
          comments = uniqUsers[i].comments
        }

        if (uniqUsers[i].total) {
          total = uniqUsers[i].total
        }

        // Return an object in custom mapped array
        uniqUsers[i] = {
          login: login,
          comments: (comments += user.comments),
          total: (total += user.total),
        }

        return uniqUsers[i]
      }
    })
  })

  // Sort by Comments
  let sortedUsers = await uniqUsers.sort((a, b) => b.comments - a.comments)

  // console.log(sortedUsers)
  return sortedUsers
}
