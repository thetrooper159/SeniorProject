var mysql = require('mysql2');
var sql = require('../../settings.js');

const connection = mysql.createConnection(sql);

function insertNotification(notification, callback) {
  connection.query('INSERT INTO notifications (idnotifications, guest, house, event, alert, date_time, message) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [notification.guest, notification.house,
      notification.event, notification.alert, notification.date_time, notification.message],
    function (err, headers, fields, results) {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
        callback(true, "Page Updated!");
      }
    });
}
  connection.query('INSERT INTO notifications (idnotifications, guest, house, event, alert, date_time) VALUES (?, ?, ?, ?, ?, ?)',
    [notification.guest, notification.house,
      notification.event, notification.alert, notification.date_time, notification.message],
    function (err, headers, fields, results) {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
        callback(true, "Page Updated!");
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
