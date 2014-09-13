var url = "https://api.trademe.co.nz/v1/Search/Jobs.json";
var accessor = {
  token: "5A713505D7B11F994281F115FF6F5761",
  tokenSecret: "AF6FF8D85804539140FA96D02754E01F",
  consumerKey : "5815646823D13FA7222C0797A2749E60",
  consumerSecret: "8A6E9A02BD6316ACA7CB3F2D57C28609"
};



alert(url);

var data;
function getJobData(region) {
	message = {
	  action: url,
	  method: "GET",
	  parameters: {region:region, rows:500}//accountant, wellington
	};

	OAuth.completeRequest(message, accessor);        
	OAuth.SignatureMethod.sign(message, accessor);

	request = url + '?' + OAuth.formEncode(message.parameters);
	alert(message.parameters.region)
	$.getJSON( request, function(jd) {
		alert(region+" "+jd.TotalCount);
		data = jd;
	});
}

getJobData(15);
getJobData(1);
getJobData(2);
getJobData(3);