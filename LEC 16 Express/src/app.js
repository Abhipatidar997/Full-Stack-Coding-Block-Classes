const express = require('express')
const autRouter = require('./routes/auth.router')
const userRouter = require('./routes/user.router')

const app = express()


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/api/auth", autRouter)
app.use("/api/users", userRouter)



// app.get('/', (req, res) => {
//   console.log('Received a GET request on ');
//   res.send('Home route');
// });

// app.get('/about', (req, res) => {
//   console.log('Received a GET request on /about');
//   res.send('About route');
// });


// app.use("/api/auth",autRouter)

module.exports = app



module.exports = app;


