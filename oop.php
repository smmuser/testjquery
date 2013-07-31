<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>test.php</title>
  <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
 </head>
<body>
<a href="javascript:void(0);" id="test" > Link </a>
</body>
</html>
<script type="text/javascript">
 (function () {
    var initializing = false,
    fnTest = /xyz/.test(function (){ xyz}) ? /\b_super\b/ : /.*/;
    this.Class = function () {};
    Class.create = function (prop) {
					var _super = this.prototype;
					initializing = true;
					var prototype = new this();
					initializing = false;
					for (var name in prop) {
						prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? 
							(function (name, fn) {
								return function () {
										var tmp = this._super;
										this._super = _super[name];
										var ret = fn.apply(this, arguments);
										this._super = tmp;
										return ret;
								}
							})(name, prop[name]) 				
						: prop[name]
				}
					
		function Class() {
			if (!initializing && this.initialize) this.initialize.apply(this, arguments);
		}
        Class.prototype = prototype;
        Class.constructor = Class;
        Class.create = arguments.callee;
        return Class;
    }
})();

var  _oduseeJS = Class.create({
				 initialize: function(category){
							this.category = category;
							this.name     = 'nady';
							},
	callCategory: function(){
							console.log(this.category);
							}	  
					  
							});

var _propertyJS = _oduseeJS.create({
								 initialize:function(category){
											this._super(category);
										},
							  speakCategory:function(){
											var  main=this;
											$('#test').click(function(ev){
																console.log(ev);
																main.callCategory();
															});		
											
										}		

								});			

var _property = new _propertyJS('property');	
$(function(){
_property.speakCategory();	
})();

//console.log(_property);		


</script>