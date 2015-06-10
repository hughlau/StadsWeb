function shareSVGImage(height,id,desId,type,callback){
    var text=Image_Title;
    var myCanvas = document.getElementById("myCanvas");
    var div_svg=$("#"+id).find("svg");
    var svgContainer=$("#"+id).find("svg").parent();
    var svgHtml;
    
    //begin --lhc 2015年4月28日10:22:35
    
    if(undefined!=desId && ""!=desId){
        var svgObj=$("#"+id).find("svg")[0];
        var h=parseInt(svgObj.getAttribute('height'));
        var w=parseInt(svgObj.getAttribute('width'));
        var desText=$('#'+desId).html().split('，');
        var firstRow=desText[0]+','+desText[1];
        var secondRow=desText[2]+','+desText[3];
        svgObj.setAttribute('height',(h+50+height)+'px');
        svgHtml = svgContainer.html();
        svgHtml=svgHtml.substring(0,svgHtml.length-6);
        svgHtml+='<rect id="dateRectObj_0" x="0" y="'+h+'" rx="1" ry="1" width="'+w+'" height="'+(height+50)+'" fill="#ffffff" display="block"/>'
        svgHtml+='<text x="'+(w-135)+'" text-anchor="end" zIndex="8" style="cursor:pointer;color:#909090;font-size:12px;fill:#909090;" y="'+(h+10)+'">';
        svgHtml+=firstRow;
        svgHtml+='</text>';
        svgHtml+=' <text x="'+(w-175)+'" text-anchor="end" zIndex="8" style="cursor:pointer;color:#909090;font-size:12px;fill:#909090;" y="'+(h+25)+'">';
        svgHtml+=secondRow;
        svgHtml+='</text></svg>';
        svgObj.setAttribute('height',h+'px');
    }else{
        
        if(height!=0){
            var svgObj=$("#"+id).find("svg")[0];
            var h=parseInt(svgObj.getAttribute('height'));
            var w=parseInt(svgObj.getAttribute('width'));
            svgObj.setAttribute('height',(h+height)+'px');
            svgHtml = svgContainer.html();
            svgHtml=svgHtml.substring(0,svgHtml.length-6);
            svgHtml+='<rect id="dateRectObj_0" x="0" y="'+h+'" rx="1" ry="1" width="'+w+'" height="'+height+'" fill="#ffffff" display="block"/>'
            svgHtml+='</svg>';
            svgObj.setAttribute('height',h+'px');
        }else{
            svgHtml = svgContainer.html();
        }
        
    }
    
    //end --lhc 2015年4月28日10:22:41
    canvg('myCanvas', svgHtml);       
    var image = myCanvas.toDataURL("image/png");
    
    var strImg=image.split(',')[1];
    var fileUrl="./Uploadfiles/";
    var fileName="stasimage";
    $.ajax({
            type: "POST",
            url: "http://168.160.200.114/saveimage.ashx",
            data: {'type':"SaveImage",'strImg':strImg,'fileUrl':fileUrl,'fileName':fileName},
            success: function(data) {
                if(undefined!=desId && ""!=desId){
                    svgObj.setAttribute('height',h);
                }
                callback(data,image);
            }                             
    });       
}

function shareCanvasImage(height,id,callback){
    var $this=canvasOption;
            //begin lbt add 20150403
    if(id=="jgxuehua")
        $this=jgcanvasOption;
    if(id=="fwrxuehua")
        $this=zjcanvasOption;
    //end lbt add 20150403
    //begin --lhc 2015年4月9日10:53:01
    if(id=="xueshuxh")
        $this=hzcanvasOption;
    if(id=="xueshufx")
        $this=fxcanvasOption;
    //end --lhc 2015年4月9日10:53:01
    var image;
    $this.zr.painter._height=$this.zr.painter._height+height;
    image= $this.zr.toDataURL("image/png", $this.option.backgroundColor && "rgba(0,0,0,0)" === $this.option.backgroundColor.replace(" ", "") ? "#fff" : $this.option.backgroundColor);
    
    /*
    var myCanvas = document.getElementById("myCanvas");
    var svgHtml = $("#"+id).html();
    canvg('myCanvas', svgHtml);
    
    var image = myCanvas.toDataURL("image/png");
    alert(image);
    */
    var strImg=image.split(',')[1];
    var fileUrl="./Uploadfiles/";
    var fileName="stasimage";
    
    $.ajax({
        type: "POST",
        url: "http://168.160.200.114/saveimage.ashx",
        data: {'type':"SaveImage",'strImg':strImg,'fileUrl':fileUrl,'fileName':fileName},
        success: function(data) {
            callback(data,image);
        }                             
    });
}

        // function shareWithQQ (id,desId,text,type) {
