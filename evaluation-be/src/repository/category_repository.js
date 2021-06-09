
const mysqlConnection = require('../database.js');

function add(body, res) {
    const { name, coursesSelected } = body;
    const sql = 'INSERT INTO categories SET ?';
    const categoryObj = {
        name: name,
    };
    mysqlConnection.query(sql, categoryObj, (err, rows, fields) => {
        if (!err) {
            addCourses(rows.insertId, coursesSelected)
            res.json({ status: 'Category Saved', id: rows.insertId });
        } else {
            console.log(err);
            res.json({ status: 'error', message: err.message });
        }
    });
}


function update(id, body, res) {
    const { name, coursesSelected } = body;
    const sql = `UPDATE Categories SET name = '${name}' WHERE id = ${id}`;
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err) {
            deleteCourses(id);
            addCourses(id, coursesSelected)
            res.json({ status: 'Category Updated' });
        } else {
            console.log(err);
            res.json({ status: 'error', message: err.message });
        }
    });
}

function remove(id, res) {
    deleteCourses(id);
    mysqlConnection.query('DELETE FROM Categories WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Category Deleted' });
        } else {
            console.log(err);
            res.json({ status: 'error', message: err.message });
        }
    });
}

function all(res) {
    mysqlConnection.query('SELECT * FROM Categories', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
            res.json({ status: 'error', message: err.message });
        }
    });
}

async function find(id, res) {
    let selected = await selectCourses(id);
    mysqlConnection.query('SELECT * FROM Categories WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            let values = rows[0];
            values.coursesSelected = selected;
            res.json(values);
        } else {
            console.log(err);
            res.json({ status: 'error', message: err.message });
        }
    })


}

function addCourses(insertId, coursesSelected) {
    if(coursesSelected){
        coursesSelected.forEach(element => {
            const objInsert = {
                category_id: insertId,
                course_id: element.id
            }
            const sql = 'insert into category_course SET ? '
            mysqlConnection.query(sql, objInsert, (err, rows, fields) => {
                console.log(err);
            });
        });
    }
}

function deleteCourses(id){
    mysqlConnection.query('DELETE FROM category_course WHERE category_id = ? ', [id], (err, rows, fields) => {
        if (!err) {
        } else {
            console.log(err);
        }
    });
}
async function selectCourses(id) {
    return new Promise(function (resolve, reject) {
        mysqlConnection.query('SELECT c.id,c.name FROM category_course cc inner join courses c on c.id =cc.course_id   WHERE cc.category_id = ? ', [id], (err, rows, fields) => {
            if (!err) {
                resolve(rows);
            } else {
                console.log(err);
            }
            return [];
        });
    })

}


module.exports = { add, update, remove, all, find };