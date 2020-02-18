var mysql = require('mysql2');
var sql = require('../../settings.js');

const connection = mysql.createConnection(sql);

function insertNotification(notification, callback) {
  connection.query('INSERT INTO notifications (guest, house, event, alert, date_time) VALUES (?, ?, ?, ?, ?)',
    [notification.guest, notification.house,
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
  guest: 'guest',
  house: 'house',
  event: 'event',
  alert: 'alert',
  date_time: 'date-and-time',
}, function () {
  console.log('done!');
});
