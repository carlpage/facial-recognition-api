const jwt = require('jsonwebtoken');
const redis = require('redis');

//setup Redis
const redisClient = redis.createClient({host: '127.0.0.1'});

const handleSignin = (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => user[0])
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        return Promise.reject('wrong credentials');
      }
    })
    .catch(err => err)
}

const getAuthTokenId = () => {
  console.log('auth OK')
}

const signToken = (email) => {
  console.log('HIT signToken', email)
  const jwtPayload = {email};
  // needs environmental variable
  return jwt.sign(jwtPayload, process.env.JWT_SECRET, {expiresIn: '2 days'});
}

const createSessions = (user) => {
  // JWT getAuthTokenId, return data
  console.log('HIT createSessions')
  const {email, id} = user;
  const token = signToken(email);
  return {success: 'true', userId: id, token};
}

const signInAuthentication = (db, bcrypt) => (req, res) => {
  const {authorization} = req.headers;
  return authorization ? getAuthTokenId() : 
  handleSignin(db, bcrypt, req, res)
    .then(data => {
      return data.id && data.email ? createSessions(data) : Promise.reject(data)
    })
    .then(session => res.json(session))
    .catch(err => res.status(400).json(err))
}

module.exports = {
  signInAuthentication: signInAuthentication
}