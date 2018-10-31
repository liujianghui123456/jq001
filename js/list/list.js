


//
$(".cover div").mouseover(function(){
	$(this).children("div").show()
})

$(".cover div").mouseout(function(){
	$(this).children("div").stop().hide()
})



class Page{
    constructor(options){
        this.url = options.url;
        this.list = options.list;
        this.num = options.num;
        this.index = 1;
        this.load()
    }
    load(){
        var that = this;
        $.ajax({
            url:this.url,
            type:"get",
            success:function(res){
            	that.res=res;
                that.display();
                that.createPage();
                that.init();
            }
        })
    }
    display(){
        var str = "";
        for(var i=this.num*this.index-this.num;i<this.num*this.index;i++){
            if(i<this.res.length){
                str += `<dl class="like-b-box" lay-id="${this.res[i].goodsId}">
                		<a href="goods.html?id=${this.res[i].goodsId}">
							<dt><img src="${this.res[i].src}"/></dt>
							<dd>
								<span><b>￥</b>${this.res[i].price}</span>
								<p>${this.res[i].name}</p>
								<em>加入购物车</em>
							</dd>
						</a>
						</dl>`;
            }
        }
        this.list.html(str);

    }
    createPage(){
        var that = this;
        $(".tcdPageCode").createPage({
            pageCount:Math.ceil(this.res.length/this.num),
            current:1,
            backFn:function(index){
                that.index = index;
                that.display()
            }
        });
    }
    init(){
        var that = this;
        this.list.on("click","div",function(){
            var goodsId = $(this).parent().attr("index");
            that.setCookie(goodsId)
        })
    }
    setCookie(id){
        this.goods = JSON.parse($.cookie("goods")) || [];        
//              存cookie，两种情况
        if(this.goods.length < 1){
            this.goods.push({
                goodsId:id,
                num:1
            })
        }else{
            var onOff = true
            for(var i=0;i<this.goods.length;i++){
                if(this.goods[i].goodsId == id){
                    this.goods[i].num++
                    onOff = false
                }
            }
            if(onOff){
                this.goods.push({
                    goodsId:id,
                    num:1
                })
            }
        }
        $.cookie("goods",JSON.stringify(this.goods),{expires:7,path:"/"})
        console.log($.cookie("goods"))
    }
}

new Page({
    url:"data/goods.json",
    list:$("#like-b"),
    num:5
})

//$(".tcdPageCode").createPage({
//      pageCount:100,
//      current:1,
//      backFn:function(p){
//          //console.log(p);
//      }
// });

