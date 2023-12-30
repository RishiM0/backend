const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()
const Number = require('./models/number.js')
require('dotenv').config()
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('tiny'))
app.use(cors())


app.get('/', (request, response) => {
    response.send('<h1> Hi There, go to /phoneNumbers for the phone numbers <h1>')
})

app.get('/info', (request, response) => {
    length = phoneNumbers.length
    //let theString = "<h1> Phonebook has info for " + length + " people<h1>";
    response.send("<h1> Phonebook has info for " + length + " people<h1> <br /> stuff")
})

app.get('/api/phoneNumbers', (request, response) => {
  Number.find({}).then(result => {
    console.log("here are all the current numbers: \n")
    response.json(result)
  })
})

app.get('/api/phoneNumbers/:id', (request, response) => {
    let id = request.params.id
    Number.findById(id).then(number => {
      response.json(number)
    })

    //if (number) {
        //response.json(number)
    //} else {
        //console.log('gotteeeem')
        //response.status(404).end()
    //}
})

app.post('/api/phoneNumbers', (request, response) => {
  //let maxId = phoneNumbers[phoneNumbers.length - 1].id
  const info = request.body
  if (!(info.name) || !(info.number)) {
    return response.status(400).json({error: "name or number is missing"})
  //} else if (phoneNumbers.find(number => number.name == request.body.name)) {
  //  return response.status(400).json({error: "name already present in phone numbers"})
  } else {
    let number = new Number({
      //id: maxId + 1,
      name: info.name,
      number: info.number
    })
    number.save().then(saved => response.json(saved))
}
})

app.delete('/api/phoneNumbers/:id', (request, response) => {
  let id = request.params.id
  Number.findByIdAndDelete(id).then(number => {
    response.status(204).json(number)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('listening to port');
})