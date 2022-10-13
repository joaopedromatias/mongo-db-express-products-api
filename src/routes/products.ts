import express from 'express';
import { getProduct, getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/products'
import { checkIsNumber } from '../middlewares/checkIsNumber';
import { checkParamsCreate } from '../middlewares/checkParamsCreate';
import { checkParamsPut } from '../middlewares/checkParamsPut';

const router: express.Router = express.Router();

router.use('/:id', checkIsNumber);

router.route('/').get(getProducts).post(checkParamsCreate, createProduct);
router.route('/:id').get(getProduct).put(checkParamsPut, updateProduct).delete(deleteProduct);

export default router;