var c = require('../db-connection');

exports.loginUser=(req, res)=>{
	c.query('SELECT username, password FROM user WHERE username = ?', [req.body.username], function(err, rows){
		if (err) throw err;
		if (rows[0] && rows[0].password === req.body.password){
			req.session.username = req.body.username;
			res.json({ redirect: '/' });
      console.log("Success")
		}else{
			res.json({ redirect: '/login'});
      console.log("ERROR")
		}
	});
}

exports.logoutUser=(req, res)=>{
	delete req.session.username;
	res.redirect('/login');
}

exports.getUsers=(req, res)=>{
	c.query('SELECT * FROM user', function(err, rows, fields) {
		if (!err){
			res.send(rows);
		}
	});
}

exports.getUser=(req,res)=>{
  c.query('SELECT * FROM user WHERE userid = (?)', [req.params.userid], function(err, rows){
    if (!err){
      res.send(rows[0]);
    }
  });
}

exports.addUser=(req, res)=>{
  var newUser = {
    username: req.body.username,
    password: req.body.password,
    accounttype: req.body.accounttype,
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    lastname: req.body.lastname,
    contactno: req.body.contactno,
    address: req.body.address,
    email: req.body.email,
    dateadded: req.body.dateadded
  }

  c.query('INSERT INTO user VALUES(0, :username, :password, :accounttype, :firstname, :middlename, :lastname, :contactno, :address, :email, :dateadded, 0)', newUser, function(err, results) {
    if (err) {
      console.log(err);
    }
    else {
    	console.log(results);
    	res.send({success: 'Successfully added: ' + newUser.username, id: results.info.insertId});
    };
  });
}

exports.updateUser=(req, res)=>{
  var updateUser = {
  	userid: req.body.userid,
    username: req.body.username,
    password: req.body.password,
    accounttype: req.body.accounttype,
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    lastname: req.body.lastname,
    contactno: req.body.contactno,
    address: req.body.address,
    email: req.body.email,
    dateadded: req.body.dateadded
  };

  c.query('UPDATE user SET password=:password, accounttype=:accounttype, firstname=:firstname, middlename=:middlename, lastname=:lastname, contactno=:contactno, address=:address, email=:email, dateadded=:dateadded WHERE userid=:userid', updateUser, function(err,rows){
    if (err){
      console.log(err);
    } else {
      console.log(results);
      res.send(req.body);
    }
  });
}

exports.deleteUser=(req,res)=>{
  c.query('DELETE FROM user WHERE userid = (?)', [req.params.userid], function(err, rows){
    if (err){
      console.log(err);
    }else{
      res.send({});
    }
  });
}