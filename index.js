var fs = require("fs");
var path = require('path');  
var request = require('request');
function fileDisplay(filePath, serverUrl){  
    //根据文件路径读取文件，返回文件列表  
    fs.readdir(filePath,function(err,files){  
        if(err){  
            console.warn(err)  
        }else{  
            //遍历读取到的文件列表  
            files.forEach(function(filename){  
                //获取当前文件的绝对路径  
                var filedir = path.join(filePath,filename);  
                //根据文件路径获取文件信息，返回一个fs.Stats对象  
                fs.stat(filedir,function(eror,stats){  
                    if(eror){  
                        console.warn('获取文件stats失败');  
                    }else{  
                        var isFile = stats.isFile();//是文件  
                        var isDir = stats.isDirectory();//是文件夹  
                        if(isFile){
                            // Get content from file
                             var contents = fs.readFileSync(filedir);
                            // Define to JSON type
                            var jsonContent = JSON.parse(contents);
                            var url = filename.split(/(?=[A-Z])/).join("/").replace('.json','').toLocaleLowerCase();
                            console.log(filename);
                            var options = { 
                                uri: serverUrl + '/initdataformock/' + url, 
                                method: 'POST', 
                                json: jsonContent
                              };
                            
                              request(options, function(error, response, body) {
                                  if (!error && response.statusCode == 200) {
                                      //输出返回的内容
                                      console.log(body);
                                  }
                              });
                            
                            // Get Value from JSON
                            console.log("User Name:", jsonContent.a);
                            console.log(filedir);  
                        }  
                        if(isDir){  
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件  
                        }  
                    }  
                })  
            });  
        }  
    });  
}
module.exports = {
    fileDisplay: fileDisplay
}
