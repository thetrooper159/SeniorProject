var request = require('request');

request({
  uri: 'ljwolos.it.pointpark.edu:3000/api/v1/linens_request',
  method: 'POST',
  form: {
    house: '1',
    room: '2',
    guests: '3',
    towels: '4',
    washcloths: '5',
    bathmats: '6',
    bluebag: '7',
    date: 'monday'
  }
}, function(error, response, body) {
  console.log(body);
});
