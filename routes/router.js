const venueController =require('../controllers/venues.controller');
const eventController =require('../controllers/events.controller');
const userController =require('../controllers/users.controller');
const express = require('express');
const router = express.Router();

// Routes and Controller Access
router.get('/login', (req,res)=>{
	res.sendFile('views/login.html',{root:__dirname+'/..'});
})

router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);

router.post('/register', userController.addUser);

// ALlows user access to other routes if logged in
router.use(function(req, res, next){
	if (req.session && req.session.username){
		next();
	} else {
		res.redirect('/login');
	}
})

router.get('/venues', venueController.getVenues);
router.get('/venues/:venueid', venueController.getVenue);
router.post('/venues', venueController.addVenue);
router.put('/venues/:venueid', venueController.updateVenue);
router.delete('/venues/:venueid', venueController.deleteVenue);

router.get('/events', eventController.getEvents);
router.get('/events/:eventid', eventController.getEvent);
router.post('/events', eventController.addEvent);
router.put('/events/:venueid', eventController.updateEvent);
router.delete('/events/:venueid', eventController.deleteEvent);

router.get('/users', userController.getUsers);
router.get('/users/:userid', userController.getUser);
router.post('/users', userController.addUser);
router.put('/users/:userid', userController.updateUser);
router.delete('/users/:userid', userController.deleteUser);

router.get('/', (req,res)=>{
	res.sendFile('views/index.html',{root:__dirname+'/..'});
})

module.exports = router;
