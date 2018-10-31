$(function(){
	class Goods{
		constructor(){
			this.id = location.search.slice(1,location.search.length).split("=")[1];
		}
		init(options){
			this.title = options.title;
			this.price = options.price;
			this.colorList = options.colorList;
			this.sizeList = options.sizeList;
			this.add = options.add;
			this.remove = options.remove;
			this.num = options.num;
			this.btns = options.btns;
			this.img = options.img;
			this.bigbox = options.bigbox;
			this.account = "130202255167"||[];
			for (var i=0;i<this.account.length;i++) {
				if (this.account[i].status=="true") {
					this.user = this.account[i].user;
				}
			}
			var that = this;
			$.ajax({
				type:"get",
				url:"data/goods.json",
				success:function(res){
					console.log(res);
					that.res = res;
					that.load();
				}
			});
		}
		load(){
			var str1 = "";
			var str2 = "";
			var str3 = "";
			var str4 = "";
			var str5 = "";
			var that = this;
			console.log("load");
			for (var i=0;i<this.res.length;i++) {
				if (this.id == this.res[i].goodsId) {
					var good = this.res[i];
					$(that.title).html(good.name);		
					$(that.price).html("¥" +good.price);
					
					var sizeHtml = "";
					for( var j = 0; j < good.size.length; j++)
					{						
						sizeHtml += "<li>" + good.size[j] + "</li>";
					}			
					var colorHtml = "";
					for( var j= 0; j < good.color.length;j++)
					{
						
						colorHtml += "<li>" + good.color[j] + "</li>";
					}
					
					$(that.colorList).html(colorHtml);
					$(that.sizeList).html(sizeHtml);
										
					var str1 ="";
					var str2 ="";
					for (var j=0;j< good.goods.length;j++) {
						str1 += `<a href="#"><img src="${good.goods[j]}"/></a>`;
					}
					for (var j=0;j<good.goods.length;j++) {
						str2 += `<img src="${good.goods[j]}"/>`;
					}
					
					this.btns.html(str1);
					this.btns.children("a").eq(0).addClass("active");
					str1 += `<span id="over"></span>`;
					this.img.html(str1);
					this.bigbox.html(str2);
					this.over =$("#over");
					this.addLister();
					this.big();
				}
			}
		}
		addLister()
		{
			var that = this;
			$("#toCar").click(function(){
				that.addcar();
			})
			$(".color-list>li").click(function(){						
				$(".color-list>li").removeClass("add");
				$(this).addClass("add");						
			});
			
			$(".size-list>li").click(function(){						
				$(".size-list>li").removeClass("add");
				$(this).addClass("add");						
			});
			
			$(that.add).click(function(){
				var val = $(that.num).val();
				var intValue = parseInt(val);
				intValue++;
				$(that.num).val(intValue);
			});
			
			$(that.remove).click(function(){				
				var val = $(that.num).val();
				var intValue = parseInt(val);
				intValue--;
				intValue = intValue < 1?1:intValue;
				$(that.num).val(intValue);
			});
			
			this.btns.children("a").click(function(){
				that.btns.children("a").removeClass("active");
				$(this).addClass("active");
				that.img.children("a").css("z-index",2);
				that.img.children("a").eq($(this).index()).css("z-index",5);
				that.bigbox.children("img").css("z-index",2);
				that.bigbox.children("img").eq($(this).index()).css("z-index",5);
				return false;
			})
			
			this.btns.children("a").hover(function()
			{
				that.img.children("a").eq($(this).index()).css("z-index",9);
			},
			function(){
				if ($(this).hasClass("active")) {
					that.img.children("a").eq($(this).index()).css("z-index",5);
				} else{
					that.img.children("a").eq($(this).index()).css("z-index",2);
				}
			});
			
			this.img.hover(function(){
				that.over.css("display","block");
				that.bigbox.css("display","block");
				that.img.mousemove(function(e){
					var l = e.clientX-that.img.offset().left-that.over.width()/2;
					var t = e.pageY-that.img.offset().top-that.over.height()/2;
					if(l<0)l=0;
					if (l>that.img.width()-that.over.width()){
						l=that.img.width()-that.over.width();
					}
					if(t<0)t=0;
					if (t>that.img.height()-that.over.height()){
						t=that.img.height()-that.over.height();
					}
					that.over.css({
						left:l,
						top:t
					})
					var x = l/(that.img.width()-that.over.width());
					var y = t/(that.img.height()-that.over.height());
					that.bigbox.children("img").css({
						left:-(that.bigbox.children("img").width()-that.bigbox.width())*x,
						top:-(that.bigbox.children("img").height()-that.bigbox.height())*y
					})
				})
			},function(){
				that.over.css("display","none");
				that.bigbox.css("display","none");
			})
			
		}
		
		addcar(){
			var user=JSON.parse($.cookie("user"));
			if(user.cargoods==undefined){
				user.cargoods=[];
			}
			var id = this.id;
			var thegood = null;
			var color = $(".color-list>li.add").html();
			var size = $(".size-list>li.add").html();
			for(var i=0;i<user.cargoods.length;i++){
				var item = user.cargoods[i];
				if( item.goodsId == id && item.size == size && item.color == color){
					thegood = user.cargoods[i];
				}
			}
			
			if(thegood ==null){
				thegood = {goodsId:id,num:1, size:size, color:color};
				user.cargoods.push(thegood);
			}else{
				var num = thegood.num + 1;
				thegood.num = num;
			}
			
			$.cookie("user",JSON.stringify(user));
			
			location.href="car.html";
			
			
		}
		
		
		big(){
			var that = this;
			this.img.hover(function(){
				that.over.css("display","block");
				that.bigbox.css("display","block");
				that.img.mousemove(function(e){
					var l = e.clientX-that.img.offset().left-that.over.width()/2;
					var t = e.pageY-that.img.offset().top-that.over.height()/2;
					if(l<0)l=0;
					if (l>that.img.width()-that.over.width()){
						l=that.img.width()-that.over.width();
					}
					if(t<0)t=0;
					if (t>that.img.height()-that.over.height()){
						t=that.img.height()-that.over.height();
					}
					that.over.css({
						left:l,
						top:t
					})
					var x = l/(that.img.width()-that.over.width());
					var y = t/(that.img.height()-that.over.height());
					that.bigbox.children("img").css({
						left:-(that.bigbox.children("img").width()-that.bigbox.width())*x,
						top:-(that.bigbox.children("img").height()-that.bigbox.height())*y
					})
				})
			},function(){
				that.over.css("display","none");
				that.bigbox.css("display","none");
			})
		}
	}
	var g = new Goods();
	
	var options_go = {
	title:$(".msg_r>h4>span"),
	price:$(".price"),
	colorList:$(".color-list"),
	sizeList:$(".size-list"),
	add:$("#jia"),
	remove:$("#jian"),
	num:$("#num"),
	img:$(".imgbox"),
	btns:$(".btns"),
	bigbox:$(".bigbox")
}
	g.init(options_go);
	//return new Goods;
});


