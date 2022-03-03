const minimist = require('minimist')
const chalk = require('chalk')
let comments = require('./src/controllers/commentsController')

let argv = minimist(process.argv)

// Getting arguments (repo & period)
const repo = argv.repo
const period = argv.period

// Validating arguments (repo & period)
if (typeof repo === 'string' && repo.match(/(\w)|(\/)|(-)/g)) {
  let days = 0
  if (typeof period === 'string' && period.includes('d')) {
    days = period.replace(/([d])/g, '')
  }
  // eslint-disable-next-line radix
  const time = parseInt(days, 0)
  let dateISOString = ''
  if (time !== 0) {
    let date = new Date()
    date.setDate(date.getDate() - time)
    dateISOString = date.toISOString().replace(/(\..*)/g, 'Z')
  }

  // Log info
  console.log('\n')
  console.log(`Fetching comments for past ${days} days for ${repo}`)
  console.log('\n')

  // Start getting comments data
  comments(repo, dateISOString)
} else {
  console.log(chalk.red('Invalid repo, try again with valid repo.'))
}
