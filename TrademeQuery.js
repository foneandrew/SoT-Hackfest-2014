var url = "https://api.trademe.co.nz/v1/Search/Jobs.json";
var accessor = {
  token: "5A713505D7B11F994281F115FF6F5761",
  tokenSecret: "AF6FF8D85804539140FA96D02754E01F",
  consumerKey : "5815646823D13FA7222C0797A2749E60",
  consumerSecret: "8A6E9A02BD6316ACA7CB3F2D57C28609"
};

function updateMap(index, color) {
    elements = document.getElementsByClassName("subunit "+index);
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.fill = color;
    }
}

var data = [];
dataCount = 0;

function finishData() {
	var max = Math.max.apply(Math, data);
	for(var i=0;i<16;i++) {
		updateMap(i, "#"+Math.round((data[i]*255)/max).toString(16)+"0000");
	}
}

function getJobData(region) {
	message = {
	  action: url,
	  method: "GET",
	  parameters: {region:region, rows:500}//accountant, wellington
	};
	OAuth.completeRequest(message, accessor);        
	OAuth.SignatureMethod.sign(message, accessor);
	request = url + '?' + OAuth.formEncode(message.parameters);
	$.getJSON( request, function(jd) {
		data[region] = jd.TotalCount;
		dataCount++;
		if(dataCount == 16) {
			finishData();
		}
	});
}

function getJobsData() {
	for(var i=0;i<16;i++) {
		getJobData(i);
	}
}