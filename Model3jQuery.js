"use strict"
var userArray = [];
//When pages loads this is what happenes immediality. Get model of car
$(document).ready(function () {
	var model = (localStorage.getItem("model"));
	showReviews(model);

	$("#reviewBtn").click(function () {
		var container = $(".comment-container");
		container.toggle()
		if($('comment-container').css('display') == "none"){
			container.empty();
			showReviews(model);
		}
		else{
			console.log("reviews are now hidden")
		}
	});
	$("#postReview").click(addReview);
});
//Function to get reviews from

function showReviews(model) {
	var data = { 'model': model };
	console.log(data);

	$.post('/reviews', data, function (result) {

		if (result) {
			for (var i = 0; i < result.length; i++) //runs down array of comments
			{
				//store the results in a variable
				var commentInfo = result[i];
				console.log(commentInfo)

				//cretae a div that holds the comments info
				var review = $("<div></div>");

			//start with the username
				var userUsername = commentInfo.uName;
				//add class of carousel item to the div so its added to slide show
				review.addClass("item");
				//create a p tag and store the username in it for the div
				var name = $("<p></p>");
				name.addClass("name")
				name.append(userUsername);


				//get the subject and body of the review
				var subject = commentInfo.comment.subject,
				 body = commentInfo.comment.body;
				//create a div for the actual message, store the subject + body
				var message = $("<div></div>");
				message.append(subject, body);
				message.addClass("message");

				//create a row that will hold the review information
				var rowDiv = $('<div></div>');
				rowDiv.addClass("row");
				rowDiv.addClass("comments");

				var col1Div = $('<div></div>');
				col1Div.addClass("col-md-8");
				col1Div.html ('<b>'+userUsername+ '</b>' + ':' + subject+'<br>'+ body);
				rowDiv.append(col1Div);

				var commentArea = $('.comment-info');
				commentArea.prepend(rowDiv);
			}
		}
	});
}


function addReview(e)
{

	e.preventDefault();
	//alert('Login');

	var data =
	{
		'model': localStorage.getItem('model'),
		'subject':$('#subject').val() ,
		'body':$('#body').val() ,


	};
	//clear the input areas
	$('#subject').val("");
	$('#body').val("");

	// show the subject and body assigned to data
	console.log(data);

	// post "/signup" route in server using the data captured fromm the input
	$.post( '/addReview', data, function(result){
		if(result)
		{

			window.location.href = "/tesla/model3";
		}
		else
		{
			alert("an error has occured");
		}
	});

}
