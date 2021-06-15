const express = require('express'),
    tripsRoutes = require('./tours');

var router = express.Router();

router.get('/getTours', tripsRoutes.getTours);
router.get('/getTour/:id', tripsRoutes.getTour);
router.post('/createTour/:id', tripsRoutes.createTour);
router.post('/createSiteInPath/:id', tripsRoutes.createSiteInPath);
router.put('/updateTour/:id', tripsRoutes.updateTour);
router.delete('/deleteTour/:id', tripsRoutes.deleteTour);
router.delete('/deleteSite/:id/:site_name', tripsRoutes.deleteSite);

module.exports = router;