//             
            // //var appId='222222';
            // var myCanvas = document.getElementById("myCanvas");
            // var div_svg=$("#"+id).find("svg");
            // var svgContainer=$("#"+id).find("svg").parent();
            // var svgHtml;
// 
            // //begin --lhc 2015年4月28日10:22:35
//             
            // if(undefined!=desId && ""!=desId){
                // var svgObj=$("#"+id).find("svg")[0];
                // var h=parseInt(svgObj.getAttribute('height'));
                // var w=parseInt(svgObj.getAttribute('width'));
                // svgObj.setAttribute('height',(h+50)+'px');
                // svgHtml = svgContainer.html();
                // svgHtml=svgHtml.substring(0,svgHtml.length-6);
                // svgHtml+='<rect id="dateRectObj_0" x="0" y="'+h+'" rx="1" ry="1" width="'+w+'" height="50" fill="#ffffff" display="block"/>'
                // svgHtml+=' <text x="'+(w-30)+'" text-anchor="end" zIndex="8" style="cursor:pointer;color:#909090;font-size:12px;fill:#909090;" y="'+(h+20)+'">';
                // svgHtml+=$('#'+desId).html();
                // svgHtml+='</text></svg>';
            // }else{
                // svgHtml = svgContainer.html();
            // }
//             
            // //end --lhc 2015年4月28日10:22:41
            // canvg('myCanvas', svgHtml);       
            // var image = myCanvas.toDataURL("image/png");
//             
            // var strImg=image.split(',')[1];
            // var appId='1104535005';
            // var fileUrl="./Uploadfiles/";
            // var fileName="stasimage";
            // $.ajax({
                    // type: "POST",
                    // url: "http://168.160.200.114/saveimage.ashx",
                    // data: {'type':"SaveImage",'strImg':strImg,'fileUrl':fileUrl,'fileName':fileName},
                    // success: function(data) {
                        // var array = new Array();
                        // var url = "http://168.160.200.114/Uploadfiles/stasimage/"+data;
                        // svgObj.setAttribute('height',h);
                       // var jsonData='';
                       // if(type=='QQ'){
                            // jsonData='{"title":"标题","summary":"摘要","targetUrl":"'+url+'","imageUrl":"'+url+'","appName":"创新助手"}';
                            // uexQQ.shareWebImgTextToQQ(appId, jsonData);
                        // }else{
                            // jsonData='{"title":"标题12","summary":"摘要12","targetUrl":"'+url+'","imageUrl":["'+url+'"]}';
                            // uexQQ.shareImgTextToQZone(appId, jsonData);
                        // }
// 
// 
                    // }                             
                // });
//             
//             
        // }
// function shareImgWithWeChat(id,desId,text,type){
            // var myCanvas = document.getElementById("myCanvas");
            // var div_svg=$("#"+id).find("svg");
            // var svgContainer=$("#"+id).find("svg").parent();
            // var svgHtml;
// 
            // //begin --lhc 2015年4月28日10:22:35
//             
            // if(undefined!=desId && ""!=desId){
                // var svgObj=$("#"+id).find("svg")[0];
                // var h=parseInt(svgObj.getAttribute('height'));
                // var w=parseInt(svgObj.getAttribute('width'));
                // svgObj.setAttribute('height',(h+50)+'px');
                // svgHtml = svgContainer.html();
                // svgHtml=svgHtml.substring(0,svgHtml.length-6);
                // svgHtml+='<rect id="dateRectObj_0" x="0" y="'+h+'" rx="1" ry="1" width="'+w+'" height="50" fill="#ffffff" display="block"/>'
                // svgHtml+=' <text x="'+(w-30)+'" text-anchor="end" zIndex="8" style="cursor:pointer;color:#909090;font-size:12px;fill:#909090;" y="'+(h+20)+'">';
                // svgHtml+=$('#'+desId).html();
                // svgHtml+='</text></svg>';
            // }else{
                // svgHtml = svgContainer.html();
            // }
