const githubService = require('../services/githubService')

module.exports = async function (repo, dateISOString) {
  let comments = await githubService.getGitData(repo, dateISOString, 'comments')
  let totalData = [...comments]
  console.log('totalData ::::::::::::::::::::: ', totalData)
}
