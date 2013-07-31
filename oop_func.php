<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
 <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
</head>
<body>
</body>
</html>
<script type="text/javascript" >
	$(function(){
		var delay =null;
		$(window).on('resize',function(event){
		    var ev = event || window.event;
			var wd = $(this);
			if(delay!==false) clearTimeout(delay);
			delay=setTimeout(function(){
				if(wd.width()<500) {
					$(window).off('resize',function(){
						return;
					});
				}	
			 },300)		
		});
	});	
</script>
