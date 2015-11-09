function _ChoosePillAndDate(year,pill,patient) {
			var o = this.options;
			if (o.viewType !== "day") {
				o.viewType = "day";
				this._onViewTypeChanged();
			}
			o.selectedDates = [o.selectedDate];
			this._onSelectedDatesChanged();

                       //set content of right part here
			var i=0;
		        var element_add="<div><span class=\"right_title\">Remainder need to be define</span>";
			for(i=0;i<10;i++){       //i equal to the number of remainders, can fetch from database
		            element_add += "<div> This is remainder need to define what to display" + i + "</div>" ;
		         }
		        element_add += "</div>"
		        $(".right_part").html(element_add);
                        //ajax
                        
                        var receive = 1;
                        var data;
                        var pill=[];

                        var j=0;
                        var i=0;
    $.ajax({
           url:'http://localhost:28746/Pill_response.php', //http://nusctesting2014.comuf.com/personalResponse.php',
           type:'post',
           //data: { curdate: ajax_data },
           async:false,
           success:function(result){
               alert(result.toString());
               receive=result;
               //data = result;
               //alert(data);
               //convert into array
           while(i<result.length){
              pill[j]="";
               if (result[i]="\""){
                  i=i+1;
                  while(result[i]!="\""){
                  pill[j]=pill[j]+result[i];
                  i++;
                  } 

               j++;
               i++;

               }
            }
            alert(pill[0]);
           },
           error:function(msg){
               alert('Error:'+msg);
           }
       });
/**************end of ajax*****************************/
/**************add row*********************************/
var p=0;
var times=0;
var ruler_pill_name;
var cur = $(".wijmo-wijev-daycolumn");
var column_class=cur[0].className;
var column_date;
var record="<div class=\"wijmo-wijev-timeinterval weekly-pill-record ui-widget-content wijmo-wijev-pill\" style=\"height:50px\">";
                
                $("#pill-name-ruler").html("");
                for(p=0;p<j;p++){
                //ruler_test=document.getElementById(pill_Name[p]);
                //if(!ruler_test){
                ruler_pill_name="<div class=\"wijmo-wijev-timerulerinterval ui-widget-content wijmo-wijev-pill-0 wijmo-wijev-timerulerinterval-pillName\" style=\"height:50px\" id=\"";
                ruler_pill_name+=pill[p]+"\">";
                ruler_pill_name+=pill[p]+"</div>";
                $("#pill-name-ruler").append(ruler_pill_name);
        
/****************add ruler*****************************/

   //convert into date type
    column_date=column_class.substring(39,43);
    column_date += "-";
    if (column_class.substring(44, 45) == "1") {
            if (column_class.substring(45, 46) == "_") {
                column_date += "02-";
                column_date += column_class.substring(46, 48);
            }
            else {
                switch (column_class.substring(44, 46)) {
                    case "10":
                        column_date += "11";
                        break;
                    case "11":
                        column_date += "12";
                        break;

                    default:
                        break;
                }
                column_date += "-";
                column_date += column_class.substring(47, 49);
            }
        }
    else {
            switch (column_class.substring(44, 45)) {
                case "0":
                    column_date += "01";
                    break;
                case "2":
                    column_date += "03";
                    break;
                case "3":
                    column_date += "04";
                    break;
                case "4":
                    column_date += "05";
                    break;
                case "5":
                    column_date += "06";
                    break;
                case "6":
                    column_date += "07";
                    break;
                case "7":
                    column_date += "08";
                    break;
                case "8":
                    column_date += "09";
                    break;
                case "9":
                    column_date += "10";
                    break;
                default:
                    break;
            }
            column_date += "-";
            column_date += column_class.substring(46, 48);
        }
    alert(column_date);
  
    $.ajax({
           url:'http://localhost:28746/personalResponse.php',
           type:'post',
           data: { curdate: column_date,pillname:pill[p] },
           async:false,
           success:function(result){
               alert(result);
               receive=result;
               times = result;
               alert("taking time:"+times);
               },
           error:function(msg){
               alert('Error:'+msg);
           }
       });

    record = record + times +"</div>";
    $(".wijmo-wijev-daycolumn").append(record);          
	 }
}
