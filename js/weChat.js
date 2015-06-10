var cText = 0;
var cJson = 1;
var cInt = 2;
var appId = "wx072907fe8fe9143d";
var app_serect = "66da53db779e22ae3171a95836ea9340";
var app_key = "L8LrMqqeGRxST5reouB0K66CaYAWpqhAVsq7ggKkxHCOastWksvuX1uvmvQclxaHoYd3ElNBrNO2DHnnzgfVG9Qs473M3DTOZug5er46FhuGofumV8H2FVR9qkjSlC5K";
var partnerId = "1900000109";
var traceId = "crestxu_test";
var packageValue = "bank_type=WX&body=%E5%8D%83%E8%B6%B3%E9%87%91%E7%AE%8D%E6%A3%92&fee_type=1&input_charset=UTF-8&notify_url=http%3A%2F%2Fweixin.qq.com&out_trade_no=9d86d83f925f2149e9edb0ac3b49229c&partner=1900000109&spbill_create_ip=196.168.1.1&total_fee=1&sign=899815E4F3106CC5DCFAF76A4D16069B";

    // window.uexOnload = function(){
        // uexQQ.cbIsQQInstalled=function(opId, dataType, data){
            // alert(data);
            // if(data=='0'){
                // var jsonData='';
                                            // // if(type=='QQ'){
                                // // jsonData='{"title":"标题","summary":"摘要","targetUrl":"'+img_url+'","imageUrl":"'+img_url+'","appName":"创新助手"}';
                                // // uexQQ.shareWebImgTextToQQ(appId, jsonData);
                            // // }else{
                                // // jsonData='{"title":"标题12","summary":"摘要12","targetUrl":"'+img_url+'","imageUrl":["'+img_url+'"]}';
                                // // uexQQ.shareImgTextToQZone(appId, jsonData);
                            // // }
            // }else{
                // $alert('未安装QQ!');
            // }
        // }
//         
        // uexWeiXin.cbRegisterApp =function(opCode,dataType,data)
        // {
            // //0支持，1 不支持
            // alert("cbRegisterApp："+data);
            // document.getElementById("selectItem").innerHTML = data;
        // }
        // uexWeiXin.cbIsSupportPay =function(opCode,dataType,data)
        // {
            // //0支持，1 不支持
            // alert("cbIsSupportPay："+data);
            // document.getElementById("showSupportInfo").innerHTML = data;
        // }
        // uexWeiXin.cbGotoPay = function(opCode,dataType,data)
        // {
            // //如果datatype是0说明返回的data是整数0，意味着支付成功了。
            // //如果datatype是2说明返回的data是字符串，意味着支付失败了。data就是失败信息
            // console.log("cbGotoPay");
            // alert("cbGotoPay："+data);
            // document.getElementById("showPayInfo").innerHTML = data;
        // }
//         
        // uexWeiXin.cbGenerateAdvanceOrder = function(opCode,dataType,data)
        // {
            // alert("cbGenerateAdvanceOrder："+data);
            // document.getElementById("showOrderInfo").innerHTML = data;
        // }
//         
        // uexWeiXin.cbGetAccessToken = function(opCode,dataType,data)
        // {
           // alert("cbGetAccessToken："+data);
           // document.getElementById("showAccess_token").innerHTML = data;
        // }
//         
//         
        // uexWeiXin.cbGetAccessTokenLocal = function(opCode,dataType,data)
        // {
           // alert("cbGetAccessTokenLocal:"+data);
           // document.getElementById("showAccess_token").innerHTML = data;
        // }
//         
        // uexWeiXin.cbIsWXAppInstalled=function(opCode,dataType,data){
            // alert("cbIsWXAppInstalled："+data);
        // };
        // uexWeiXin.cbGetWXAppInstallUrl=function(opCode,dataType,data){
            // alert("cbGetWXAppInstallUrl："+data);
        // };
