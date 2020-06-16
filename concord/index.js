const express = require("express")
const rp = require("request")
const cheerio = require("cheerio");
const fs = require('fs')

const baseConcordUrl = 'https://www.concordtheatricals.com'
const otherArr = []

const app = express()

const otherLinks = [
  { link: "/p/44694/titanic", title: "Titanic" },
  { link: "/p/44703/the-will-rogers-follies", title: "The Will Rogers Follies" },
  { link: "/p/44701/what-makes-sammy-run", title: "What Makes Sammy Run?" },
  { link: "/p/44699/victorvictoria", title: "Victor/Victoria" },
  { link: "/p/7354/yankee-doodle", title: "Yankee Doodle" },
  { link: "/p/44974/white-christmas", title: "White Christmas" },
  { link: "/p/2193/zombie-prom", title: "Zombie Prom" },
  { link: "/p/44861/whistle-down-the-wind-lloyd-webber", title: "Whistle Down The Wind (Lloyd Webber)" },
  { link: "/p/44924/whistle-down-the-wind-labeytaylor", title: "Whistle Down The Wind (Labey/Taylor)" },
  { link: "/p/7383/weird-romance", title: "Weird Romance" },
  { link: "/p/6750/woman-of-the-year", title: "Woman of the Year" },
  { link: "/p/44705/youre-a-good-man-charlie-brown-original", title: "You're A Good Man, Charlie Brown (Original)" },
  { link: "/p/44706/your-own-thing", title: "Your Own Thing" },
  { link: "/p/65877/wind-in-the-willows", title: "Wind in the Willows" },
  { link: "/p/63313/war-paint", title: "War Paint" },
  { link: "/p/4281/wild-dust-the-musical", title: "Wild Dust: The Musical" },
  { link: "/p/92746/we-arent-kids-anymore", title: "We Aren't Kids Anymore" },
  { link: "/p/17389/yo-vikings", title: "Yo, Vikings!" },
  { link: "/p/3242/zorba", title: "Zorba!" },
  { link: "/p/44704/wonderful-town", title: "Wonderful Town" },
]

/*

const appleMusicArr = [

]

*/

