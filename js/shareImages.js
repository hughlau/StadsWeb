// 分享图片到QQ
function shareWithQQ(){
    var id=Image_ID;
    var desId=Image_DesID;
    if(Image_Type=='svg'){
        shareSVGImage(0,id,desId,0,function(data,image){
            var array = new Array();
            var appId='1104535005';
            var url = "http://168.160.200.114/Uploadfiles/stasimage/"+data;
            var jsonData='{"title":"'+Image_Title+'--万方软件","summary":"内容来自创新助手","targetUrl":"'+url+'","imageUrl":"'+url+'","appName":"创新助手","cflag":"2"}';
            uexQQ.shareWebImgTextToQQ(appId, jsonData);
        });
    }else{
        shareCanvasImage(0,id,function(data,image){
            var array = new Array();
            var appId='1104535005';
            var url = "http://168.160.200.114/Uploadfiles/stasimage/"+data;
            var jsonData='{"title":"'+Image_Title+'--万方软件","summary":"内容来自创新助手","targetUrl":"'+url+'","imageUrl":"'+url+'","appName":"创新助手","cflag":"2"}';
            uexQQ.shareWebImgTextToQQ(appId, jsonData);
        });
    }


}

// 分享图片到QQ空间
function shareWithQQZone(){
    var id=Image_ID;
    var desId=Image_DesID;
    var text=Image_Title;
    if(Image_Type=='svg'){
        shareSVGImage(0,id,desId,0,function(data,image){
            var appId='1104535005';
            var array = new Array();
            var url = "http://168.160.200.114/Uploadfiles/stasimage/"+data;
            var jsonData='{"title":"'+Image_Title+'--万方软件","summary":"内容来自创新助手","targetUrl":"'+url+'","imageUrl":["'+url+'"]}';
            uexQQ.shareImgTextToQZone(appId, jsonData);
        });
    }else{
        shareCanvasImage(0,id,function(data,image){
            var appId='1104535005';
            var array = new Array();
            var url = "http://168.160.200.114/Uploadfiles/stasimage/"+data;
            var jsonData='{"title":"'+Image_Title+'--万方软件","summary":"内容来自创新助手","targetUrl":"'+url+'","imageUrl":["'+url+'"]}';
            uexQQ.shareImgTextToQZone(appId, jsonData);
        });
    }

}

// 分享图片到微信
function shareImgWithWeChat(type,ImageType){
    var id=Image_ID;
    var desId=Image_DesID;
    var text=Image_Title;
    WX.isWXAppInstalled();
    if(Image_Type=='svg'){
        shareSVGImage(0,id,desId,type,function(data,image){
            var array = new Array();
            array[0] = "http://168.160.200.114/Uploadfiles/stasimage/"+data;
            WX.sendImageContent(type,array[0],text+'--万方软件');
        });   
    }else{
        shareCanvasImage(0,id,function(data,image){
            var array = new Array();
            array[0] = "http://168.160.200.114/Uploadfiles/stasimage/"+data;
            WX.sendImageContent(type,array[0],text+'--万方软件');
        });
    } 
}

function shareImgToLocal(){
    var id=Image_ID;
    var desId=Image_DesID;
    if(Image_Type=='svg'){
        shareSVGImage(0,id,desId,0,function(data,image){
            var array = new Array();
            array[0] = "http://168.160.200.114/Uploadfiles/stasimage/"+data;
            uexImageBrowser.open(array,0);
            // var id=data.split('.')[0];
            // createFile("wgt://"+data,id);
            // writeFile(id,'0',image);
            // saveImage("wgt://"+data);
            // deleteFileByPath("wgt://"+data);
        });
    }else{
        shareCanvasImage(0,id,function(data,image){
            var array = new Array();
            array[0] = "http://168.160.200.114/Uploadfiles/stasimage/"+data;
            uexImageBrowser.open(array,0);
            // var id=data.split('.')[0];
            // createFile("wgt://"+data,id);
            // writeFile(id,'0',image);
            // saveImage("wgt://"+data);
            // deleteFileByPath("wgt://"+data);
        });
    }
}

function saveImage(inImgPath){
    //var inImgPath = $$('imagePath').value;
    uexImageBrowser.cbSave = function(opId,dataType,data){
        var str = data==0?'保存成功':'保存失败';
        $alert(str);
    }
    /*此参数应该为wgt://（或wgts://,file://）路径下的本地图片文件，不支持http://等网络路径*/
    uexImageBrowser.save(inImgPath);
}
// 分享图片到新浪微博
function shareImgWithSina(){
    SINA.registerApp();
    var id=Image_ID;
    var desId=Image_DesID;
    var text=Image_Title;
    if(Image_Type=='svg'){
        shareSVGImage(35,id,desId,0,function(data,image){
            var array = new Array();
            var imagePath = "http://168.160.200.114/Uploadfiles/stasimage/"+data;
            //uexSina.sendImageContent(imagePath, text+'--万方软件');
            SINA.sendImageContent(imagePath,text);
        });
    }else{
        shareCanvasImage(35,id,function(data,image){
            var array = new Array();
            var imagePath = "http://168.160.200.114/Uploadfiles/stasimage/"+data;
            //uexSina.sendImageContent(imagePath, text+'--万方软件');
            SINA.sendImageContent(imagePath,text);
        });
    };
}

