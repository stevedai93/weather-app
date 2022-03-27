const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utlis/forecast')
const geocode = require('./utlis/geocode')

// console.log(__dirname)
// console.log(path.join(__dirname,'public'))


const app = express()
const port = process.env.PORT || 3000


//define paths
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebards
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup statis directory to serve
app.use(express.static(publicPath))




app.get('', (req, res) => {
    res.render('index', { 
        title: 'weather app',
        name: 'david so'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'not weather app',
        name: 'mike tyson'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'not health app',
        name: 'help me pls'
    })
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Steve',
//         age: 28
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<title>About Page</title>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, lontitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
    
        forecast(latitude, lontitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
    
            // console.log(location)
            // console.log(forecastData)
            res.send(forecastData)
          })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a seach term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

//app.com
//app.com/help
//app.com/about

app.get('/help/*', (req,res) => {
    res.render('error', {
        msg: 'help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        msg: '404 page go back'
    })
})

app.listen(port, () => {
    console.log('server running on port ' + port)
})