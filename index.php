<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>test.php</title>
  <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
    <style type="text/css">
	body{
		padding:0;
		margin:0;
	}
	ul ,li{
		list-style:none;
		padding:0 0 5px; 0;
		margin:0;
	}
    #slider { 
		margin: 10px; 
	}
	.acc{
	  width:200px;
	  border:1px #ccc solid;
	}		
	.h{
		height : 20px;
		padding:5px;
		background-color: #ccc;
		cursor: pointer;
		   }
	.s{
		padding:5px;
	}
	.fc{
		border:1px solid #ccc;
		width:200px;
		padding:10px;
	}
	.window{
		 position:absolute;
		 z-index:9000;
		 background-color:#000;
		 opacity:0.5;
	}
	.box {
		  position:absolute;
		  z-index:9999;
		  padding:20px;
		  background-color: #FFF;
		  border: 1px solid #ccc;
	}
	
	#sliding_door{
		overflow:hidden;
	}
	
	#sliding_door:hover{
		overflow:auto;
	}
  </style>
 
</head>
<body>
<div class="window" style=" display:none;" id="mask"> </div>
<div  class="box" style=" display:none;" id="baks"> <a href="javascript:void(0);" id="close"/> close</a> </div>
<a href="javascript:void(0);" id="c_box"/>Pop up Box </a><br>
<a href="javascript:void(0);" id="hide_box"/>hide box </a>

<div style="margin:10px;">
	<div> <span id="v1" >0 </span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span id="v2" >1000 </span></div> 
	<div id="slider" style="width:200px;"></div>
	<br><br>
	<div id="accordion" class="acc">
		<div id="container1">
			<div id="header1" class="h"> header 1</div>
			<div id="subcontainer1" class="s">
				<p>
				Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer
				ut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sit
				amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut
				odio. Curabitur malesuada. Vestibulum a velit eu ante scelerisque vulputate.
				</p>
			</div>
		</div>
		<div id="container2">
			<div id="header2"  class="h"> header 2</div>
			<div id="subcontainer2" class="s">
				<p>
				Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer
				ut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sit
				amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut
				odio. Curabitur malesuada. Vestibulum a velit eu ante scelerisque vulputate.
				</p>	
			</div>
		</div>
	</div>
	<br><br>
	<div class="fc">
		<form name="myform" id="frm" autocomplete="off">
		
			<ul>
				<li><div id="errormsg"> &nbsp; </div></li>
				<li> <label>Username: <input type="" name="username" mandatory="1"/> </label></li>
				<li><label> Email Address: <input type="" name="email" mandatory="2"/> </label></li>
				<li><label>Gender: <select name="gender" /><option value="1"> Male</option> <option value="2"> Female</option> </select></label></li>
				<li><label><input type="submit" value="Submit" /></label></li>
			</ul>
		</form>
	</div>
	
	<div id="result">
	</div>
</div>
<ul id="sliding_door" style="position:absolute; top:80px; right:0; width: 380px; height: 120px;  background-color: #ccc; border: 1px solid; text-align:justify;" > 
	<li>
		Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer
		ut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sit
		amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut
		odio. Curabitur malesuada. Vestibulum a velit eu ante scelerisque vulputate.
		Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer
		ut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sit
		amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut
		odio. Curabitur malesuada. Vestibulum a velit eu ante scelerisque vulputate.
	</li>
