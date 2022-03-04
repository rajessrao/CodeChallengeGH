const githubService = require('../services/githubService')
const refineData = require('../helpers/refineData')
const reportData = require('../helpers/reportData')

const commentsController = {
  async getComments(repo, dateISOString) {
    try {
      // Fetching comments data with comments, issues, pulls and stats
      let comments = await githubService.getGitData({
        repo,
        dateISOString,
        typeOfOperation: 'comments',
      })
      let issues = await githubService.getGitData({
        repo,
        dateISOString,
        typeOfOperation: 'issues',
      })
      let pulls = await githubService.getGitData({
        repo,
        dateISOString,
        typeOfOperation: 'pulls',
      })
      let stats = await githubService.getGitStatsData(repo)

      // Putting all data together
      let totalData = []

      // Adding comments data to totalData
      if (comments.length) {
        totalData.push(comments)
      }

      // Adding issues data to totalData
      if (issues.length) {
        totalData.push(issues)
      }

      // Adding pulls data to totalData
      if (pulls.length) {
        totalData.push(pulls)
      }

      // Adding stats data to totalData
      if (stats.length) {
        totalData.push(stats)
      }

      // Refining the totalData i.e combining and sorting
      let refinedData = await refineData.getRefinedData(totalData)

      /**
       * Reporting data in the below format
       * 3012 comments, michael.davidovich (20 commits)
       */
      reportData.getReport(refinedData)
    } catch (error) {
      console.error(error)
    }
  },
}

module.exports = commentsController
