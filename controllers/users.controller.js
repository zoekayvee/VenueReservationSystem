var c = require('../db-connection');

exports.loginUser=(req, res)=>{
	c.query('SELECT accountid, username, password FROM user WHERE username = ? AND approved=1', [req.body.username], function(err, rows){
		if (err) throw err;
    console.log(rows[0])
		if (rows[0] && rows[0].password === req.body.password){
			req.session.accountid = rows[0].accountid;
			res.json({ redirect: '/' });
      console.log("Success")
		}else{
			res.json({ redirect: '/login'});
      console.log("ERROR")
		}
	});
}

exports.logoutUser=(req, res)=>{
	delete req.session.accountid;
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
  c.query('SELECT * FROM user WHERE accountid = (?)', [req.params.accountid], function(err, rows){
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
  	accountid: req.body.accountid,
    username: req.body.username,
    password: req.body.password,
    accounttype: req.body.accounttype,
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    lastname: req.body.lastname,
    contactno: req.body.contactno,
    address: req.body.address,
    email: req.body.email,
    dateadded: req.body.dateadded,
    approved: req.body.approved
  };

  c.query('UPDATE user SET password=:password, accounttype=:accounttype, firstname=:firstname, middlename=:middlename, lastname=:lastname, contactno=:contactno, address=:address, email=:email, dateadded=:dateadded, approved=:approved WHERE accountid=:accountid', updateUser, function(err,rows){
    if (err){
      console.log(err);
    } else {
      res.send(req.body);
    }
  });
}

exports.deleteUser=(req,res)=>{
  c.query('DELETE FROM user WHERE accountid = (?)', [req.params.accountid], function(err, rows){
    if (err){
      console.log(err);
    }else{
      res.send({});
    }
  });
}