/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('/skladniki', '#controllers/skladnikis_controller').apiOnly()
router.resource('/koktajle', '#controllers/koktajles_controller').apiOnly()
router.resource('/koktajl_skladniki', '#controllers/koktajl_skladnikis_controller').apiOnly()
router.resource('/jednostki', '#controllers/jednostkis_controller').apiOnly()
