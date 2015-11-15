/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function taskState(stateArray) {
    var threshold = 50;
    var list = $('.list');
    var first = $('.list')[0];
//    list.each(function(i){
//       console.log(i + $(this).attr('class')); 
//    });
	console.log($(first).attr('class'));
    stateArray.forEach(function(value,i) {
//        if (value==100)
//            $(list)[i].;
        console.log(value + ' ' + i);
    });
}