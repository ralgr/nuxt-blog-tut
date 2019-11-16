// Express codes.

// Import syntax understood by node.

const express = require('express');

const router = express.Router();

// Transform the incoming request data to the correct format?
// Instantiates an Express app then take the incoming request and response data
// and map it to the API provided by Express to be able to use the exact same syntax 
// as Express provides it. This makes the res.status().json() works correctly.

const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// A default express route contains the request and response as arguments.
// Server-side code can be executed here.
// To be able to read the contents of the body, the body-parser package is installed.
// Continuation on the Nuxt config file.

router.post("/track-data", (req, res) => {
    console.log('Stored data!', req.body.data);
    res.status('200').json({message: 'Success!'});
});

module.exports = {
    // To reach the routes defined in this file. This means that, track-data can be
    // reached by sending a request to /api/track-data.
    path: '/api',
    handler: router
}

// Add the exported middleware to the Nuxt config file under the serverMiddleware.

