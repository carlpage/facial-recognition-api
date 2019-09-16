const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
}

const handleProfileUpdate = (req, res, db) => {
  console.log('formInput', req.body.formInput)

  const {id} = req.params;
  const {name, age, pet} = req.body.formInput;
  console.log(name, age, pet)

  if (name && name !== '') {
    db('users')
      .where({id})
      .update({name})
      .then(resp => {
        if(resp) {
          res.json("success");
        } else {
          res.send(400).json("unable to update name");
        }
      })
      .catch(err => res.status(400).json('error updating name'));
  } 

  if (age && age !== '') {
    console.log('HIT age')
    db('users')
      .where({id})
      .update({age})
      .then(resp => {
        if(resp) {
          res.json("success");
        } else {
          res.send(400).json("unable to update age");
        }
      })
      .catch(err => res.status(400).json('error updating age'));
  } 

  if (pet && pet !== '') {
    console.log('HIT pet')
    db('users')
      .where({id})
      .update({pet})
      .then(resp => {
        if(resp) {
          res.json("success");
        } else {
          res.send(400).json("unable to update pet");
        }
      })
      .catch(err => res.status(400).json('error updating pet'));
  }
}

module.exports = {
  handleProfileGet,
  handleProfileUpdate
}