</ul>
</body>
</html>

 <script type="text/javascript">
 var email_format  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,5}))$/ ; //"
 var submission =false;
 var message;
 var ajax =null;
 var popElem =null;
 var moveTimeout =null;
 $(function() {
    $("#slider").slider({
		change: function(event, ui) { 
		},						 
		slide:function(event, ui) { 
				$('#v1').html(ui.values[0]);
				$('#v2').html(ui.values[1]);
			 },	 
		range: true,
		min: 0,
		max: 1000,
		values: [ 0, 1000, ]
	});
						
	$('.h').click(function(){
		if($(this).next('div.s').is(':visible') )
			$(this).next('div.s').slideUp(300);
		else	
			$(this).next('div.s').slideDown(150);
	});	

	var frm_arr = $('#frm').serializeArray();
	
	$.each(frm_arr,function(c,i){
		console.log(i);
		var input =$('input '+i['name']);
	
	});
											
	submitForm($('#frm'),'ajax'); 
	var _json = "{'name': 'Eugene' , 'age': '22'}".replace(/\'/g,'"'); 
		 
	// console.log($.parseJSON(_json));
	 
	// console.log($.param($.parseJSON(_json)));
	 
	$('#c_box').click(function(){
		showModal({ width: '400px', height: '300px'});
	});
	$('#close, #mask').click(function(){
		$('#baks, #mask').hide();
	});			

	$(window).scroll(function(){ movableWindow(500); });	

	var _odusee= {dog: function(){console.log('dog');}};
	var _jobs  = { cat: function(){ console.log('cat');} };
	
	var fhide = 0;
	$('#hide_box').click(function(){
		if($('#sliding_door').is(':visible'))
			$('#sliding_door').hide('slide',{direction: 'right'},500);
		else
			$('#sliding_door').show('slide',{direction: 'right'},500);
	});
		
	$.extend(_jobs, _odusee);
	console.log(_jobs );
});
	function  submitForm(form,submit_type,_json_func){
		form.submit(function(){
			validateForm($(this));
			if(submit_type!='ajax'){
				return  (submission)?  true   :  false; 
			}
			else{
				if(submission){
					var ajax = $.ajax({
						type: "POST",
						url: "ajax.php",
						data:form.serialize()
					});
					ajax.done(function(data){
						$('#errormsg').html(data).css({ opacity: 0 }).fadeTo('normal',1);
					});	
				}
				return false;				
			}
		});				
	
	}
	
	function validateForm(form){
		var inputs_arr =[];
		form.find(':input').each(function(){
			if($(this).attr('mandatory')){
				switch($(this).attr('mandatory')){
					case '1': if($.trim($(this).val())==''){
								message ='Please enter your username';
								inputs_arr.push($(this));
							}
							break;
					case '2': if(!$.trim($(this).val()).match(email_format)){
								message ='Please enter your email addresss';
								inputs_arr.push($(this));		
							}
							break;
				}	
			}
		});	
										
		if(inputs_arr.length > 0){
			$('#errormsg').text(message).css({ opacity: 0 }).fadeTo('normal',1);
			submission =  false;
		}
		else{
			submission =  true;
		}
							
	}	

	function showModal(json){
		//Get the screen height and width
		var maskHeight = $(document).height();
		var maskWidth  = $(window).width();
		var winH 	   = $(window).height();
	
		$('#baks').css(json);
		
		//Set height and width to mask to fill up the whole screen
		$('#mask').css({width:maskWidth, height:maskHeight});
		
		//transition effect 
		$('#mask').css({opacity: 0.5}).show();				
		///$('#mask').show();
	   
		//Set the popup window to center
		//$('#baks').css('top',  winH/2-$('#baks').height() /2);
		$('#baks').css({top: '80', left: maskWidth/2-$('#baks').width()/2 });

		//transition effect
		$('#baks').show(); 
		popElem =$('#baks');
		movableWindow(0);
	
	}
	
	function movableWindow(tmr){
		var tmr = parseInt(tmr);
		if(popElem){
			if((popElem.outerHeight() <= $(window).height() && popElem.is(':visible')) || tmr == 0 ){	
				var offset_pos = $(window).scrollTop() + 20;
				if(tmr == 0) popElem.css({ top: (parseInt(offset_pos) - popElem.height()) + 'px' }); //if( tmr == 0 ) popElem.css({ top: offset_pos + 'px' }); 
				clearTimeout(moveTimeout);
				moveTimeout = setTimeout(function(){
					popElem.animate({ top: parseInt(offset_pos)+'px' },150);
				}, tmr);
			}
	   }
	}
  </script>