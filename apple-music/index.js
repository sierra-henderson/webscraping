const express = require("express")
const jwt = require("jsonwebtoken")
const fs = require('fs')

const app = express()

app.get('/api', (req, res) => {
  res.send('appleMusicKey')
})

app.post('/api/login', (req, res) => {
  const payload = {
      "iss": "2QRV9JRJ2M",
      "iat": Date.now() / 1000,
      "exp": Date.now() / 1000 + 15776000
  }
  fs.readFile('AppleMusicKey.p8', 'utf8', (err, data) => {
    if (err) throw err
    console.log(data)
    const secret = data.toString()
    jwt.sign(payload, secret, { algorithm: 'ES256', keyid: '3GTL87U8XM' }, (err, token) => {
      console.log(err)
      res.json({
        token
      })
    })
  })
})

app.listen(3000, () => {
  console.log('App is running!')
})
