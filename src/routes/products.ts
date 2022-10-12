import express from 'express';
import { getProduct, getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/products'
import { checkIsNumber } from '../middlewares/checkIsNumber';

const router: express.Router = express.Router();

router.use('/:id', checkIsNumber);

router.route('/').get(getProducts).post(createProduct);
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);

export default router;