$(document).ready(function(){
$(".apb-side a").click(function(){
  $(".apb-side a").removeClass("current");
  $(this).addClass("current");
  console.log($(this));
//  $(this).siblings().removeClass("current");
});
});
