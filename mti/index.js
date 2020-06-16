const express = require("express")
const rp = require("request")
const cheerio = require("cheerio");
const fs = require('fs')
const mtiLinks = require('./mti')
const mtiArr = []

const app = express()

mtiLinks.forEach(el => {
  rp(el.link, (error, response, html) => {
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
      const mtiPhoto = $('picture img').attr('srcset')
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
      mtiArr.push({source, title, music, lyrics, genre, musicalStyle, showType, showSetting, similarShows, plot, tags, mtiPhoto})
      const jsonified = JSON.stringify(mtiArr, null, 2)
      fs.writeFile('mtiFiltered.json', jsonified, 'utf8', err => {
        if (err) throw err
      })
    }
  })
})

app.listen(3000, () => {
  console.log('App is running!')
})
