var express = require('express');
var router = express.Router();


const orderController = require('../controllers/orders')



router.get('/',  orderController.getAll);
router.get('/:id', orderController.getOne);

router.post('/', orderController.insert);
// router.put('/:id', orderController.insert);
// router.patch('/:id', orderController.insert);

// router.delete('/:id', authorizationMiddleware, () => {});


module.exports = router;
