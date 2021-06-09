const { response } = require('express');
const express = require('express');
const router = express.Router();
const courses = require("../repository/courses_reposity")

router.post('/', (req, res) => {
    courses.add(req.body,res)
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    courses.update(id, req.body,res);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    courses.remove(id, res);
});

router.get('/', (req, res) => {
    courses.all(res);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    courses.find(id,res);
});

module.exports = router;