const rp = require("request")
const cheerio = require("cheerio");
const fs = require('fs')
const mtiLinks = require('./mti')
const mtiArr = []

mtiLinks.forEach(el => {
  rp(el, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html)
      const source = 'MTI'
      const title = $('.field-name-field-show-title-full').text()
      const music = []
      const lyrics = []
      const genre = []
      const musicalStyle = []
      const showType = []
      const showSetting = []
      const similarShows = []
      const plot = []
      const tags = []
      $('.field-name-field-show-attribution-author').each((i, el) => {
        if ($(el).prev().text().toLowerCase().includes('music')) {
          music.push($(el).text().trim())
          if ($(el).prev().text().toLowerCase().includes('lyrics')) {
            lyrics.push($(el).text().trim())
          }
        } else if ($(el).prev().text().toLowerCase().includes('lyrics')) {
          lyrics.push($(el).text().trim())
        }
      })
      $('.field-name-field-show-theme').each((i, el) => genre.push($(el).text().trim()))
      $('.field-name-field-show-style').each((i, el) => musicalStyle.push($(el).text().trim()))
      $('.field-name-field-show-type').each((i, el) => showType.push($(el).text().trim()))
      $('.field-name-field-show-setting').each((i, el) => showSetting.push($(el).text().trim()))
      $('.field-name-field-show-similar-shows a').each((i, el) => similarShows.push($(el).text().trim()))
      $('.field-name-field-show-synopsis-brief p').each((i, el) => plot.push($(el).text().trim()))
      $('.field-collection').each((i, el) => tags.push($(el).text().trim()))
      mtiArr.push({source, title, music, lyrics, genre, musicalStyle, showType, showSetting, similarShows, plot, tags})
      const jsonified = JSON.stringify(mtiArr, null, 2)
      fs.writeFile('mti.json', jsonified, 'utf8', err => {
        if (err) throw err
      })
    }
  })
})

// const baseURL = "https://en.wikipedia.org"
// const musicalsURL = "/wiki/List_of_musicals:_A_to_L"
// const musicalArr = []
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
//   rp(baseURL + el, (error, response, html) => {
//     if (!error && response.statusCode === 200) {
//       const $ = cheerio.load(html)
//       let title;
//       let music;
//       let lyrics;
//       $('.infobox tr').each((i, n) => {
//         if ($(n).find('th').text().toLowerCase() === 'music') {
//           music = $(n).find('td').text()
//         } else if ($(n).find('th').text().toLowerCase() === 'lyrics') {
//           lyrics = $(n).find('td').text()
//         }
//         title = $('th .summary').text()
//       })
//       musicalArr.push({ title, music, lyrics })
//       const jsonified = JSON.stringify(musicalArr, null, 2)
//       fs.writeFile('data.json', jsonified, 'utf8', err => {
//         if (err) throw err
//       })
//     }
//   })
// })
