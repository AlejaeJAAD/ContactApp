import { Router } from 'express'
import { 
    createContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact,
    getContactByName,
    sortContactsByName,
    sortContactsByEmail,
    sortContactsByPhone,
    paginationForContacts
} from '../controllers/contactController.js'

const router = Router()

router.post("/createContact", createContact)
router.get("/getContacts", getContacts)
router.get("/getContactById/:id", getContactById)
router.put("/updateContact/:id", updateContact)
router.delete("/deleteContact/:id", deleteContact)
router.get("/search/:name", getContactByName)
router.get("/sort/name", sortContactsByName)
router.get("/sort/email", sortContactsByEmail)
router.get("/sort/phone", sortContactsByPhone)
router.get("/:pageNumber/:limit", paginationForContacts)

export default router