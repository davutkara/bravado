import jwt from 'jsonwebtoken'
import randtoken from 'rand-token'

const SECRET_KEY = 'development'

export function createSessionId() {
  return randtoken.suid(16)
}

export function createAuthToken(session) {
  return jwt.sign(session, SECRET_KEY)
}

export function verifyAuthToken(token) {
  return jwt.verify(token, SECRET_KEY)
}

export function restrictByUserRole(ROLE) {
  const root = this
  return function(req, res, next) {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    try {
      const session = verifyAuthToken(token)

      if (session === undefined) {
        res.set('WWW-Authenticate', 'Bearer realm="Authorization Required"')
        return res.status(401).send('Authorization Required')
      }
      root.cache.get(session, (err, id) => {
        if (err)
          res.status(400).json({
            status: 'error',
            msg: 'Cache error, please contact with developers'
          })
        root.db.query(
          `SELECT userId,name,surName,role,email,age,gender FROM user WHERE userId=?`,
          [id],
          function(error, results, fields) {
            const user = results[0]
            if (error || user === undefined || user.role !== ROLE)
              res.status(401).json({
                status: 'error',
                key: 'authorization',
                msg: 'No authorization for this path.'
              })
            req.user = user
            next()
          }
        )
      })
    } catch (err) {
      console.log(err)
      res.status(400).json({
        status: 'error',
        key: 'jwt',
        msg: 'jwt error'
      })
    }
  }
}

export default (db, cache) => {
  let fcns = {
    createSessionId,
    createAuthToken,
    verifyAuthToken,
    restrictByUserRole
  }

  if (db) fcns.db = db
  if (cache) fcns.cache = cache
  return fcns
}