//             
            // //end --lhc 2015年4月28日10:22:41
            // canvg('myCanvas', svgHtml);       
            // var image = myCanvas.toDataURL("image/png");
//             
            // var strImg=image.split(',')[1];
            // var fileUrl="./Uploadfiles/";
            // var fileName="stasimage";
            // $.ajax({
                    // type: "POST",
                    // url: "http://168.160.200.114/saveimage.ashx",
                    // data: {'type':"SaveImage",'strImg':strImg,'fileUrl':fileUrl,'fileName':fileName},
                    // success: function(data) {
                        // var array = new Array();
                        // array[0] = "http://168.160.200.114/Uploadfiles/stasimage/"+data;
                       // svgObj.setAttribute('height',h);
                       // WX.sendImageContent(type,array[0],text)
//                        
                    // }                             
                // });
// }




function transferSVGtoImage(id,desId)
        {
            var myCanvas = document.getElementById("myCanvas");
            //alert('截图开始');
            var div_svg=$("#"+id).find("svg");
            //alert("div_svg"+div_svg.html());
            //alert("div_svg_g"+div_svg.find("g[class='highcharts-markers highcharts-tracker']"));
            //alert($("#"+id).find("svg").find("g[class='highcharts-markers highcharts-tracker']").html());
            alert($("#"+id).find("svg").find("g[class='highcharts-markers highcharts-tracker']").attr("fill"));
            //$("#"+id).find("svg").find("g[class='highcharts-markers highcharts-tracker']").html("");
            //alert($("#"+id).find("svg").find("g[class='highcharts-markers highcharts-tracker']").html());
            //$("#"+id).find("svg").find("g[class='highcharts-tooltip']").html("");//
            
            //alert('处理结束');
            var svgContainer=$("#"+id).find("svg").parent();
            var svgHtml;

            //begin --lhc 2015年4月28日10:22:35
            
            if(undefined!=desId && ""!=desId){
                var svgObj=$("#"+id).find("svg")[0];
                var h=parseInt(svgObj.getAttribute('height'));
                var w=parseInt(svgObj.getAttribute('width'));
                svgObj.setAttribute('height',(h+50)+'px');
                svgHtml = svgContainer.html();
                svgHtml=svgHtml.substring(0,svgHtml.length-6);
                svgHtml+='<rect id="dateRectObj_0" x="0" y="'+h+'" rx="1" ry="1" width="'+w+'" height="50" fill="#ffffff" display="block"/>'
                svgHtml+=' <text x="'+(w-30)+'" text-anchor="end" zIndex="8" style="cursor:pointer;color:#909090;font-size:12px;fill:#909090;" y="'+(h+20)+'">';
                svgHtml+=$('#'+desId).html();
                svgHtml+='</text></svg>';
            }else{
                svgHtml = svgContainer.html();
            }
            
            //end --lhc 2015年4月28日10:22:41
            canvg('myCanvas', svgHtml);       
            var image = myCanvas.toDataURL("image/png");
            
            var strImg=image.split(',')[1];
            var fileUrl="./Uploadfiles/";
            var fileName="stasimage";
            $.ajax({
                    type: "POST",
                    url: "http://168.160.200.114/saveimage.ashx",
                    data: {'type':"SaveImage",'strImg':strImg,'fileUrl':fileUrl,'fileName':fileName},
                    success: function(data) {
                    	var array = new Array();
                    	array[0] = "http://168.160.200.114/Uploadfiles/stasimage/"+data;
                       svgObj.setAttribute('height',h);
                       uexImageBrowser.open(array,0);
                    }                             
                });
         }
 function transferCanvastoImage(id)
        {
            var $this=canvasOption;
            //begin lbt add 20150403
            if(id=="jgxuehua")
                $this=jgcanvasOption;
            if(id=="fwrxuehua")
                $this=zjcanvasOption;
            //end lbt add 20150403
            //begin --lhc 2015年4月9日10:53:01
            if(id=="xueshuxh")
                $this=hzcanvasOption;
            if(id=="xueshufx")
                $this=fxcanvasOption;
            //end --lhc 2015年4月9日10:53:01
            var image;
            image= $this.zr.toDataURL("image/png", $this.option.backgroundColor && "rgba(0,0,0,0)" === $this.option.backgroundColor.replace(" ", "") ? "#fff" : $this.option.backgroundColor);
            
            /*
            var myCanvas = document.getElementById("myCanvas");
            var svgHtml = $("#"+id).html();
            canvg('myCanvas', svgHtml);
            
            var image = myCanvas.toDataURL("image/png");
            alert(image);
            */
            var strImg=image.split(',')[1];
            var fileUrl="./Uploadfiles/";
            var fileName="stasimage";
            
            $.ajax({
                    type: "POST",
                    url: "http://168.160.200.114/saveimage.ashx",
                    data: {'type':"SaveImage",'strImg':strImg,'fileUrl':fileUrl,'fileName':fileName},
                    success: function(data) {
                       var array = new Array();
                    	array[0] = "http://168.160.200.114/Uploadfiles/stasimage/"+data;
                       uexImageBrowser.open(array,0);
                    }                             
                });
             
         }
 /*20150403---ios image save test---lbt*/
