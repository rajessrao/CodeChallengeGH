const minimist = require('minimist')
const chalk = require('chalk')
const config = require('./src/config')
let comments = require('./src/controllers/commentsController')

// console.log(chalk.yellow('Your github token is:'))
// console.info(chalk.yellow(config.GITHUB_PERSONAL_ACCESS_TOKEN))

let argv = minimist(process.argv)
const repo = argv.repo
const period = argv.period
// console.log(repo, period)

if (typeof repo === 'string' && repo.match(/(\w)|(\/)|(-)/g)) {
  // console.log('Valid repo.')
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
  // console.log(dateISOString)
  console.log(`Fetching comments for past ${days} days for ${repo}`)
  comments(repo, dateISOString)
} else {
  console.log('Invalid repo, try again with valid repo.')
}

// remove this line
// require('./example')
