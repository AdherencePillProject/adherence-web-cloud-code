	$(document).ready(function(){
		$(".topli").click(function(){
			$(".subli").slideToggle("slow");
		});
	});// navbar user dropdown

$('ul.nav li.dropdown').hover(function() {
	$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
}, function() {
  	$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
});// dashboard dropdown menu animation

function toggleActive(element){
	//should only be one
	var actives = document.getElementsByClassName("list-group-item active");
	for (var i = 0; i < actives.length; i++){
		actives[i].className = "list-group-item";
	}
	element.className = "list-group-item active";

	var drugs = document.getElementsByClassName("drug");
	for (var d = 0; d < drugs.length; d++){
		if (element.textContent.length > 20) {
			drugs[d].textContent = document.getElementById("firstPatient").textContent + "'s Drug " + (d+1);
		}
		else {
			drugs[d].textContent = element.textContent + "'s Drug " + (d+1);
		}

	}
}