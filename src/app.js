const express = require('express');
const path = require('path');
const hbs = require('hbs')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express();

// Define paths for Express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handelbars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



//Setup static directioy to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
    res.render('index' , {
        title: "Weather",
        name: "Lidor Hadar"
    })
})


app.get('/about', (req,res) => {
    res.render('about' , {
        title: "About me",
        name: "Lidor Hadar"
    })
})


app.get('/help', (req,res) => {
    res.render('help' , {
        message: "help message for the user",
        title: "Help" ,
        name: "Lidor Hadar"
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address){
        res.send({
            error:'Must provide address!'
        })
    }

    geocode(req.query.address,(error, geoCodeObject = {} )=>{
        if(error){
            res.send({
                error:'Cannot find this location!'
            })
        }
        else{
            forecast(geoCodeObject.latitude,geoCodeObject.longtitude,(error , forecastData)=>{
                if(error){
                    res.send({
                        error:'Cannot find the weather of this location!'
                    })
                }
                else
                {
                    res.send({
                        forecast: forecastData,
                        location: geoCodeObject.location,
                        address: req.query.address
                })
                }

            })

        }

    })


    

   
    
})

app.get('/help/*', (req,res) => {
    res.render('404' , {
        errorMessage: "Help article not found",
        title: "404 error" ,
        name: "Lidor Hadar"
    })
})

app.get('*', (req,res) => {
    res.render('404' , {
        errorMessage: "Page not found",
        title: "404 error" ,
        name: "Lidor Hadar"
    })
})


app.listen(3000 , ()=> {
    console.log('Server is up on port 3000')
})
