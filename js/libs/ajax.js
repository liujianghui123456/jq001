function ajaxPost(url,callback,data){
	url = url + "?t="+new Date().getTime();
	if(data){
		var str = "";
		for(var i in data){
			str = str + i + "=" + data[i] + "&";
		}
		data = str.slice(0,str.length-1);
	}else{
		data = null;
	}
	var ajax = new XMLHttpRequest();
	ajax.open("POST",url,true)
	ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax.status == 200){
			callback(ajax.responseText)
		}
	}
	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	ajax.send(data);
}


function ajaxGet(url,callback,data){
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
			callback(ajax.responseText)
		}
	}
	ajax.send(null);
}

