const lilSpotifyArr = [
  { link: "https://www.mtishows.com/the-toxic-avenger", title: "The Toxic Avenger" },
  { link: "https://www.mtishows.com/triumph-of-love", title: "Triumph of Love" },
  { link: "https://www.mtishows.com/the-25th-annual-putnam-county-spelling-bee", title: "The 25th Annual Putnam County Spelling Bee" },
  { link: "https://www.mtishows.com/the-unsinkable-molly-brown", title: "The Unsinkable Molly Brown" },
  { link: "https://www.mtishows.com/urinetown", title: "Urinetown" },
  { link: "https://www.mtishows.com/the-velveteen-rabbit", title: "The Velveteen Rabbit" },
  { link: "https://www.mtishows.com/violet", title: "Violet" },
  { link: "https://www.mtishows.com/waitress", title: "Waitress" },
  { link: "https://www.mtishows.com/the-wedding-singer", title: "The Wedding Singer" },
  { link: "https://www.mtishows.com/west-side-story", title: "West Side Story" },
  { link: "https://www.mtishows.com/western-star", title: "Western Star" },
  { link: "https://www.mtishows.com/what-about-luv", title: "What about Luv?" },
  { link: "https://www.mtishows.com/when-the-cookie-crumbles-you-can-still-pick-up-the-pieces", title: "When the Cookie Crumbles, You Can Still Pick up the Pieces " },
  { link: "https://www.mtishows.com/wheres-charley", title: "Where's Charley?" },
  { link: "https://www.mtishows.com/andrew-lippas-wild-party", title: "Wild Party" },
  { link: "https://www.mtishows.com/wildcat-on-safari", title: "Wildcat on Safari" },
  { link: "https://www.mtishows.com/roald-dahls-willy-wonka", title: "Willy Wonka" },
  { link: "https://www.mtishows.com/wish-you-were-here", title: "Wish You Were Here" },
  { link: "https://www.mtishows.com/women-on-the-verge-of-a-nervous-breakdown", title: "Women on the Verge of a Nervous Breakdown" },
  { link: "https://www.mtishows.com/wonderland-high", title: "Wonderland High" },
  { link: "https://www.mtishows.com/working", title: "Working" },
  { link: "https://www.mtishows.com/the-world-goes-round", title: "The World Goes 'Round" },
  { link: "https://www.mtishows.com/xanadu", title: "Xanadu" },
  { link: "https://www.mtishows.com/a-year-with-frog-and-toad", title: "A Year with Frog and Toad" },
  { link: "https://www.mtishows.com/youre-gonna-love-tomorrow", title: "You're Gonna Love Tomorrow" },
  { link: "https://www.mtishows.com/young-frankenstein", title: "Young Frankenstein" }
]

const queryArr = lilSpotifyArr.map(el => {
  return el.title.toLowerCase().replace(/[:;?!,.@#$%^*]/g, "").replace("a musical", "").replace("the musical", "").replace(/&/g, "and").replace(/\(([^()]+)\)/sg, "").replace(/\s$/g, "")
})

/*
5d8KyIBMnBn2CgjV02sYts






*/

const arr = []

queryArr.forEach((el, index) => {
  fetch(`https://api.spotify.com/v1/search?q=album:${el}&type=album`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + spotifyToken
    }
  })
    .then(response => response.json())
    .then(data => {
      const results = data.albums.items
      console.log(results)
      if (results.length) {
        let isMusical = false;
        for (let i = 0; i < results.length; i++) {
          if (data.albums.items[i].name.includes('Cast') || data.albums.items[i].name.includes('Recording') || data.albums.items[i].name.includes('West End') || data.albums.items[i].name.includes('Broadway') || data.albums.items[i].name.includes('Musical')) {
            isMusical = true;
          }
        }
        if (isMusical) {
          arr.push(lilSpotifyArr[index])
        }
        console.log(arr)
      }
    })
})


const smallArr = [
  { link: "https://www.mtishows.com/wish-you-were-here", title: "Wish You Were Here" },
  { link: "https://www.mtishows.com/women-on-the-verge-of-a-nervous-breakdown", title: "Women on the Verge of a Nervous Breakdown" },
  { link: "https://www.mtishows.com/wonderland-high", title: "Wonderland High" },
  { link: "https://www.mtishows.com/working", title: "Working" },
  { link: "https://www.mtishows.com/the-world-goes-round", title: "The World Goes 'Round" },
  { link: "https://www.mtishows.com/xanadu", title: "Xanadu" },
  { link: "https://www.mtishows.com/a-year-with-frog-and-toad", title: "A Year with Frog and Toad" },
  { link: "https://www.mtishows.com/youre-gonna-love-tomorrow", title: "You're Gonna Love Tomorrow" },
  { link: "https://www.mtishows.com/young-frankenstein", title: "Young Frankenstein" }
]

/*






*/

// const queryArr = smallArr.map(el => {
//   return el.title.toLowerCase().replace(/[:;?!,.@#$%^*]/g, "").replace("a musical", "").replace("the musical", "").replace(/&/g, "and").replace(/\(([^()]+)\)/sg, "").replace(/\s$/g, "").replace(/\s/g, "+")
// })


// const filteredArr = []

// Apple Music AJAX



// queryArr.forEach((el, i) => {
//   fetch(`https://api.music.apple.com/v1/catalog/us/search?term=${el}&limit=3&types=albums`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + appleDeveloperToken
//     }
//   })
//     .then(response => response.json())
//     .then(data => {
//       const searchResults = data.results.albums
//       if (searchResults) {
//         const albums = searchResults.data
//         for (let j = 0; j < albums.length; j++) {
//           if (albums[j].attributes.genreNames.includes("Soundtrack") || albums[j].attributes.genreNames.includes("Musical")) {
//             filteredArr.push(smallArr[i])
//             console.log(filteredArr)
//             return;
//           }
//         }
//       }
//     })
// })
