import { Router } from 'express'
import { 
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById
} from '../controllers/userController.js'

const router = Router()

router.get("/getUsers", getUsers)
router.post("/createUser", createUser)
router.put("/updateUser/:id", updateUser)
router.delete("/deleteUser/:id", deleteUser)
router.get("/getUserById/:id", getUserById)

export default router