const Controller = require('./Controller')('snacks')
const fields = ['name', 'description', 'price', 'img', 'is_perishable']

class SnacksController extends Controller {

  complete(req, res, next) {
    const errors = []
    fields.forEach(field => {
      if(!req.body.hasOwnProperty(field)) errors.push(`${field} is required`)
    })
    if(errors.lenth) res.status(400).json({ message: 'There were errors', errors })
    else next()
  }

  prune(req, res, next) {
    Object.keys(req.body).forEach(key => {
      if(!fields.includes(key)) delete req.body[key]
    })
    next()
  }
}

module.exports = SnacksController
