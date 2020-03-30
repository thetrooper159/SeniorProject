var request = require('request');

request({
  uri: 'http://ljwolos.it.pointpark.edu:3000/api/v1/linens_request',
  method: 'POST',
  form: {
    house: '1',
    room: '2',
    guests: '3',
    towels: '4',
    washcloths: '5',
    bathmats: '6',
    bluebag: '7',
    date: '2072-11-21 00:00:00',
    twinsheets: '9',
    queensheets: '10',
    pillowcases: '8',
    isServed: '1',
<<<<<<< HEAD
    phoneID: '0'
=======
    phoneID: '0',
    lastname: 'null'
>>>>>>> origin/master
  }
}, function(error, response, body) {
  console.log(error);
  console.log(response);
});
