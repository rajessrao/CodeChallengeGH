module.exports = async function (link) {
  console.log(link)
  let routes = []
  let nextURL = ''
  let lastURL = ''
  let next = ''
  let last = ''
  const nextBegin = '<'
  const nextEnd = '>; rel="next", <'
  const lastBegin = 'next", <'
  const lastEnd = '>; rel="last"'
  if (link !== undefined) {
    nextURL = await link.substring(
      link.indexOf(nextBegin),
      link.indexOf(nextEnd),
    )
    lastURL = await link.substring(
      link.indexOf(lastBegin),
      link.indexOf(lastEnd),
    )

    next = await nextURL.replace(nextBegin, '')
    last = await lastURL.replace(lastBegin, '')
    console.log(next, last)
    const pattern = /.*(\?page=)|(&per_page=).*/
    const regex = new RegExp(pattern, 'g')
    const nextInt = parseInt(next.replace(regex, ''), 0)
    const lastInt = parseInt(last.replace(regex, ''), 0)
    console.log(nextInt, lastInt)
    let url = ''
    const begin = /.*(\?page=)/
    const end = /(&per_page=).*/
    let urlBegin = next.replace(end, '')
    let urlEnd = next.replace(begin, '')
    let start = urlBegin.slice(0, urlBegin.length - 1)
    let finish = urlEnd.slice(1)
    routes.push(next)
    if (lastInt - nextInt > 1) {
      for (let i = nextInt + 1; i < lastInt; i++) {
        url = start + i + finish
        routes.push(url)
      }
    }
    routes.push(last)
    return routes
  }
}
