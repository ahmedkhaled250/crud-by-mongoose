import {Router} from 'express'
import * as productController from "./controller/product.js"
import auth from '../../middlewear/auth.js'
const router = Router()
router.post('/',auth(),productController.addProduct)
router.put('/:id',auth(),productController.updateProduct)
router.delete('/:id',auth(),productController.deleteProduct)
router.get('/',productController.products)
export default router