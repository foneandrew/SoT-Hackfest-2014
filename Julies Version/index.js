//Julie's Stuff

var options = $('.options');
var search = $('#search');
var info = $('.info');
var tab = $('.tab');

var moreInfo1 = $('#moreInfo1');
var moreInfo2 = $('#moreInfo2');
var moreInfo3 = $('#moreInfo3');

var moreInfoPage1 = $('#moreInfoPage1');
var moreInfoPage2 = $('#moreInfoPage2');
var moreInfoPage3 = $('#moreInfoPage3');

    search.on('click',function(e){
        options.addClass('clicked');
        tab.addClass('clicked');
 		setTimeout(function(){
        info.addClass('clicked');
              },2000);
    });

    tab.on('click', function(e){
    	options.removeClass('clicked');
    	info.removeClass('clicked');
    	tab.removeClass('clicked');
    	moreInfo1.removeClass('clicked');
    	moreInfo2.removeClass('clicked');
    	moreInfo3.removeClass('clicked');
    });

    moreInfo1.on('click', function(e){
    	info.removeClass('clicked');
    	moreInfoPage1.addClass('clicked');
    });

    moreInfo2.on('click', function(e){
    	info.removeClass('clicked');
    	moreInfoPage2.addClass('clicked');
    });

    moreInfo3.on('click', function(e){
    	info.removeClass('clicked');
    	moreInfoPage3.addClass('clicked');
    });



//Andrew's stuff
//vars to hold the page controls
var jobCat = document.getElementById("JobCat");
var jobSubCat = document.getElementById("JobSubCat");
var keywords = document.getElementById("Keywords");
var priceLow = document.getElementById("PriceLow");
var priceHigh = document.getElementById("PriceHigh");

//vars to hold the entered values
var jobCatValue = "";
var jobSubCatValue = "";
var keywordsValue = "";
var jobTypeValue = "fulltime";
var rentTypeValue = "rent";
var priceLowValue = 0;
//-1 means 'any'
var priceHighValue = -1;

//set the job tytpe to whichever radio button was just pressed
function setJobType(type){
	jobTypeValue = type;
}

//set the rent type to whichever radio button was just pressed
function setRentType(type){
	rentTypeValue = type;
}

//get values from the controls and store them in the global variables
function updateValues(){
	//update values
	jobCatValue = $("#JobCat option:selected").val();
	jobSubCatValue = $("#JobSubCat option:selected").val();
	keywordsValue = keywords.value;
	priceLowValue = $("#PriceLow option:selected").val();
	priceHighValue = $("#PriceHigh option:selected").val();

	//adjust prices (low to high) if needed
	if (priceHighValue > 0 && priceHighValue < priceLowValue){
		//swap radio button values
		temp = priceHigh.selectedIndex;
		priceHigh.selectedIndex = priceLow.selectedIndex;
		priceLow.selectedIndex = temp;
		//get values again
		priceLowValue = $("#PriceLow option:selected").val();
		priceHighValue = $("#PriceHigh option:selected").val();
	}
  window.category = jobCatValue;
  console.log(jobSubCatValue);
  if(jobSubCatValue != ""){
    window.category = jobSubCatValue;
  }
  refreshAllData();
}

//when page is read, populate the dropdowns
$(document).ready(function() {

	//populate dropdown boxes
	generateJobCats(true);
});

//fills a select (dropdown box) from given select options
function generateSelect(selector, select_options) {
	select_options.forEach(function(hash) {
		$(selector).append("<option value='"+hash['Code']+"'>"+hash['Name']+"</option>");
	});
	//update text in dropdown box
	var temp = $(selector).find("option").first();
	$(temp).attr('selected', 'selected');
	var $prevSpan = $(temp).closest('select').prev("span");
	$prevSpan.html($(temp).text());
}

//populate dropdowns from json file
function generateJobCats(generateMainCat){
	$.getJSON("http://api.trademe.co.nz/v1/Categories/Jobs.json", function(json){
		if (generateMainCat){
			generateSelect("#JobCat", json);
		}
		generateJobSubCat(json);
	});
}

function generateJobSubCat(json){
	var select_options = _.find(json, function(hash){
		var jobCatCode = $("#JobCat option:selected").val();
		return jobCatCode == hash['Code'];
	});
	$("#JobSubCat").empty();
	generateSelect("#JobSubCat", select_options['SubCategories']);
}
