# 传输优化
很多都需要在nginx下配置

## Gzip
学会用nginx配置gzip

## keep alive
对tcp链接的复用，http1.1开始是默认开启的配置

## HTTP缓存
Cache-control - expires
Etag - If-None-Match
Last-Modified - If-Modified-Since

问题：Cache-control和expires时间不一致怎么办
Cache-control: max-age=0
相当于no cache，每次都要查看缓存是否过期

## Service Workers
1. 加速重复访问
2. 离线支持

限制：
1. 延长了首屏时间，但页面总加载时间减少
2. 兼容性
3. 只能在localhost/https下使用

## HTTP2
1. 二进制传输 —— 安全 + 压缩
2. 请求/响应多路复用
3. server push

http2只能工作在https下，适用于请求量较高的情况