import express from 'express';
import { getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/products'

const router: express.Router = express.Router();

router.route('/').get(getProduct).post(createProduct);
router.route('/:id').put(updateProduct).delete(deleteProduct);

export default router;