require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT
const movieRoutes = require("./routes/movie")
const {errorHandler} = require("./middleware/errHandler")
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use(movieRoutes)
app.use(errorHandler)

if (process.env.NODE_ENV == 'test') module.exports= app
else {
    app.listen(port, (err) => {
        if (err) {
            console.error(`Error: ${err.message}`)
        } else {
            console.log(`listening at http://localhost:${port}`)
        }
    })
}