//下载网络图片  
//显示log  
function setLog(msg){  
    $alert(msg);  
}  
var dopCode=1;  
var inSavePath=null;
function savetoImage(id)
        {
            var myCanvas = document.getElementById("myCanvas");
            var svgContainer=$("#"+id).find("svg").parent();
            var svgHtml = svgContainer.html();
            canvg('myCanvas', svgHtml);       
            var image = myCanvas.toDataURL("image/png");
            
            var strImg=image.split(',')[1];
            var fileUrl="./Uploadfiles/";
            var fileName="stasimage";
            $.ajax({
                    type: "POST",
                    url: "http://168.160.200.114/saveimage.ashx",
                    data: {'type':"SaveImage",'strImg':strImg,'fileUrl':fileUrl,'fileName':fileName},
                    success: function(data) {
                        var array = new Array();
                        array[0] = "http://168.160.200.114/Uploadfiles/stasimage/"+data;
                       //uexImageBrowser.open(array,0);
                       downloadurl(array[0]);
                    }                             
                });
         }  
function downloadurl(imgurl){  
    if(imgurl.indexOf("http://")==0){  
        var q = imgurl.match(/.*\.(.*)/);  
        inSavePath = (new Date()).getTime()+"."+q[1];  
        $alert(inSavePath);
        uexDownloaderMgr.createDownloader(dopCode);   
    }else{  
        uexWindow.toast(0,5,"非网络图片",1000);  
    }  
}  
window.uexOnload = function(){  
    uexWindow.cbActionSheet = function(opId,dataType,data){  
        switch(parseInt(data)){  
        case 0:  
            uexCamera.open();  
            break;  
        case 1:  
            uexFileMgr.explorer("");  
            break;  
        case 2:  
            uexWindow.prompt("提示", "输入网络图片URL", "",["确定","取消"]);  
            break;  
        }  
    }  
    uexWindow.cbPrompt=function(opId,dataType,data){  
        if(dataType==1){  
            var d = eval("("+data+")");  
            if(d.num=="0"){  
                if(d.value.indexOf('http://')>-1){  
                    imgurl=d.value;  
                    document.getElementById("imgid").src=imgurl;  
                }  
                else  
                    $alert("网络URL错误");  
            }  
              
        }  
    }  
    uexCamera.cbOpen = function(opId,dataType,data){  
        if(dataType==0)  
        {  
            imgurl = data;  
            document.getElementById("imgid").src=imgurl;  
        }  
    }  
    uexFileMgr.cbExplorer = function(opId,dataType,data){  
        uexLog.sendLog(dataType);   
        if(dataType==0){  
            uexLog.sendLog(data);  
            imgurl = data;  
            document.getElementById("imgid").src=imgurl;  
            uexLog.sendLog(document.getElementById("imgid").src);  
        }  
    }  
    //****************下载回调***************  
    uexDownloaderMgr.cbCreateDownloader=function(opId,dataType,data){  
        uexDownloaderMgr.download(dopCode,imgurl,inSavePath,0);  
        setLog("开始下载图片");  
    }  
    uexDownloaderMgr.onStatus = function(opId,fileSize,percent,status){  
        if(status == 0)  
            setLog("下载进度："+percent+"%");  
        if(status == 1){  
            setLog("下载完成");  
            imgurl = inSavePath;  
            uexDownloaderMgr.closeDownloader(dopCode);  
        }  
        if(status == 2){  
            setLog("下载出错");  
            uexDownloaderMgr.closeDownloader(dopCode);   
            uexFileMgr.deleteFileByPath(inSavePath);  
        }  
    }  
}