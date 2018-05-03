#!/usr/bin/env node
'use strict';
var fs = require("fs");
var path = require('path');  
var request = require('request');
var argv = require('yargs').argv;
var chokidar = require('chokidar');


function getAdress() {
    var os = require('os');
    var ifaces = os.networkInterfaces();
    var address;
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
            if (iface.address) {
                address = iface.address;
                return address;
            }

            // if (alias >= 1) {
            // // this single interface has multiple ipv4 addresses
            //     address = iface.address;
            //     // console.log(ifname + ':' + alias, iface.address);
            //     // return address;
            // } else {
            // // this interface has only one ipv4 adress
            //     address = iface.address;
            //     // console.log(ifname, iface.address);
            //     // return address;
            // }
            ++alias;
        });

    });       
    return address;
}

function dataMockSend(filePath, serverUrl){
    let address = getAdress().replace(/\./g,"");
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
                                uri: serverUrl + '/' + address + '/initdataformock/' + url, 
                                method: 'POST', 
                                json: jsonContent
                              };
                            
                            //   console.log(uri);
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
                            dataMockSend(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件  
                        }  
                    }  
                })  
            });  
        }  
    });  

}

if (argv.path && argv.serverUrl) {
    chokidar.watch(argv.path, {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
        dataMockSend(argv.path, argv.serverUrl);
    });
    console.log('send');
}
else if(!argv.path){
    console.log('pleae write path');
} else if (!argv.serverUrl){
    console.log('pleae write serverUrl');
}else 
    console.log('no error but cannote run');{
}