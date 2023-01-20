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
    countContacts,
    checkEmail,
    checkPhone,
    createGroup,
    getContactsByGroup,
    addGroupToContact,
    pagination,
} from '../controllers/contactController.js'
import { upload } from '../multerConfig.js';

const router = Router()

router.get("/getContacts", getContacts)
router.post("/createContact/:createdBy", createContact)
router.get("/getContactById/:id", getContactById)
router.put("/updateContact/:id", updateContact)
router.delete("/deleteContact/:id", deleteContact)
router.get("/search/:name", getContactByName)
router.get("/sort/name", sortContactsByName)
router.get("/sort/email", sortContactsByEmail)
router.get("/sort/phone", sortContactsByPhone)
router.post("/:id/photo", upload.single('photo'), uploadContactPhoto)
router.get("/:id/download-photo", downloadContactPhoto)
router.get("/count", countContacts)
router.get("/check-email/:email", checkEmail)
router.get("/check-phone/:phone", checkPhone)

router.post("/contacts/createGroup", createGroup)
router.put("/contacts/:id/group/:group", addGroupToContact)
router.get("/group/:group", getContactsByGroup)

router.get("/:pageNumber/:limit", pagination)

export default router