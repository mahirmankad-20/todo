const express = require('express')
const router = express.Router();
const {getTodo,addTodo} =require("../controller/todo");

router.get("/getTodo",getTodo);
router.post("/addtodo",addTodo);


module.exports = router;