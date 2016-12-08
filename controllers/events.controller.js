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
    userid: req.body.userid,
    acountid: req.body.acountid,
    eventname: req.body.eventname,
    eventdetails: req.body.eventdetails,
    eventdate: req.body.eventdate,
    eventstarttime: req.body.eventstarttime,
    eventendtime: req.body.eventendtime,
    eventtype: req.body.eventtype,
    eventadvertised: req.body.eventadvertised,
  }

  c.query('INSERT INTO event VALUES(0, :userid, :accountid, :eventname, :eventdetails, :eventdate, :eventstarttime, :eventendtime, :eventtype, :eventadverised)', newEvent, function(err, results) {
    if (err) {
      console.log(err);
    }
    else {
    	console.log(results);
    	res.send({success: 'Successfully added: ' + newEvent.eventname, id: results.info.insertId});
    };
  });
}

exports.updateEvent=(req,res)=>{
  var updateEvent = {
    userid: req.body.userid,
    acountid: req.body.acountid,
    eventname: req.body.eventname,
    eventdetails: req.body.eventdetails,
    eventdate: req.body.eventdate,
    eventstarttime: req.body.eventstarttime,
    eventendtime: req.body.eventendtime,
    eventtype: req.body.eventtype,
    eventadvertised: req.body.eventadvertised,
  }

  c.query('UPDATE event SET eventname=:eventname, eventdetails=:eventdetails, eventdate=:eventdate, eventstarttime=:eventstarttime, eventendtime=:eventendtime, eventtype=:eventtype, eventadvertised=:eventadverised WHERE eventid=:eventid', updateEvent, function(err,rows){
    if (err){
      console.log(err);
    } else {
      console.log(results);
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