const jwt = require('jsonwebtoken');
const token = jwt.sign({ foo: 'bar' }, 'shhhhh');

const handleSignin = (db, bcrypt) => (req, res) => {
  const {
    email,
    password
  } = req.body;
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
          .catch(err => Promise.reject('unable to get user'))
      } else {
        Promise.reject('wrong credentials')
      }
    })
    .catch(err => Promise.reject('wrong credentials'))
}

const getAuthTokenId = () => {
  console.log('HIT getAuthTokenId')
}

const signToken = (email) => {
  console.log('HIT signToken')
  const jwtPayload = {email};
  // needs environmental variable
  return jwt.sign(jwtPayload, 'shhhhh');
}

const createSessions = (user) => {
  console.log('HIT createSessions')
  const {email, id} = user;
  const token = signToken()
  // JWT getAuthTokenId, return data
}

const signInAuthentication = (db, bcrypt) => (req, res) => {
  const {authorization} = req.headers;
  return authorization ? 
  getAuthTokenId() : 
  handleSignin(db, bcrypt, req, res)
    .then(data => {
      data.id && data.email ? createSessions(data) : Promise.reject(data)
    })
    .catch(err => res.status(400).json())
}

module.exports = {
  handleSignin: handleSignin,
  signInAuthentication: signInAuthentication
}