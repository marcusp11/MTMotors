"use strict"

$(document).ready(function()
{
	$("#signupForm").submit(searchBySignUp);
	
});

function searchBySignUp(e)
{
	
	e.preventDefault();
	//alert('Login');
	//You need to check here to see if the correct type of data was entered.
	
	//***********************************************
	var data =
	{		
		'first':$('#first').val() || '',
		'last':$('#last').val() || '',
		'number':$('#number').val() || '',
		'email':$('#email').val() || '',
		'uname':$('#uname').val() || '',
		'psw':$('#psw').val() || '',
		'photo':''
		
	};
	//clear the input areas
	$('#first').val("");
	$('#last').val("");
	$('#uname').val("");
	$('#psw').val("");
	$('#photo').val("");
	
	// show the email and password assigned to data
	console.log(data);
	// post "/signup" route in server using the data captured fromm the input
	$.post( '/signup', data, function(result){
		if(result)
		{	
			alert(result.msg2);
			window.location.href = "/home";
		}
		else
		{
			alert(result.msg);
		}
	});

}
