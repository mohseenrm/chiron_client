var docContainer = document.getElementById("doctor_info");
var button = document.getElementById("button");

var key = document.getElementById("key");
var disease = document.getElementById("disease");

var apiURL = "https://api.betterdoctor.com/2016-03-01";
var user_key = "user_key=ebd74586afe46d9701cfb232d6cedd53";
var conditionsURL = apiURL+"/conditions?"+user_key;
var flag = true;

/** GET OVERALL CONDITIONS*/
button.addEventListener("click", function () {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET',conditionsURL);

    ourRequest.onload = function () {
        var ourData = JSON.parse(ourRequest.responseText);
        renderHTML(ourData);

    };
    ourRequest.send();
});

/** SEARCH DOCTORS BASED ON CONDITIONS*/
function searchDoctor(condition){

    //https://api.betterdoctor.com/2016-03-01/doctors?
    // query=Gout%20Symptoms&sort=rating-desc&skip=0&user_key=ebd74586afe46d9701cfb232d6cedd53

    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET',apiURL+"/doctors?query="+condition+"&sort=rating-desc&"+user_key);

    ourRequest.onload = function () {
        var ourData = JSON.parse(ourRequest.responseText);
        docContainer.insertAdjacentHTML('beforeend', renderDocHTML(ourData));

    };
    ourRequest.send();
}

function renderDocHTML(myData){
    var tempHTML = "<ul>";
    var doctors = myData.data;
    for (i=0; i<doctors.length; i++){
        tempHTML += "<li>"+doctors[i].profile.slug + "</li>";
    }
    tempHTML += "</ul>";
    //console.log(tempHTML);
    return tempHTML;
}
function renderHTML(mydata) {



    // for(i=0; i<conditions.length; i++){
    //     htmlString += "<li>"+conditions[i].name + "</li>";
    // }
    //console.log("hello");

    setInterval(function(){
        if(flag) {
            var conditions = mydata.data;
            var htmlString = "<ul>" + conditions.length;
            htmlString += "<li>" + conditions[4].name + "</li>";
            searchDoctor(conditions[4].name);
            htmlString += "</ul>";

            docContainer.insertAdjacentHTML('beforeend', htmlString);
            flag = false;
            console.log(htmlString);
        }
    }, 1000);


}