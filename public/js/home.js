/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function(){
	taskState([100,50,20,null]);
});

function taskState(stateArray) {
	var threshold = 50;
	var list = $('.list');

	var newClass;
	stateArray.forEach(function(value,i) {
		if(value==null)
			newClass = 'list uncheck';
		else if (value==100)
			newClass = 'list done';
		else if (value >= threshold)
			newClass = 'list halfdone';
		else
			newClass = 'list notdone';

		$(list[i]).attr('class', newClass);
	});
}