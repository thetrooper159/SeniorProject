var mysql = require('mysql2');
var sql = require('../../settings.js');

const connection = mysql.createConnection(sql);

function insertNotification(notification, callback) {
  connection.query('INSERT INTO notifications (idnotifications, guest, house, event, alert, date_time) VALUES (?, ?, ?, ?, ?, ?)',
    [3, notification.guest, notification.house,
      notification.event, notification.alert, notification.date_time],
    function (err, headers, fields) {
      if (err) {
        console.log(err);
      } else {
        callback();
      }
    });
}

insertNotification({
  guest: 1,
  house: 6,
  event: 'today',
  alert: 'tomorrow',
  date_time: 0,
}, function () {
  console.log('done!');
});
