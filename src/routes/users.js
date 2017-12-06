const express = require('express');
const router = express.Router();
const ctrl = require('../controller/users.controller')

// only administrators can view list of users. 
// ctrl.isAdmin will respond with the userId if the user is not an admin?? 
router.get('/', ctrl.isAdmin, ctrl.index)
// admins and the user themselves can view their own info
router.get('/:id', ctrl.isAdminOrIsUser, ctrl.show)
// no router.post('/') route, because auth.register creates the user
// admins and users can update profile.
router.patch('/:id', ctrl.isAdminOrIsUser, ctrl.exists, ctrl.update)
// only admins can delete profiles.
router.delete('/:id', ctrl.isAdmin, ctrl.exists, ctrl.delete)

module.exports = router
