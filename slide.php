
<?php
 $len_img =13;
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>test.php</title>
 <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
 <style>
*{padding: 0;
  margin:0;
 }
 
div.parent{
	margin-top: 10px;
	width:600px;
	position:relative;
	margin-left:50px;
}
div.inner-parent{
	overflow: hidden;
	width:480px;
	background-color:#F0F0F0;
	top:0;
	position:absolute;
	height: 170px;
	padding-top:20px;
	padding-bottom:20px;
}
ul.inner-container{
	position:relative;
	width:9999px;
	list-style-type: none;	
	position:absolute;
}
ul.inner-container li {
	float: left;
	display: block;
}
div.img-container{
	width: 160px;
	height:160px;
	display:block;
	position: relative;
}
.img{
	border:0;
}
 </style>
 </head>
 <body>
 <div class="parent">
	<div class="inner-parent">
		<ul class="inner-container">
		 <?php
			for($i=1;$i< $len_img ; $i++){
				echo  '<li><div class="img-container"><img src="images/image'.$i.'.jpg" class="img" alt="test"></div></li>';
			}
		 ?>
		</ul>
	</div>
 </div>
 </body>
 </html>
 <script type="text/javascript">
 var img_container 	= $('.inner-container');
 var img_parent    	= $('.inner-parent');
 var img_length 	= img_container.children('li').length;
 var img_per_slide	= 3;
 var no_of_slides	= Math.ceil(parseInt(img_length/img_per_slide));
 var slide_interval = null;
 var slide_timeout  = null;
 var slide_limit    = parseInt(no_of_slides * img_parent.width());
 var counter 		= 1; 
 var temp_elems		= null;
 
 function init_slide(){
	for(var i=1; i < no_of_slides ;i++){
		img_container.delay(2000).animate({left: '-'+parseInt((img_parent.width())* i)+'px' },'slow',function(){
																									if(counter == parseInt(no_of_slides-1)){
																										temp_elems	= img_container.children('li').map(function(c,e){
																																						if(c<parseInt(img_length-img_per_slide)){
																																							var tm = e;
																																							$(e).remove();
																																							img_container.css({left:0});
																																							return tm;
																																						}
																																					});
																										$(temp_elems).appendTo(img_container);	
																										counter=0;
																										init_slide();
																									}	

																									counter++;
																								});		
		
	}	
	
 }
 

 $(function(){
	init_slide();
});
</script>
 
 