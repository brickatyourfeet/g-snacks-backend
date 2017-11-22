const { snackModel: model } = require('../model')

const getAllSnacks = (req, res, next) => {
  model.getAllSnacks().then(snacks => {
    res.status(200).json({ snacks })
  })
}

module.exports = {
  getAllSnacks
}