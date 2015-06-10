var SINA = {
    registerApp : function(){
        var appKey = "1556782372";
        var appSecret = "3b32e8d43164274ab9bb300c0a7d8491";
        var registerUrl='http://stads.infosoft.cc/';
        uexSina.registerApp(appKey, appSecret, registerUrl);
    },
    sendImageContent : function(imagePath,text){
        uexSina.sendImageContent(imagePath, text+'--万方软件');
    }
}