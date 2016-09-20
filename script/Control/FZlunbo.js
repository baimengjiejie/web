/**
 * Created by Administrator on 2016/8/27.
 */
function slide(params,callback){
    var option ={
        container:document,
        width:0,
        height:0,
        speed:3000,
        changespeed:500,
        imgs:[{},{}]
    }
    var imagesCount;
    init(params);

    function init(params){
        extend(option,params);

        //最外层的显示边框添加样式
        var containerStyle="width:"+option.width+"px;height:"+option.height+"px;overflow: hidden;position: relative;";
        option.container.style=containerStyle;

        //添加img的容器div
        imagesCount=option.imgs.length;
        var packageWidth = option.width * imagesCount;
        var packageImgDiv="<div class='imgs' style='width: "+packageWidth+"px;height: "+option.height+"px;position: absolute;'></div>";
        option.container.insertAdjacentHTML("beforeEnd",packageImgDiv);

        //添加图片
        var ImgDiv=document.querySelector(".imgs");
        var imgDom="";
        for(var i= 0; i < imagesCount; i++){
            imgDom=imgDom+"<img src='"+option.imgs[i].path+"' style='width:"+option.width+"px;height:"+option.height+"px;float: left;'>";
        }
        ImgDiv.insertAdjacentHTML("beforeEnd",imgDom);

        //创建显示 数字
        var num=document.createElement("div");
        num.className="num";
        num.style=" position: absolute;bottom: 10px;right: 10px;";
        var ul =document.createElement("ul");
        ul.style="list-style-type: none;text-align: center;color: white;";
        for(var i=0;i<imagesCount;i++){
            var li =document.createElement("li");
            li.innerHTML=(i+1);
            li.style="width: 20px;height: 20px;line-height: 20px;background-color: #f90;border-radius: 50%;opacity: 0.6;float: left;margin-right: 5px;";
            li.onclick=liClick;
            ul.appendChild(li);
        }
        num.appendChild(ul);
        option.container.appendChild(num);
    }

    function  liClick(event){
        var li=event.target;
        moveToImgbyIndex(parseInt(li.innerHTML)-1);
    }

    function extend(a,b){
        for(var key in b){
            if(a.hasOwnProperty(key)){
                a[key]=b[key];
            }
        }
        return a;
    }



    var currentImgIndex = 0;//存储当前index
    var moveController=0;//从当前页面跳转到目标页面用到的时钟
    //初始化
    changeNumber();
//    每间隔3s轮播跳转一次
    var imgChangeController;//每间隔一段时间（暂定为3s）页面跳转一次的时钟控制器；
    imgChangeController = setInterval(imgChange, option.speed);
    function imgChange() {
        var nextImgIndex = currentImgIndex + 1;
        //当下一个页面的index为img的总数的时候，将nextImgIndex设为0；
        if (nextImgIndex >= option.container.querySelectorAll("img").length) {
            nextImgIndex = 0;
        }
        moveToImgbyIndex(nextImgIndex);
    }
    //轮播页面由当前页面移动到下一个页面
    function moveToImgbyIndex(index){
        if (moveController == 0){
        //当前页面的left
        var currentImgLeft = - currentImgIndex * option.width;
        //目标页面的left
        var nextImgLeft = - index * option.width;
        //移动10次的step
         var step = (nextImgLeft - currentImgLeft)/10;
        //时间为0.5秒 每步移动0.5/10分钟
        var count =0;
        var imgs=document.querySelector(".imgs");
        moveController=setInterval(function(){
            currentImgLeft += step;
            imgs.style.left=currentImgLeft + "px";
            count ++;
            if (count>9){
//                停止移动
                clearInterval(moveController);
                moveController=0;
//                将当前页面设置为目标页面，因为移动已经完成
                currentImgIndex=index;
                //数值改变
                changeNumber();
            }
        },option.changespeed/10);
        }
    }
    //num改变
    function changeNumber() {
        var lis = document.querySelectorAll(".num ul li");
        for (var i = 0; i < lis.length; i++) {
            var li = lis[i];
            li.style.fontWeight = 400;
            li.style.backgroundColor = "#f90";
        }
        var currentLi = lis[currentImgIndex];
        currentLi.style.fontWeight = 700;
        currentLi.style.backgroundColor = "red";
    }

    //添加监听事件
    document.querySelector("#lunbo").onmouseover = function () {
        clearInterval(imgChangeController);
    };
    document.querySelector("#lunbo").onmouseout = function () {
        imgChangeController = setInterval(imgChange, option.speed);
    };
    //监听浏览器是否最小化
    document.addEventListener("webkitvisibilitychange", function () {
        if (document.webkitVisibilityState == "hidden") {
            clearInterval(imgChangeController);
        } else {
            imgChangeController = setInterval(imgChange, option.speed);
        }
//        console.log(document.webkitVisibilityState);
        //ie:document.msVisibilityState;
        //火狐：document.mozVisibilityState;
        //chrome/safri:document.webkitVisibilityState;
    });

}
