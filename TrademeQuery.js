var jobURL = "https://api.trademe.co.nz/v1/Search/Jobs.json";
var buyURL = "https://api.trademe.co.nz/v1/Search/Property/Residential.json";
var rentURL = "https://api.trademe.co.nz/v1/Search/Property/Rental.json";

//OAuth 
var accessor = {
  token: "5A713505D7B11F994281F115FF6F5761",
  tokenSecret: "AF6FF8D85804539140FA96D02754E01F",
  consumerKey : "5815646823D13FA7222C0797A2749E60",
  consumerSecret: "8A6E9A02BD6316ACA7CB3F2D57C28609"
};

//function to colour a region
function updateMap(index, color) {
    elements = document.getElementsByClassName("subunit "+index);
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.fill = color;
    }
}

var finalData = [];

var rentData = [];
var buyData = [];
var jobData = [];

var category = "5001";

var totalCount = 16;
var dataCount = 0;

//called when all data is loaded, updates the map colouring
function finishData() {
	alert("Data finished");
	for(var i=0;i<15;i++) {
		finalData[i] = jobData[i];
	}
	var max = Math.max.apply(Math, finalData);
	for(var i=0;i<16;i++) {
		updateMap(i, "#"+Math.round((finalData[i]*255)/max).toString(16)+"0000");
	}
}

//gets the job data for a region
function getJobData(region) {
  message = {
    action: jobURL,
    method: "GET",
    parameters: {category:category, region:region, rows:500}//accountant, wellington
  };

  OAuth.completeRequest(message, accessor);
  OAuth.SignatureMethod.sign(message, accessor);

  request = jobURL + '?' + OAuth.formEncode(message.parameters);
  $.getJSON( request, function(jd) {
    jobData[region] = jd.TotalCount;
		dataCount++;
		if(dataCount == totalCount) {
			finishData();
		}
  });
}

//get property purchase data for a region
function getBuyData(region) {
  message = {
    action: buyURL,
    method: "GET",
    parameters: {region:region, rows:500}//accountant, wellington
  };

  OAuth.completeRequest(message, accessor);
  OAuth.SignatureMethod.sign(message, accessor);

  request = buyURL + '?' + OAuth.formEncode(message.parameters);
  $.getJSON( request, function(jd) {
    buyData[region] = jd.TotalCount;
		dataCount++;
		if(dataCount == totalCount) {
			finishData();
		}
  });
}

//get rent data for a region
function getRentData(region) {
  message = {
    action: rentURL,
    method: "GET",
    parameters: {region:region, rows:500}//accountant, wellington
  };

  OAuth.completeRequest(message, accessor);
  OAuth.SignatureMethod.sign(message, accessor);

  request = rentURL + '?' + OAuth.formEncode(message.parameters);
  $.getJSON( request, function(jd) {
    rentData[region] = jd.TotalCount;
		dataCount++;
		if(dataCount == totalCount) {
			finishData();
		}
  });
}

//gets all data, and updates the page
function updateAllData() {
	dataCount = 0;
	for (i = 0; i < 16; i++) {
	    getJobData(i);
	    //getBuyData(i);
	    //getRentData(i);
	}
}