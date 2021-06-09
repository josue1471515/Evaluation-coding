const { response } = require('express');
const express = require('express');
const router = express.Router();
const users = require("../repository/user_repository.js")

router.post('/', (req, res) => {
    users.add(req.body,res)
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    users.update(id, req.body,res);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    users.remove(id, res);
});

router.get('/', (req, res) => {
    users.all(res);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    users.find(id,res);
});

router.get('/course/:id', (req, res) => {
    const { id } = req.params;
    users.findCourses(id,res);
});

router.put('/course/:id', (req, res) => {
    const { id } = req.params;
    users.addCourses(id, req.body,res);
});


module.exports = router;