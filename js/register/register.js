var ainput=document.querySelectorAll("input")

//console.log(ainput[1].value)
for(let i=0; i<ainput.length;i++){
	ainput[i].onfocus=function(){
		ainput[i].value="";
	}
}
