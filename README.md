[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)]()   [![NPM version](https://badge.fury.io/js/data-mock-send.svg)](https://npmjs.org/package/data-mock-send) 

# data-mock-send - 接口数据发送工具

配合 [data-mock-server](https://github.com/jonhal/data-mock-server) 使用效果更佳

## 功能特性

#### 强大功能
1. 本地mock数据自动上传 -- 一键讲项目中的数据配置到数据模拟服务器中

### 建议使用场景
1. 本地开发调试中，将mock数据文件放到项目文件中配合data-mock-send模块，实现异步请求的模拟

### 如何使用？
1. npm install data-mock-send
2. dataMockSend 传入两个参数第一个项目中存放mock文件的目录，第二个参数为data-mock-server服务器地址，不需要加initdataformock。
3. data-mock-server启动之后 使用可参考demo https://github.com/jonhal/data-mock-demo
### 我们还想做的
 1. 提供云服务端的数据模拟，不需要配置直接请求线上服务器
 2. 接口文档转换，根据文档格式自动配置mockmock数据
 3. 欢迎issue 或者发邮件simotophs@gmail.com
