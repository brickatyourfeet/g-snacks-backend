const request = require('superagent')
const url = 'https://api.unsplash.com/photos/random?count=30&query=food&client_id=a6a807ee12a63c5c6aa791d9b4080b2e03d26a4bd026a78e7699100ebbb99b0c'
const snacks = require('./snacks.json')

// const result = snacks.map((s) => {
//   request.get(url, (err, res) => {
//     console.log('RES?', res.url);
//     // return res.urls.full
//   })
// })

// console.log('RESULT', result);

// process.exit(1)

request.get(url, (err, res) => {
  console.log('RES:', res.body.length);
  for (const i of res.body) {
    console.log(i.urls.small);
  }
  // return res.urls.full
})
