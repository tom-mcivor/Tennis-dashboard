
const fetch = require('node-fetch')
const express = require('express')

const router = express.Router()

require('dotenv').config()

const apiKey = process.env.TMDB_API_KEY


router.get('/:playername', (req, res) => {
  
  const playername = req.params.playername

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'tennisapi1.p.rapidapi.com'
    }
  }
  return fetch(`https://tennisapi1.p.rapidapi.com/api/tennis/search/${playername}`, options)
    .then((result) => {
      return result.json()
    })
    .then((data) => {
      console.log(data)
      return res.json(data)
    })
    .catch((err) => console.error(err)) 
})

router.get('/image/:id', (req, res) => {
  
  const playerid = req.params.id

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'tennisapi1.p.rapidapi.com'
    }
  }
  fetch(`https://tennisapi1.p.rapidapi.com/api/tennis/player/${playerid}/image`, options)
	.then(response => {
   
      console.log(response.body)
      res.json(response)
      // return ( 
      //   response.json()
      //       )
    })
	.then(response => console.log(response))
	.catch(err => console.error(err));
})



module.exports = router