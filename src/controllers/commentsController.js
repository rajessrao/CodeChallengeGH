const githubService = require('../services/githubService')
const refineData = require('../helpers/refineData')
const reportData = require('../helpers/reportData')

module.exports = async function (repo, dateISOString) {
  let comments = await githubService.getGitData(repo, dateISOString, 'comments')
  let issues = await githubService.getGitData(repo, dateISOString, 'issues')
  let pulls = await githubService.getGitData(repo, dateISOString, 'pulls')
  let stats = await githubService.getGitStatsData(repo)
  let totalData = []

  if (comments.length) {
    totalData.push(comments)
  }

  if (issues.length) {
    totalData.push(issues)
  }

  if (pulls.length) {
    totalData.push(pulls)
  }

  if (stats.length) {
    totalData.push(stats)
  }

  // console.log('totalData ::::::::::::::::::::: \n', totalData)

  let refinedData = await refineData(totalData)

  // Data report
  reportData(refinedData)
}
