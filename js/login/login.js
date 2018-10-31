//var ainput=document.querySelectorAll("input")
//
////console.log(ainput[1].value)
//for(let i=0; i<ainput.length;i++){
//	ainput[i].onfocus=function(){
//		ainput[i].value="";
//	}
//}


//function login(loginName,password){
//	$.ajax({
//		type:"get",
//		url:"data/user.json",
//		success:function(res){
//			for(var i=0;i<res.length;i++){
//				var user = res[i];
//				if(user.LoginName==loginName&&user.Password==password){
//					$.cookie("user", JSON.stringify(user));
//				}
//			}
//		}
//	});
//}
//







class Login{
	constructor(options){
		this.user = options.user;
        this.password = options.password;
        this.login = options.login;
        this.init()

        
	}
	init(){
		var that=this;
		$(this.login).click(function(){
			var name= $(that.user).val();
			var password=$(that.password).val();
			$.ajax({
				type:"get",
				url:"data/user.json",
				success:function(res){
					for(var i=0;i<res.length;i++){
						var user=res[i];
						if(user.LoginName==name&&user.Password==password){
							$.cookie("user", JSON.stringify(user));
							location.href="index.html";
							return;
						}
					}
					alert("账号密码错误")
				}
			});
		})
	}
	
}
new Login({
	user:$("#user"),
	password: $("#password"),
	login:$("#login")
})






