const express = require('express');
// const fetch = express.fetch
const router = express.Router()
const axios = require('axios')
// import fetch from "node-fetch";
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

router.get('/', (req, res, next) => {
    res.render("index", {
        city: null,
        icon: null,
        temp: null,
        desc: null
    })
})

router.post('/', (req, res, next) => {
    const place = req.body
    console.log(place)

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place.name}&appid=b662239483c3ef8213f6cc1619f255ca`

    // try{
    //     const response =await axios({
    //         url,
    //         method:'get'
    //     })
    //     console.log(response)
    // }
    try {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.message === 'city not found') {
                    res.render('index', {
                        city: null,
                        icon: null,
                        temp: null,
                        desc: null
                    })
                }
                else {
                    console.log(data.name)
                    console.log(data.main.temp)
                    console.log(data.weather[0].icon)
                    console.log(data.weather[0].description)
                    res.render('index', {
                        city: data.name,
                        temp: data.main.temp,
                        icon: data.weather[0].icon,
                        desc: data.weather[0].description
                    })
                }
            }
            )
            .catch(() => {
                console.log("Error in axios")
            })

    }
    catch (err) {
        console.log(err)
        res.render("index", {
            city: "something went wrong",
            icon: null,
            temp: null,
            desc: null
        })
    }
})


module.exports = router