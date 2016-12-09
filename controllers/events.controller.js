var c = require('../db-connection');

exports.getEvents=(req,res)=>{
	c.query('SELECT * FROM event', function(err, rows, fields) {
		if (!err){
			res.send(rows);
		}
	});
}

exports.getEvent=(req,res)=>{
  c.query('SELECT * FROM event WHERE eventid = (?)', [req.params.eventid], function(err, rows){
    if (!err){
      res.send(rows[0]);
    }
  });
}

exports.addEvent=(req, res)=>{
  var newEvent = {
    accountid: req.body.accountid,
    eventname: req.body.eventname,
    eventdetails: req.body.eventdetails,
    eventdate: req.body.eventdate,
    eventtype: req.body.eventtype,
    eventadvertised: req.body.eventadvertised,
    approved: req.body.approved,
    status: req.body.status
  }

  c.query('INSERT INTO event VALUES(0, :accountid, :eventname, :eventdetails, :eventdate, :eventtype, :eventadverised, :approved, :status)', newEvent, function(err, results) {
    if (err) {
      console.log(err);
    }
    else {
    	res.send({success: 'Successfully added: ' + newEvent.eventname, id: results.info.insertId});
    };
  });
}

exports.updateEvent=(req,res)=>{
  var updateEvent = {
    eventid: req.params.eventid,
    accountid: req.body.accountid,
    eventname: req.body.eventname,
    eventdetails: req.body.eventdetails,
    eventdate: req.body.eventdate,
    eventtype: req.body.eventtype,
    eventadvertised: req.body.eventadvertised,
    approved: req.body.approved,
    status: req.body.status
  }

  c.query('UPDATE event SET eventname=:eventname, eventdetails=:eventdetails, eventdate=:eventdate, eventtype=:eventtype, eventadvertised=:eventadverised, approved=:approved, status=:status WHERE eventid=:eventid', updateEvent, function(err,rows){
    if (err){
      console.log(err);
    } else {
      console.log("Updateeedd!")
      res.send(req.body);
    }
  });
}

exports.deleteEvent=(req,res)=>{
  c.query('DELETE FROM event WHERE eventid = (?)', [req.params.eventid], function(err, rows){
    if (err){
      console.log(err);
    }else{
      res.send({});
    }
  });
}