const express = require('express');
const router = express.Router();
const employeeController = require('../Controller/UserController');
const upload = require("../Utils/Multer")

router.post("/login",employeeController.adminLogin)
router.post('/employee',upload.single("image"), employeeController.createEmployee);
router.get("/users",employeeController.getEmployees)
router.put('/employee/:id', upload.single('image'), employeeController.updateEmployee);
router.delete('/employee/:id',employeeController.DeleteEmployee)
module.exports = router;