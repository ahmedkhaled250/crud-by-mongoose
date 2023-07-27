import {Router} from 'express'
import * as userController from "./controller/user.js"
import auth from '../../middlewear/auth.js'
const router = Router()
router.put('/updateProfile',auth(),userController.updateProfile)
router.patch('/updatePassword',auth(),userController.updatePassword)
router.delete('/deleteProfile',auth(),userController.deleteProfile)
router.get('/:id',userController.getUserById)
router.get('/',userController.users)
export default router