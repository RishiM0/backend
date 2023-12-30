require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGOURL

mongoose.set('strictQuery',false)
mongoose.connect(url).then(console.log("connection working")).catch(err => console.log("connection error ", err.message))

const numberSchema = new mongoose.Schema({
  name: String,
  number: String,
})

numberSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Number', numberSchema)