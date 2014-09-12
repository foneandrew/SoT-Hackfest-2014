var url = "https://api.trademe.co.nz/v1/Search/Jobs.json";
var accessor = {
  token: "5A713505D7B11F994281F115FF6F5761",
  tokenSecret: "AF6FF8D85804539140FA96D02754E01F",
  consumerKey : "5815646823D13FA7222C0797A2749E60",
  consumerSecret: "8A6E9A02BD6316ACA7CB3F2D57C28609"
};

var message = {
  action: url,
  method: "GET",
  parameters: {}
};

OAuth.completeRequest(message, accessor);        
OAuth.SignatureMethod.sign(message, accessor);
url = url + '?' + OAuth.formEncode(message.parameters);

alert(url);



$.getJSON( url, function(jd) {
	alert(jd);
});