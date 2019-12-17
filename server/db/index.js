const mongoose = require('mongoose')

const dbRoute ="mongodb+srv://talnaf:cyQnED9TFswlPAnM@cluster0-6rtsy.mongodb.net/test?retryWrites=true";
mongoose
    .connect(dbRoute, {useUnifiedTopology: true, useNewUrlParser: true})
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db