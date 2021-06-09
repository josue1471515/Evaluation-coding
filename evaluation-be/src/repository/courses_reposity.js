const mysqlConnection = require('../database.js');

function add(body, res) {
    const { name } = body;
    const sql = 'INSERT INTO courses SET ?'; 
    const categoryObj = {
        name: name,
    };
    mysqlConnection.query(sql, categoryObj, (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'course Saved', id: rows.insertId });
        } else {
            console.log(err);
            res.json({ status: 'error', message: err.message });
        }
    });
}

function update(id, body, res) {
    const {name } = body;
    const sql = `UPDATE courses SET name = '${name}' WHERE id =${id}`;
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Course Updated' });
        } else {
            console.log(err);
            res.json({ status: 'error', message: err.message });
        }
    });
}

function remove(id, res) {
    mysqlConnection.query('DELETE FROM courses WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Course Deleted' });
        } else {
            console.log(err);
            res.json({ status: 'error', message: err.message });
        }
    });
}

function all(res) {
    mysqlConnection.query('SELECT c.*,cc.category_id FROM courses c inner join category_course cc on cc.course_id = c.id ', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
            res.json({ status: 'error', message: err.message });
        }
    });
}

function find(id, res) {
    mysqlConnection.query('SELECT * FROM courses WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
            res.json({ status: 'error', message: err.message });
        }
    });
}

module.exports = { add, update, remove, all, find };