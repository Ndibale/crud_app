const rateLimit = require('express-rate-limit');
const {logEvents} = require('./logger');


const LoginLimiter = rateLimit({
    windowMs: 60*1000, //1 min
    max: 5, //Limit each IP to 5 login requests per 'window' per min
    message:{ message:'Too many login attemps from this IP, please try again after 1 min pause' },
    handler :(req, res, next, options)=> {
        logEvents(`Too many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,'errLog.log')
        res.status(options.statusCode).send(options.message)
       
    },
    standardHeaders: true, // return rate limit in the 'RateLimit-*' headers
    legacyHeaders: false, // Disable the 'X-RateLimit-*' headers

})

module.exports = LoginLimiter;