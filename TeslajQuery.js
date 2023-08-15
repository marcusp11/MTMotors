$(document).ready(function(){
	
	$(".card").click(function(){
        //get the infomtion of "this" card clicked
        var carModel = $(this);
        //get the child node "card-body" from .card
        carModel = carModel.children(".card-body");
        //get the child node "card-title" .card-body
        carModel = carModel.children(".card-title");
        //the innerHTML of ".card-title" is the car Model
        carModel = carModel.html();
        
        localStorage.setItem("model", carModel);
	});
});
