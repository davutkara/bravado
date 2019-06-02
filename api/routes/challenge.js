import validator from 'validator'
import md5 from 'md5'
import redis from 'redis'
import utils from '../utils'
import { type } from 'os'
export default function(router, db, cache) {
  /**
   * Get all challenges
   * @param string  searchQuery
   * @param sortBy  sort
   * @param filters filter
   * @param int     page
   *
   * @sortBy    :  Popularity, difficulty, period, A-Z
   * @filters   :  Finished, Continuing
   */
  router.get('/challenge/all', (req, res) => {})

  /**
   * Get popular challanges by category
   * @param string  category
   *                    defauult = all
   */
  router.get('/challenge/popular', (req, res) => {})

  /**
   * Add  challange
   * @only user
   *
   * @param string      title
   * @param string[]    categories
   * @param string      startDate
   * @param string      finishDate
   * @param int         Goal
   * @param string      desription
   * @param BadgeObject badge
   *
   *
   * @BadgeObject
   *    string rotate
   *    string edge
   *    string color
   *
   */
  router.post(
    '/challenge/add',
    utils(db, cache).restrictByUserRole('user'),
    (req, res) => {
      const {
        title,
        categories,
        startDate,
        finishDate,
        Goal,
        description,
        badge
      } = req.body
      if (validator.isEmpty(validator.trim(title)))
        res.json({
          status: 'error',
          key: 'title',
          msg: 'title cannot be empty'
        })
      else if (categories.length < 1)
        res.json({
          status: 'error',
          key: 'categories',
          msg: 'at least one category is needed.'
        })
      else if (
        !validator.matches(
          String(startDate),
          /^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9])(?:( [0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/
        )
      )
        res.json({
          status: 'error',
          key: 'startDate',
          msg: 'startDate is not valid.'
        })
      else if (
        !validator.matches(
          String(finishDate),
          /^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9])(?:( [0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/
        )
      )
        res.json({
          status: 'error',
          key: 'finishDate',
          msg: 'finishDate must be in valid interval.'
        })
      else if (!validator.isInt(Goal))
        res.json({
          status: 'error',
          key: 'Goal',
          msg: 'Goal is not valid.'
        })
      else if (validator.isEmpty(validator.trim(description)))
        res.json({
          status: 'error',
          key: 'description',
          msg: 'description cannot be empty'
        })
      else if (!validator.isHexColor(validator.trim(badge.color)))
        res.json({
          status: 'error',
          key: 'badge',
          msg: 'color is not hex '
        })
      else
        db.query(
          'INSERT INTO challenge (owner,title,startDate,finishDate,goal,content,reward) VALUES (?,?,?,?,?,?,?)',
          [
            req.user.userId,
            title,
            startDate,
            finishDate,
            Goal,
            description,
            JSON.stringify(badge)
          ],
          function(error, results, fields) {
            if (error && error.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD')
              res.json({
                status: 'error',
                msg: 'Invalid value, please control your credientials.'
              })
            else if (results && results.affectedRows)
              res.json({ status: 'success', msg: 'success' })
            else {
              console.log(error)
              res.json({
                status: 'error',
                msg: 'Unknown error'
              })
            }
          }
        )
    }
  )

  /**
   * Delete challenge
   * @only  Challenge Owner OR admin
   *        @if req.user.serId === challengeOwnerId
   *        @elseIf req.user.role === admin
   */
  router.post('/challenge/delete', (req, res) => {})
}
