// const express = require('express');
// const app = express();
// const port = 8000;
// const key = '?api_key=RGAPI-45e9a705-2eff-40a2-9f9b-fd4119c567a0';
// const axios = require('axios');
// var config = {
//     headers: {'Access-Control-Allow-Origin': '*'}
// };

// app.get('/', (req, response)=>{
//     let champs;
//     axios
//     .get(`https://na1.api.riotgames.com/lol/static-data/v3/champions${key}`, config)
//     .then(res=>response.status(res.status).send(res.data))
//     .catch(err=>console.log(err))
// })

// app.listen(port, ()=>console.log(`listening on port ${port}`))