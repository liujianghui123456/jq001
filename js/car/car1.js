class Car{
	constructor(options){
		this.url=options.url;
		this.tbody=options.tbody;
		this.qx=options.qx;
		this.delCho=options.delCho;
		this.allDel=options.allDel;
		this.sl=options.sl;
		this.zj=options.zj;
		this.load()
		
	}
	load(){
		var that=this;
		$.ajax({
			url:that.url,
			type:"get",
			success:function(res){
				that.res=res;
				that.getCookie()
				for(var i=0;i<that.cargoods.length;i++){
					var cargood=that.cargoods[i];
					for(var j=0;j<that.res.length;j++){
						var good=that.res[j];
						if(cargood.goodsId==good.goodsId){
							cargood.name=good.name;
							cargood.price=good.price;
							cargood.checked=false;
							cargood.flag=i;
							cargood.src=good.src;//产品的图片显示
						}
					}
				}
				that.display()
				
			}
		})
		
	}
	getCookie(){
		/// 拿到cookie值
		var cookieStr = $.cookie("user");
		var user = JSON.parse(cookieStr);
		this.cargoods=user.cargoods;
		
	}
	display(){
		var str="";
		var that=this;
		var zsum=0;
		var zje=0;
		for(var i=0;i<that.cargoods.length;i++){
			var cargood=that.cargoods[i];
				var totalprice=cargood.price*cargood.num;
				if(cargood.checked){
					zsum+=cargood.num;
					zje+=totalprice;
				}
				str+=`<tr flag="${cargood.flag}">`	
				if(cargood.checked){
					str+=`<td><input type="checkbox" checked='true' class="cho"/></td>`
				}else{
					
					str+=`<td><input type="checkbox" class="cho"/></td>`	
				}
				str+=`	<td>
							<dl>
								<dt><img src="${cargood.src}"/></dt>
								<dd>
									<a href="#">${cargood.name}<br/></a>
								</dd>
							</dl>
						</td>
						<td><span>${cargood.size}</span><br/><span>${cargood.color}</span></td>
						<td num=888>${cargood.price}</td>
						<td>
							<input type="button" name="jian" class="jian" value="-" />
							<input type="text" name="num" class="num" value="${cargood.num}" />
							<input type="button" name="jia" class="jia" value="+" />
						</td>
						
						<td class="xj">${totalprice}</td>
						<td>
							<a href="#">收藏</a>
							&nbsp;&nbsp;<a href="#" class="shan" >删除</a>
						</td>
					</tr>`
		}
		this.tbody.html(str);
		this.sl.html(zsum)
		this.zj.html(zje)
		this.addlisten()
		
	    var strUser =$.cookie("user");
	    var user = JSON.parse(strUser);
	    user.cargoods = this.cargoods;
	    $.cookie("user", JSON.stringify(user));
	}
	addlisten(){
		var that = this;
		$(this.tbody).children().each(function(index,items){
			var checkbox = $(items).children().eq(0).children().eq(0);
			var flag=$(items).attr("flag");
			var good = that.getGood(flag);
			var jian = $(items).children().eq(4).children().eq(0);
			var add = $(items).children().eq(4).children().eq(2);
			$(jian).click(function(){
				good.num--;
				that.display()
			})
			$(add).click(function(){
				good.num++;
				that.display()
			})
			$(checkbox).click(function(){
		    	var checked = $(this).prop('checked');
		    	good.checked=checked;
				that.display()
			})
			
		})
		$(that.qx).click(function(){
			var checked = $(this).prop('checked');
			for(var i=0;i<that.cargoods.length;i++){
				 that.cargoods[i].checked = checked;
			}
			that.display();
		})
		$(".delCho").click(function(){
			var indexs=[];
			for(var i=0;i<that.cargoods.length;i++){
				if( that.cargoods[i].checked == true){
					indexs.push(that.cargoods[i].flag);
				}
			}
			for(var i=0;i<indexs.length;i++){
				that.removdGood(indexs[i])
			}
			that.display();
		})
		$(".allDel").click(function(){
			that.cargoods = [];
			that.display();
		})
		
		that.tbody.on("click",".shan" ,function(){
		 	var flag =$(this).parent().parent().attr("flag");
			that.removdGood(flag);
			that.display();
		})
	}
	removdGood(flag){
		var that=this;
		for(var i=0;i<that.cargoods.length;i++){
			if(that.cargoods[i].flag==flag){
				that.cargoods.splice(i,1)
			}
		}
	}
	
	getGood(flag){  //flag：购物车里的每一种商品的唯一标记
		for(var i=0;i<this.cargoods.length;i++){
			if(this.cargoods[i].flag==flag){
				return this.cargoods[i]
			}
		}
	}
	
	
	
}




new Car({
	url:"data/goods.json",
	tbody:$("table>tbody"),
	delCho:$(".delCho"),
	allDel:$(".allDel"),
	sl:$(".sl"),
	zj:$(".zj"),
	qx:$("#allCho1")
})
