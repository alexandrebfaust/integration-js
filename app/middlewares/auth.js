const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({error: 'No token provided'});
    }
    else if(!authHeader.split(' ') === 2){
        return res.status(401).send({error: 'Token error'});
    }
    else{
        return next();
    }

    // const [scheme, token] = parts;

    // if(!/^Token$/i.test(scheme))
    //     return res.status(401).send({error: 'Token malformatted'});

    // jwt.verify(token, authConfig.secret, (err, decoded) => {
    //     if(err) return res.status(401).send({error: 'Token invalid'});

    //     req.userId = decoded.id;
    //     
    // })
};