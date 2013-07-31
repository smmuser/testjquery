<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script src="js/jquery.js"></script>
<script src="js/jquery-ui.js"></script>
<script src="js/klass.js"> </script>
 <link href="js/reset.css" rel="stylesheet" type="text/css"/>
<title>SearchField</title>
<style type="text/css">
#container{padding:10px;}
#inp{ width: 200px; margin-bottom:5px;}
#list-container { width:192px; padding:5px; border:1px solid #ccc; height:auto;}
.inactive{ background-color: #ffffff;}
.active{ background-color: #cccccc;}
</style>
</head>
<body>
<div id="container">
	<form name="form1" action="oop.php" action="get" id="frm">
		<input type="text" name="inp" id="inp" autocomplete="off"/> &nbsp; <input type="submit"  value="Submit" />
		<div id="list-container" style="display:none;"> 
		</div>
	</form>	
</div>
</form>
</div>
</body>
</html>
<script type="text/javascript">
var  autosuggest = Class.create({
		initialize: function(json){
			this.auto =json;
			this.form =this.auto['form'];
			this.input =this.auto['input'];
			this.cont =this.auto['cont'];
			this.nChars =this.auto['nChars'] || 1;
			this.nResults =this.auto['nResults'] || 5;
			this.delay =null;
			this.selected =null;
			this.lists =null; 
			this.visible =false;
			this.KEY_ENTER =13;
			this.KEY_DOWN =40;
			this.KEY_UP =38;
			this.attachEvents();
		},
		attachEvents: function(){
			this.inputEvents();
		},
		showHideCont: function(){
			var main =this;
			if(main.visible)
				main.cont.show('fade',500,function(){
					main.resultEvents();
				});
			else main.cont.hide('fade',500);
		},
		inputEvents: function(){
			var main =this;
			main.input.keyup(function(ev){
				main.inputListener(ev);
			});
		},
		inputListener: function(ev){
			var main =this;
			var ev = ev || window.event; 
			switch(ev.keyCode){
				case main.KEY_ENTER:
					if(!main.visible) return;
					break;
				case main.KEY_DOWN: 
					if(!main.visible) return;
					if(main.cont.find('li').length!=0){
						if(main.cont.find('li').length> 1 ){
							
						}
						else{
							this.selected =this.resultItem[0];
							this.activeItem(this.selected);
						}
					}	
					break;
				case main.KEY_UP: 
					if(!main.visible) return;
					break;		
				default: main.fetchData();	
			}
		},
		fetchData: function(){
			var main =this;
			var ajax =null;
			clearTimeout(main.delay);
			main.delay = setTimeout(function(){ 
				if(main.nChars >main.input.val().length) {
					if(main.input.val().length<1){
						main.visible=false;
						main.showHideCont();
					}	
					return;
				}
				if(ajax) abort();
				ajax = $.ajax({
					type: "GET",
					url:"sample.php",
					data: {k:main.input.val(), r: main.nResults},
					success: function(data){
						if(data){
							main.cont.html(data);
							main.visible=true;
						}else main.visible=false;
						main.showHideCont();
					},
					error: function(){
						alert('Something went wrong!');
					}
				});
			},300);		
		},
		resultEvents: function(){
			var main =this;
			if(!this.visible) return;
			if(main.cont.children().length > 0 ){
				main.lists = main.cont.find('li');
				$.each(main.list,function(){
					$(this).click(function(){
					}).mouseover(function(){
					}).mouseout(function(){
					});
				})
			}
		}
		
});

$(function(){	
	var auto = new autosuggest({
					form: $('#frm'),
					input: $('#inp'),
					cont: $('#list-container'),
					nChars: 2,
					nResults: 5
				});	

});	
		
</script>
