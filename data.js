// module.exports.headache = [
//     "You should visit Dr Shukla!"
// ];
 
// module.exports.cold = [
//     "You should see Dr Shekh!"
// ];

var https = require('https');
module.exports.returnData = "";
console.log("test begin");

var post_data =
{
        "sex": "male",
        "age": 30,
        "evidence": [
          {
            "id": "s_1193",
            "choice_id": "present"
          }
        ]
      };

var post_options = {
    host:  'https://api.infermedica.com/v2/diagnosis',
    // port: '443',
    // path: '/prod/stateresource',
    method: 'POST',
    headers: {
    	 "App-Id": "7a7139ff",
          "App-Key": "f7754baf7ecdc339eca07ac15619e12b",
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(post_data))
    }
};

var post_req = https.request(post_options, function(res) {
    res.setEncoding('utf8');
    
    res.on('data', function (chunk) {
        module.exports.returnData += chunk;
    });
    res.on('end', function () {
        console.log('returnData: ' + module.exports.returnData);

        console.log(JSON.parse(module.exports.returnData).conditions[0].name);

    });

});

post_req.write(JSON.stringify(post_data));
post_req.end();