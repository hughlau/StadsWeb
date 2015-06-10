function createFileDir(path,id){

    uexFileMgr.createDir(id, path);
}

function createFile(path,fileId){
    uexFileMgr.createFile(fileId, path);
}

function deleteFileByPath(filePath){
    uexFileMgr.deleteFileByPath(filePath);
}
function writeFile(fileId,mode,data){
    uexFileMgr.writeFile(fileId, mode, data);
}

function readPic2base64(file){ 
    var backData;
    var reader = new FileReader(); 
    reader.readAsDataURL(file); 
    reader.onload = function(e){ 
        backData=this.result;
    } 
} 