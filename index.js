const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('tiny'))
app.use(cors())

let phoneNumbers = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    {
      "id": 5,
      "name": "bullsht", 
      "number": "1234567890"
    }
]

app.get('/', (request, response) => {
    response.send('<h1> Hi There, go to /phoneNumbers for the phone numbers <h1>')
})

app.get('/info', (request, response) => {
    length = phoneNumbers.length
    //let theString = "<h1> Phonebook has info for " + length + " people<h1>";
    response.send("<h1> Phonebook has info for " + length + " people<h1> <br /> stuff")
})

app.get('/api/phoneNumbers', (request, response) => {
    response.json(phoneNumbers)
})

app.get('/api/phoneNumbers/:id', (request, response) => {
    let id = request.params.id
    let number = phoneNumbers.find(number => number.id == id)

    if (number) {
        response.json(number)
    } else {
        console.log('gotteeeem')
        response.status(404).end()
    }
})

app.post('/api/phoneNumbers', (request, response) => {
  let maxId = phoneNumbers[phoneNumbers.length - 1].id
  const info = request.body
  if (!(request.body.name) || !(request.body.number)) {
    return response.status(400).json({error: "name or number is missing"})
  } else if (phoneNumbers.find(number => number.name == request.body.name)) {
    return response.status(400).json({error: "name already present in phone numbers"})
  } else {
    let newNote = {
      id: maxId + 1,
      name: info.name,
      number: info.number
    }
    phoneNumbers = phoneNumbers.concat(newNote)
    response.status(200).end()
}
})

app.delete('/api/phoneNumbers/:id', (request, response) => {
  let id = Number(request.params.id)
  let number = phoneNumbers.find(number => number.id == id)
  console.log('initial delete')

  if (number) {
    console.log('got here')
    phoneNumbers = phoneNumbers.filter(numbers => numbers.id !== id)
    response.json(phoneNumbers)
  } else {
    console.log('nani')
    response.status(404).end()
  }
})

const PORT = process.env.port || 3001
app.listen(PORT, () => {
    console.log('listening to port');
})