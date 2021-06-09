const { response } = require('express');
const express = require('express');
const router = express.Router();
const categories = require("../repository/category_repository")

router.post('/', (req, res) => {
    categories.add(req.body,res)
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    categories.update(id, req.body,res);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    categories.remove(id, res);
});

router.get('/', (req, res) => {
    categories.all(res);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    categories.find(id,res);
});

module.exports = router;