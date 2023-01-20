import { Router } from 'express'
import { 
    getContacts,
    createContact,
    getContactById,
    updateContact,
    deleteContact,
    getContactByName,
    sortContactsByName,
    sortContactsByEmail,
    sortContactsByPhone,
    uploadContactPhoto,
    downloadContactPhoto,
    pagination,
    countContacts,
    checkEmail,
    checkPhone,
    getContactsByGroup,
    addGroupToContact
} from '../controllers/contactController.js'
import { upload } from '../multerConfig.js';

const router = Router()

router.get("/getContacts", getContacts)
router.post("/createContact", createContact)
router.get("/getContactById/:id", getContactById)
router.put("/updateContact/:id", updateContact)
router.delete("/deleteContact/:id", deleteContact)
router.get("/search/:name", getContactByName)
router.get("/sort/name", sortContactsByName)
router.get("/sort/email", sortContactsByEmail)
router.get("/sort/phone", sortContactsByPhone)
router.post("/:id/photo", upload.single('photo'), uploadContactPhoto)
router.get("/:id/download-photo", downloadContactPhoto)
router.get("/:pageNumber/:limit", pagination)
router.get("/count", countContacts)
router.get("/check-email/:email", checkEmail)
router.get("/check-phone/:phone", checkPhone)
router.get("/group/:group", getContactsByGroup)
router.put("/contacts/:id/group/:group", addGroupToContact)

export default router