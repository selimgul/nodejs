const jwt = require('../modules/utils/jwt')();

const mongoose = require('../modules/db/mongo.client.mongoose')();

module.exports = async (req, res, next) => {

  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied. No token provided.");
 
  if (token.startsWith('Bearer '))
    token = token.slice(7, token.length);

  try {
    const decoded = jwt.verify(token);
    req.user = decoded;
    
    const user = await mongoose.getOneByName(req.user.name);
    
    if (!user || (user.password !== req.user.password))
      throw ("Not authorized user.");
      
    next();
  } catch (err) {    
    res.status(400).send(err);
  }
};