// 
        // //是否安装微信客户端
        // uexWeiXin.cbIsWXAppInstalled = function(opCode, dataType, data){
            // alert("cbIsWXAppInstalled：" + data);
        // };
        // //获取微信在appstore的下载地址。【iOS专用】
        // uexWeiXin.cbGetWXAppInstallUrl = function(opCode, dataType, data){
             // alert("cbGetWXAppInstallUrl：" + data);
        // };
        // //分享文本是否成功的状态
        // uexWeiXin.cbSendTextContent = function(opCode, dataType, data){
             // //data是状态码
             // alert("cbSendTextContent："+data);
             // document.getElementById("showStatus").innerHTML = "返回分享文字状态码:" + data;
        // };
        // //分享图片是否成功的状态
        // uexWeiXin.cbSendImageContent = function(opCode, dataType, data){
            // //data是状态码
            // alert("cbSendImageContent："+data);
            // document.getElementById("showPicStatus").innerHTML = "返回分享图片状态码:" + data;
        // };
        // uexWeiXin.cbShareTextContent = function(opCode, dataType, data){
            // alert("cbShareTextContent："+data);
            // document.getElementById("shareTextStatus").innerHTML = "返回分享文本状态码:" + data;
        // };
        // uexWeiXin.cbShareImageContent = function(opCode, dataType, data){
            // alert("cbShareImageContent："+data);
            // document.getElementById("shareImageStatus").innerHTML = "返回分享图片状态码:" + data;
        // };
        // uexWeiXin.cbShareLinkContent = function(opCode, dataType, data){
            // alert("cbShareLinkContent："+data);
            // document.getElementById("shareLinkStatus").innerHTML = "返回分享链接状态码:" + data;
        // };
    // }

   //分享文本，支持分享到朋友圈与用户好友
   function shareText(){
       var txt = "这是来自AppCan平台对微信支持测试";
       var type = document.getElementById("type").value;
       uexWeiXin.sendTextContent(type, txt);
   }
   //分享图片，支持分享到朋友圈与用户好友
   function sharePic(){
        var thumImgPath = "res://appcan.png";
        var realImgPath = "res://appcan.png";
        var txt = "这是来自AppCan平台对微信支持测试";
        //分享场景 0：对话  1：朋友圈
        var type = document.getElementById("type").value;
        uexWeiXin.sendImageContent(type, thumImgPath, realImgPath,"","","");
    } 
   function shareTextContent(){
       var type = document.getElementById("type").value;
       var jsonstr = '{"text":"这是来自AppCan平台对微信支持测试","scene":"'+type+'"}';
       uexWeiXin.shareTextContent(jsonstr);
   }
   function shareImageContent(){
        var type = document.getElementById("type").value;
        var jsonstr = '{"thumbImg":"res://appcan.png","image":"res://appcan.png","scene":"'+type+'"}';
        uexWeiXin.shareImageContent(jsonstr);
    } 
   function shareLinkContent(){
        var type = document.getElementById("type").value;
        var jsonstr = '{"thumbImg":"res://icon.png","wedpageUrl":"http://www.appcan.cn","scene":"'+type+'","title":"你好,我是AppCan","description":"中国最大的移动中间键平台AppCan对微信分享的图片支持测试"}';
        uexWeiXin.shareLinkContent(jsonstr);
    } 
    function getAccessToken(){
        uexWeiXin.getAccessToken(appId,app_serect); 
    }        
    function generateAdvanceOrder(){
        var JsonStr = document.getElementById("showAccess_token").innerHTML;
        var token = JSON.parse(JsonStr).access_token;
        uexWeiXin.generatePrepayID(token,app_key,packageValue);
    }
    function gotoPay(){
        var JsonStr = document.getElementById("showOrderInfo").innerHTML;
        var prepayid = JSON.parse(JsonStr).prepayid;
        uexWeiXin.sendPay(partnerId,prepayid,app_key,packageValue);
    }
    

        var WX = {
            registerApp : function(){
                if(!this._init){
                    uexWeiXin.registerApp('wx072907fe8fe9143d');
                    this._init = true;
                }
            },
            isWXAppInstalled : function(){
                this.registerApp();
                
                uexWeiXin.cbIsWXAppInstalled = function(opId,dataType, data){
                    //alert(data);
                    if(data=='0'){
                        //alert('已安装');  
                    }else{
                        $alert("未安装微信");
                        //uexWindow.toast(0,5,"未安装微信",3);
                        return;  
                    }
                };
                uexWeiXin.isWXAppInstalled();  

            },
            sendTextContent : function(sence,content){
                this.registerApp();
                uexWeiXin.sendTextContent(sence,content);
            },
            sendImageContent : function(type,imgUrl,text){// type 1为朋友圈，0为朋友
                this.registerApp();
                uexWeiXin.sendImageContent(type,imgUrl,imgUrl,imgUrl,text,'内容来自创新助手')
            }
        }