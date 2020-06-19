const express  = require('express')
const concord1 = require('./concord1.json')
const concord2 = require('./concord2.json')
const concord3 = require('./concord3.json')
const concord4 = require('./concord4.json')
const concord5 = require('./concord5.json')
const fs       = require('fs')

const app = express()

const fullArray = concord1.concat(concord2, concord3, concord4, concord5)
.sort((a, b) => {
  const musicalA = a.title.toLowerCase()
  const musicalB = b.title.toLowerCase()
  console.log(musicalA)
  let compare = 0;
  if (musicalA > musicalB) {
    compare = 1
  } else if (musicalA < musicalB) {
    compare = -1
  }
  return compare;
})
const jsonified = JSON.stringify(fullArray, null, 2)
fs.writeFile('onceMoreWithFeeling.json', jsonified, 'utf8', err => {
  if (err) throw err
})

app.listen('3000', () => {
  console.log("Combine module is running!")
})
