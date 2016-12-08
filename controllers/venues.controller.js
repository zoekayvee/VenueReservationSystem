var c = require('../db-connection');

exports.getVenues=(req,res)=>{
	c.query('SELECT * FROM venue', function(err, rows, fields) {
		if (!err){
			res.send(rows);
		}
	});
}

exports.getVenue=(req,res)=>{
  c.query('SELECT * FROM venue WHERE venueid = (?)', [req.params.venueid], function(err, rows){
    if (!err){
      res.send(rows[0]);
    }
  });
}

exports.addVenue=(req, res)=>{
  var newVenue = {
    venuename: req.body.venuename,
    venuecapacity: req.body.venuecapacity,
    venuedetails: req.body.venuedetails
  }

  c.query('INSERT INTO venue VALUES(0, :venuename, :venuecapacity, :venuedetails)', newVenue, function(err, results) {
    if (err) {
      console.log(err);
    }
    else {
    	console.log(results);
    	res.send({success: 'Successfully added: ' + newVenue.venuename, id: results.info.insertId});
    };
  });
}

exports.updateVenue=(req,res)=>{
  var updateVenue = {
    venuename: req.body.venuename,
    venuecapacity: req.body.venuecapacity,
    venuedetails: req.body.venudetails
  };

  c.query('UPDATE venue SET venuename=:venuename, venuecapacity=:venuecapacity, venuedetails=:venuedetails WHERE venueid=:venueid', req.body, function(err,rows){
    if (err){
      console.log(err);
    } else {
      console.log(results);
      res.send(req.body);
    }
  });
}

exports.deleteVenue=(req,res)=>{
  c.query('DELETE FROM venue WHERE venueid = (?)', [req.params.venueid], function(err, rows){
    if (err){
      console.log(err);
    }else{
      res.send({});
    }
  });
}
