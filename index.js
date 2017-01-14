var Alexa = require('alexa-sdk');
var Data = require("./data");

//Mohd
//  var AWS = require("aws-sdk")
// AWS.config.update({
//     accessKeyId: "AKIAJDAF6FJ6V22KD6VA",
//     secretAccessKey: "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",
//   region: "us-east-1",
//   // endpoint: "http://localhost:8000"
// });

// var docClient = new AWS.DynamoDB.DocumentClient()

// var table = "Partition";

// var id = 2;

// var params = {
//     TableName: table,
//     Key:{
//         "id": id
//     }
// };

// docClient.get(params, function(err, data) {
//     if (err) {
//         console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
//     }
// });
// var AWS = require("aws-sdk");

// AWS.config.update({
//     accessKeyId: "AKIAJDAF6FJ6V22KD6VA",
//     secretAccessKey: "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",
//   region: "us-west-2",
//   endpoint: "http://localhost:8000"
// });

// var docClient = new AWS.DynamoDB.DocumentClient();

// var table = "Movies";

// var year = 2015;
// var title = "The Big New Movie";

// var params = {
//     TableName:table,
//     Item:{
//         "year": year,
//         "title": title,
//         "info":{
//             "plot": "Nothing happens at all.",
//             "rating": 0
//         }
//     }
// };

// console.log("Adding a new item...");
// docClient.put(params, function(err, data) {
//     if (err) {
//         console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Added item:", JSON.stringify(data, null, 2));
//     }
// });
 //Mohd
const skillName = "Chiron";
 
var handlers = {
 
    "DiseaseIntent": function () {
        
        var speechOutput = "";
        if(this.event.request.intent.slots.Disease.value && this.event.request.intent.slots.Disease.value.toLowerCase() == "headache") {
            speechOutput = Data.returnData;
        } else if(this.event.request.intent.slots.Disease.value && this.event.request.intent.slots.Disease.value.toLowerCase() == "cold") {
            speechOutput = Data.returnData;
        } else {
            speechOutput = "I don't have anything interesting to share regarding what you've asked."
        }
        this.emit(':tellWithCard', speechOutput, skillName, speechOutput);
    },
 
    "AboutIntent": function () {
        var speechOutput = "You should some sleep and take some painkillers";
        this.emit(':tellWithCard', speechOutput, skillName, speechOutput);
    },
 
    "AMAZON.HelpIntent": function () {
        var speechOutput = "";
        speechOutput += "Here are some things you can say: ";
        speechOutput += "Tell me something interesting about Java. ";
        speechOutput += "Tell me about the skill developer. ";
        speechOutput += "You can also say stop if you're done. ";
        speechOutput += "So how can I help?";
        this.emit(':ask', speechOutput, speechOutput);
    },
 
    "AMAZON.StopIntent": function () {
        var speechOutput = "Goodbye";
        this.emit(':tell', speechOutput);
    },
 
    "AMAZON.CancelIntent": function () {
        var speechOutput = "Goodbye";
        this.emit(':tell', speechOutput);
    },
 
    "LaunchRequest": function () {
        var speechText = "";
        speechText += "Welcome to " + skillName + ".  ";
        speechText += "You can ask a question like, I'm having a headache what should I do?.  ";
        var repromptText = "For instructions on what you can say, please say help me.";
        this.emit(':ask', speechText, repromptText);
    }
 
};
 
exports.handler = function (event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = "amzn1.ask.skill.02c289f6-9161-4b6d-ac5d-401e0a3c278e";
    alexa.registerHandlers(handlers);
    alexa.execute();
};