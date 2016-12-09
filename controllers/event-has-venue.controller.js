var c = require('../db-connection');

exports.getAll = (req, res) => {
    c.query('SELECT * FROM event_has_venue', (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
}

exports.getAllDetails = (req, res) => {
    c.query('select * from venue natural join event natural join event_has_venue natural join user', (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
}

exports.add = (req, res) => {
    c.query('INSERT INTO event_has_venue VALUES(:eventid, :venueid, :reservationdate)', req.body, (err, rows) => {
        if (err) throw err;
        res.send(req.body);
    }); 
}

exports.delete = (req, res) => {
    c.query('DELETE FROM event_has_venue WHERE eventid = ? and venueid = ?', [req.params.eventid, req.params.venueid], (err, rows) => {
        if (err) throw err;
        res.send({});
    });
}


