import express from 'express';
import RestaurantsCtrl from './restaurants.controller.js';
import ReviewsCtrl from './reviews.controller.js';

const router = express.Router();

router.route('/').get(RestaurantsCtrl.apiGetRestaurants);
router.route('/id/:id').get(RestaurantsCtrl.apiGetRestaurantById);
router.route('/cuisines').get(RestaurantsCtrl.apiGetRestaurantCuisines);

router
  .route('/review')
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview);

// router.route('/').get((req, res) => {
//   res.send('ayyy boyos');
// });

export default router;

// this will be items route??? 35:00 for video
