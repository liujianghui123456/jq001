
//轮播图海报
//$(".banner").banner({
//	items:$(".banner img"),		//必选,要切换的元素
//	left:$(".banner #left"),		//可选，左按钮
//	right:$(".banner #right"),		//可选，右按钮
//	list:$(".banner .list"),		//可选，下标按钮
//	autoPlay:true,					//可选，是否自动播放
//	time:3000,						//可选，间隔时间
//	moveTime:0,					//可选，运动时间
//})
//
//
//
//$(function(){
//	$.ajax({
//		type:"get",
//		url:"data/goods1.json",
//		async:true,
//		success:function(res){
//			var str="";
//			for(var i=0;i<res.length;i++){
//				str += `
//						<dl>
//							<dt><a href="#"><img src="${res[i].src}" /></a></dt>
//							<dd>
//								<a href="#">${res[i].name}</a>
//								<span><b>￥</b>${res[i].price1}</span><br />
//								<span>参考价：<b>￥</b>${res[i].price2}</span><br />
//							</dd>
//						</dl>`
//			}
//			$("#news-ctz-r").html(str)
//		}
//	});
//})
//
//
//
//
//$(function(){
//	$.ajax({
//		type:"get",
//		url:"data/goods.json",
//		async:true,
//		success:function(res){
//			var str="";
//			for(var i=0;i<res.length;i++){
//				str += `
//						<dl class="like-b-box">
//							<dt><img src="${res[i].src}"/></dt>
//							<dd>
//								<p>${res[i].name}</p>
//								<span><b>￥</b>${res[i].price}</span>
//								<span class="likespan">收藏</span>
//							</dd>
//						</dl>`
//			}
//			$("#like-b").html(str)
//		}
//	});
//})


class Shouye{
	constructor(options){
		this.newsctzr=options.newsctzr;
		this.likeb=options.likeb;
		this.init()
	}
	init(){
		//轮播图海报
		$(".banner").banner({
			items:$(".banner img"),		//必选,要切换的元素
			left:$(".banner #left"),		//可选，左按钮
			right:$(".banner #right"),		//可选，右按钮
			list:$(".banner .list"),		//可选，下标按钮
			autoPlay:true,					//可选，是否自动播放
			time:3000,						//可选，间隔时间
			moveTime:0,					//可选，运动时间
		})
		this.loadnewsctzr();
		this.loadlikeb();
		
	}
	
	
	loadnewsctzr(){
		var that=this;
		$.ajax({
			type:"get",
			url:"data/goods1.json",
			async:true,
			success:function(res){
				var str="";
				for(var i=0;i<res.length;i++){
					str += `
							<dl>
								<dt><a href="#"><img src="${res[i].src}" /></a></dt>
								<dd>
									<a href="#">${res[i].name}</a>
									<span><b>￥</b>${res[i].price1}</span><br />
									<span>参考价：<b>￥</b>${res[i].price2}</span><br />
								</dd>
							</dl>`
				}
				$(that.newsctzr).html(str)
			}
		});
		
	}
	loadlikeb(){
		var that=this;
		$.ajax({
			type:"get",
			url:"data/goods.json",
			async:true,
			success:function(res){
				var str="";
				for(var i=0;i<res.length;i++){
					str += `
							<dl class="like-b-box">
								<dt><img src="${res[i].src}"/></dt>
								<dd>
									<p>${res[i].name}</p>
									<span><b>￥</b>${res[i].price}</span>
									<span class="likespan">收藏</span>
								</dd>
							</dl>`
				}
				$(that.likeb).html(str)
			}
		});
	}
}

new Shouye({
	newsctzr:$("#news-ctz-r"),
	likeb:$("#like-b")
})










//
//	var olike = document.getElementById("like-b");
//	ajaxGet("http://localhost:5000/bailian/data/data.php?type=2",function(res){	
//			var json = JSON.parse(res)
//			display(json)
//		})
//		
//	function display(json){
//		var str = ""
//		for(var i=0;i<json.length;i++){
//				str += `
//						<dl class="like-b-box">
//							<dt><img src="${json[i].src}"/></dt>
//							<dd>
//								<p>${json[i].name}</p>
//								<span><b>￥</b>${json[i].price}</span>
//								<span class="likespan">收藏</span>
//							</dd>
//						</dl>`
//		}
//		olike.innerHTML= str;
//	}