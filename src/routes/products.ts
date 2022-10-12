import express from 'express';
import { getProduct, getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/products'

const router: express.Router = express.Router();

router.route('/').get(getProducts).post(createProduct);
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);

export default router;