const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode.js')
const forecast = require('../utils/forecast.js')
const app = express()

const port = process.env.PORT || 3000

// Express paths
const publicDirectoryPath= path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Templates ocations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Gabriel Dornianu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Gabriel Dornianu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Gabriel Dornianu'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a location'
        })
    }

    geocode(req.query.search, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: 'Location was not found'
            })
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error
                })
            } else {
                console.log(data)
                return res.send({
                    forecast: data,
                    address: req.query.search,
                    location
                })
            }
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('not-found', {
        title: 'Doc page not found',
        errorMessage: 'Help article not found',
        name: 'Gabriel Dornianu'
    })
})

app.get('*', (req, res) => {
    res.render('not-found', {
        title: 'Page not found',
        errorMessage: 'Page not found',
        name: 'Gabriel Dornianu'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
