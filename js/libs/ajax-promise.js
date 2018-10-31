function ajaxPost(url,data){
	var p = new Promise(function(success){
		
		url = url +"?t="+new Date().getTime();
		if(data){
			var str="";
			for(var i in data){
				str = str + i +"="+ data[i]+"&";
			}
			data = str.slice(0,str.length-1);
		}else{
			data = null;
		}
		
		var ajax = new XMLHttpRequest();
		ajax.open("POST",url,true)
		ajax.onreadystatechange = function(){
			if(ajax.readyState ==4 & ajax.status == 200){
				success(ajax.responseText)
			}
		}
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(data);
	})
	
	return p;
}

//ajaxPost(url,{name:"admin"}).then(function(res){
//	console.log(res)
//})


function ajaxGet(url,data){
	var p = new Promise(function(success){
		url = url + "?t="+new Date().getTime();
		if(data){
			var str = ""
			for(var i in data){
				str = str + i+"="+data[i] + "&";
			}
			str = str.slice(0,str.length-1);
			
			url = url + "&" + str;
		}
		var ajax = new XMLHttpRequest();
		ajax.open("GET",url,true)
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				success(ajax.responseText)
			}
		}
		ajax.send(null);
	})
	return p;
}
//ajaxGet(url,{name:"admin"}).then(function(res){
//	console.log(res)
//})



function jsonp(url,data){
	var p = new Promise(function(succuss){
		
		if(data){
			var str = "";
			for(var i in data){
				str = str + i + "=" + data[i] + "&";
			}
			url = url + "?" + str;
		}else{
			console.error("你必须传一个fnName的参数");
			return;
		}
		
		window[data[data.jsonpName]] = function(res){
			succuss(res);
		}
		
//		window[data[data.liyang]]
//		window[data[cb]]
//		window[abc]
//		window.abc
		
		var script = document.createElement("script");
		script.src = url;
		document.body.appendChild(script);
		
	})
	return p;
}
//jsonp(url,{name:"admin"}).then(function(res){
//	console.log(res)
//})
