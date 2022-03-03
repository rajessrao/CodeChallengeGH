const axios = require('axios').default
const config = require('../config')
const getRoutes = require('../helpers/urls')
const getCommentData = require('../helpers/commentsData')
const headers = {
  Accept: 'application/vnd.github.v3+json',
  Authorization: `token ${config.GITHUB_PERSONAL_ACCESS_TOKEN}`,
}

const githubService = {
  async getGitData(repo, dateISOString, typeOfOperation) {
    let comments = []
    let since = '&since=' + dateISOString
    since += '&sort=created&direction=desc'
    let endURL =
      typeOfOperation === 'comments'
        ? config.CommentsURL
        : typeOfOperation === 'issues'
          ? config.IssuesURL + since
          : typeOfOperation === 'pulls'
            ? config.PullsURL + since
            : ''
    const date = new Date(dateISOString)
    let response = await axios.get(`${config.BaseURL}${repo}${endURL}`, {
      headers: headers,
    })
    if (response.statusText === 'OK') {
      comments.push(...response.data)
      // console.log(response.statusText, response.data.length)
      // console.log(response.headers, response.headers['link'])
      if (response.headers['link'] !== undefined) {
        let routes = await getRoutes(response.headers['link'])
        // console.log(routes)

        for (const url of routes) {
          let result
          result = await axios.get(url, {
            headers: headers,
          })
          comments.push(...result.data)
          // console.log(result.data.length)
        }
      }
      // console.log(comments.length)
      let users = []
      await comments.map((stats) => {
        if (typeOfOperation === 'comments') {
          let fetchDate = new Date(stats.created_at)
          if (fetchDate > date) {
            if (stats.user['login']) {
              users.push(stats.user['login'])
            }
          }
        } else if (
          typeOfOperation === 'pulls' ||
          typeOfOperation === 'issues'
        ) {
          if (stats.user['login']) {
            users.push(stats.user['login'])
          }
        }
      })
      // console.log(users)
      let commentsData = await getCommentData(users)
      // console.log(commentsData)
      return commentsData
    }
  },

  async getGitStatsData(repo) {
    const commentsData = []

    let response = await axios.get(
      `${config.BaseURL}${repo}${config.StatsURL}`,
      {
        headers: headers,
      },
    )

    if (response.statusText === 'OK') {
      await response.data.map((stats) => {
        if (stats.author['login']) {
          commentsData.push({
            login: stats.author['login'],
            comments: 0,
            total: stats.total,
          })
        }
      })
    }

    // console.log(commentsData)
    return commentsData
  },
}

module.exports = githubService
