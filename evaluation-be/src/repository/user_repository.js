
const mysqlConnection = require('../database.js');

function add(body, res) {
  const { first_name, last_name, ic, email, phone } = body;
  const sql = 'INSERT INTO users SET ?';
  const userObj = {
    first_name: first_name,
    last_name: last_name,
    ic: ic,
    email: email,
    phone: phone
  };
  mysqlConnection.query(sql, userObj, (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'User Saved', id: rows.insertId });
    } else {
      console.log(err);
      res.json({ status: 'error', message: err.message });
    }
  });
}

function update(id, body, res) {
  const { first_name, last_name, ic, email, phone } = body;
  const sql = `UPDATE users SET first_name = '${first_name}', last_name='${last_name}' , ic='${ic}' , email='${email}' , phone='${phone}' WHERE id =${id}`;
  mysqlConnection.query(sql, (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'User Updated' });
    } else {
      console.log(err);
      res.json({ status: 'error', message: err.message });
    }
  });
}

function remove(id, res) {
  mysqlConnection.query('DELETE FROM users WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'User Deleted' });
    } else {
      console.log(err);
      res.json({ status: 'error', message: err.message });
    }
  });
}

function all(res) {
  mysqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
      res.json({ status: 'error', message: err.message });
    }
  });
}

function find(id, res) {
  mysqlConnection.query('SELECT * FROM users WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
      res.json({ status: 'error', message: err.message });
    }
  });
}

function findCourses(id, res) {
  mysqlConnection.query(`
  SELECT cc.id id,ca.id category_id,ca.name category_name,c.id course_id,c.name course_name
  FROM users u
  inner join course_user cu on cu.user_id = u.id
  inner join courses c on cu.course_id = c.id
  inner join category_course cc on cc.course_id = c.id
  inner join categories ca on ca.id = cc.category_id
  WHERE u.id = ?
  `, [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
      res.json({ status: 'error', message: err.message });
    }
  });
}


function removeCourse(id) {
  mysqlConnection.query('DELETE FROM course_user WHERE user_id = ?', [id], (err, rows, fields) => {
    if (err) {
      console.log(err);
    }
  });


}
function addCourses(id, body, res) {
  const { courses_id } = body;
  removeCourse(id)
  if(!courses_id){
    res.json({info:"No rows to save."});
  }
  if(courses_id){
    courses_id.forEach(element => {
        const objInsert = {
            user_id: id,
            course_id: element
        }
        const sql = 'insert into course_user SET ? '
        mysqlConnection.query(sql, objInsert, (err, rows, fields) => {
       
            console.log(err);
        });
    });
    res.json({ status: 'User Updated' });
}
}
module.exports = { add, update, remove, all, find, findCourses,  addCourses };