otherLinks.forEach(el => {
rp(baseConcordUrl + el.link, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html)
      const source = 'CT'
      const title = $('.title-hero__header .type-h1').text()
      let music = []
      let lyrics = []
      const genre = []
      let musicalStyle = []
      const similarShows = []
      let plot = null;
      const tags = []
      let musicLink = false
      if ($('.pdp-section .add-top-margin .type-regular').text()) {
        plot = $('.pdp-section .add-top-margin .type-regular').text().trim().replace(/\n/g, "")
      } else {
        const fullText = $('.title-hero__description').text()
        plot = fullText.substring(fullText.search(/[a-z][A-Z]+/) + 1, fullText.indexOf("Photo:"))
        console.log("plot", plot)
      }
      if ($('.iframe-placeholder').attr('data-type') === 'Spotify') {
        musicLink = true
      }
      const musicAndLyrics = $('.title-hero__description p').text().split("/");

      if ($('.title-hero__description p').text().indexOf("Lyrics by") === -1) {
        const authors = $('.title-hero__header .type-large-credits').text().split(",").map(el => el.trim())
        music = authors;
        lyrics = authors;
      } else {
        if (musicAndLyrics.length === 1) {
          if (musicAndLyrics[0].includes("Music")) {
            const musicStr = musicAndLyrics[0].replace("Music by", "*").replace("Music and Lyrics by", "*").replace("Music & Lyrics by", "*").replace("Music, & Lyrics by", "*").replace("Music, and Lyrics by", "*")
            let subMusic = musicStr.substring(musicStr.indexOf("*") + 2).trim()
            if (/[a-z][A-Z]+/.test(subMusic)) {
              let subMusicComplete = subMusic.substring(0, subMusic.search(/[a-z][A-Z]+/) + 1).replace(/\n/g, "")
              music.push(subMusicComplete)
            } else {
              music.push(subMusic)
            }
          }
          if (musicAndLyrics[0].includes("Lyrics")) {
            const lyricsStr = musicAndLyrics[0].replace("Lyrics by", "*").replace("Music and Lyrics by", "*").replace("Music & Lyrics by", "*").replace("Music, & Lyrics by", "*").replace("Music, and Lyrics by", "*")
            let subLyrics = lyricsStr.substring(lyricsStr.indexOf("*") + 2).trim()
            if (/[a-z][A-Z]+/.test(subLyrics)) {
              let subLyricsComplete = subLyrics.substring(0, subLyrics.search(/[a-z][A-Z]+/) + 1).replace(/\n/g, "")
              lyrics.push(subLyricsComplete)
            } else {
              lyrics.push(subLyrics)
            }
          }
        } else {
          for (let i = 0; i < musicAndLyrics.length; i++) {
            if (musicAndLyrics[i].includes("Music")) {
              const musicStr = musicAndLyrics[i].replace("Music by", "*").replace("Music and Lyrics by", "*").replace("Music & Lyrics by", "*")
              let subMusic = musicStr.substring(musicStr.indexOf("*") + 2).trim()
              music.push(subMusic)
            }
            if (musicAndLyrics[i].includes("Lyrics")) {
              const lyricsStr = musicAndLyrics[i].replace("Lyrics by", "*").replace("Music and Lyrics by", "*").replace("Music & Lyrics by", "*")
              let subLyrics = lyricsStr.substring(lyricsStr.indexOf("*") + 2).trim()
              lyrics.push(subLyrics)
            }
          }
        }
      }
      const mainGenreSelector = $('.title-hero__subinfo').text()
      if (mainGenreSelector.substring(0, mainGenreSelector.indexOf("/")).includes(",")) {
        if (mainGenreSelector.toLowerCase().includes("cabaret")) {
          const noCabaret = mainGenreSelector.replace("Revue / Cabaret", "*").replace("Revue/Cabaret", "*")
          genre.push(noCabaret.substring($('.title-hero__subinfo').text().indexOf("Revue / Cabaret") + 15))
        } else {
          const mainGenreText = mainGenreSelector.substring(mainGenreSelector.indexOf(",") + 1, mainGenreSelector.indexOf("/")).trim()
          genre.push(mainGenreText)
        }
      }
      $('.icon-list li').each((i, el) => {
        if ($(el).text().includes("genre")) {
          const shortList = $(el).text().substring($(el).text().indexOf("genre") + 6)
          if (shortList.includes(",")) {
            const shortListArr = shortList.split(",")
            for (let i = 0; i < shortListArr.length; i++) {
              if (shortList[i].toLowerCase().indexOf("not applicable") === -1) {
                genre.push(shortListArr[i].trim().replace(/\n/, ""))
              }
            }
          } else {
            genre.push(shortList)
          }
        }
      })
      const musicalStyleFull = $('.flex-basis-60-desktop .unstyled-list').children().first().text()
      if (musicalStyleFull.includes("Musical Style")) {
        const musicalStyleCut = musicalStyleFull.substring(musicalStyleFull.indexOf(":") + 2).trim()
        if (musicalStyleCut.includes(",")) {
          const musicalStyleArr = musicalStyleCut.split(",")
          for (let i = 0; i < musicalStyleArr.length; i++) {
            musicalStyle.push(musicalStyleArr[i].trim())
          }
        } else {
          musicalStyle.push(musicalStyleCut)
        }
      }
      $('#related-titles h5').each((i, el) => similarShows.push($(el).text().trim()))
      $('.pill-keyword').each((i, el) => tags.push($(el).text().trim()))
      otherArr.push({ source, title, music, lyrics, genre, musicalStyle, similarShows, plot, tags, musicLink })
      const jsonified = JSON.stringify(otherArr, null, 2)
      fs.writeFile('concord5.json', jsonified, 'utf8', err => {
        if (err) throw err
      })
    }
  })
})

app.listen(3000, () => {
  console.log('App is running!')
})
