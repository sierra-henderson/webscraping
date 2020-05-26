const rp = require("request-promise")
const cheerio = require("cheerio");
const fs = require('fs')
const baseURL = "https://en.wikipedia.org"
const musicalsURL = "/wiki/List_of_musicals:_A_to_L"
const musicalArr = []

rp(baseURL + musicalsURL, (err, response, html) => {
  if (!err && response.statusCode === 200) {
    const $ = cheerio.load(html)
    $('.wikitable:first-of-type tbody tr').each((i, el) => {
      const link = $(el).find('td:first-of-type a').attr('href')
      rp(baseURL + link, (error, response, html) => {
        if (!error && response.statusCode === 200) {
          const $ = cheerio.load(html)
          $('.infobox tr').each((i, n) => {
            let music;
            let lyrics;
            if ($(n).find('th').text().toLowerCase() === 'music') {
              music = $(n).find('td').text()
            } else if ($(n).find('th').text().toLowerCase() === 'lyrics') {
              lyrics = $(n).find('td').text()
            }
            const title = $('th .summary').text()
            musicalArr.push({ title, music, lyrics })
          })
        }
      })
    })
    const jsonified = JSON.stringify(musicalArr, null, 2)
    fs.writeFile('data.json', jsonified, 'utf8', err => {
      if (err) throw err
    })
  }
})

// const links = [
//   "/wiki/110_in_the_Shade",
//   "/wiki/13_(musical)",
//   "/wiki/1492_Up_To_Date",
//   "/wiki/1600_Pennsylvania_Avenue_(musical)",
//   "/wiki/1776_(musical)",
//   "/wiki/1789:_Les_Amants_de_la_Bastille",
//   "/wiki/21_Chump_Street",
//   "/wiki/The_25th_Annual_Putnam_County_Spelling_Bee",
//   "/wiki/3_Musketiers",
//   "/wiki/42nd_Street_(film)",
//   "/wiki/42nd_Street_(musical)",
//   "/wiki/70,_Girls,_70",
//   "/wiki/8_Women",
//   "/wiki/9_to_5_(musical)",
// ]

// links.forEach(el => {
//   rp(baseURL + el, (err, response, html) => {
//     if (!err && response.statusCode === 200) {
//       const $ = cheerio.load(html)
//       $('.infobox tr').each((i, n) => {
//         let music;
//         let lyrics;
//         if ($(n).find('th').text().toLowerCase() === 'music') {
//           music = $(n).find('td').text()
//         } else if ($(n).find('th').text().toLowerCase() === 'lyrics') {
//           lyrics = $(n).find('td').text()
//         }
//         const title = $('th .summary').text()
//         musicalArr.push({ title, music, lyrics })
//       })
//     }
//   })
//   const jsonified = JSON.stringify(musicalArr, null, 2)
//   fs.writeFile('data.json', jsonified, 'utf8', err => {
//     if (err) throw err
//   })
// })
