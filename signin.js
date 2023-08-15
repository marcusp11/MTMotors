"use strict";

$(document).ready(function()
{
	$("#loginForm").submit(searchByLogin);
	
});

function searchByLogin(e)
{
	
	e.preventDefault();
	//alert('Login');
	//You need to check here to see if the correct type of data was entered.
	
	//***********************************************
	var data =
	{
		'uname':$('#uname').val() || '',
		'psw':$('#psw').val() || '',
		'name':""
	};
	//clear the input areas
	$('#uname').val("");
	$('#psw').val("");
	// show the email and password assigned to data
	console.log(data);
	// post "/signin" route in server using the data captured fromm the input
	$.post( '/signin', data, function(result){
		if(result.msg == "yes")
		{	
			var name = result.name;
			alert(name);
			window.location.href = "/home";
		}
		else
		{
			alert(result.msg);
		}
	});

	
}

