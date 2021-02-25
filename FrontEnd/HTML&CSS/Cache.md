# 缓存

### 学习目标
- **了解几种缓存的机制、作用、区别、优点、缺陷**

### Cookie & Session
会话跟踪是Web程序中常用的技术，用来跟踪用户的整个会话。常用的会话跟踪技术是Cookie与Session。  

Cookie通过在客户端记录信息确定用户身份，Session通过在服务器端记录信息确定用户身份。

#### 1. Cookie
由于HTTP是一种无状态的协议，服务器单从网络连接上无从知道客户身份。怎么办呢？  

**就给客户端们颁发一个通行证吧，每人一个，无论谁访问都必须携带自己通行证。这样服务器就能从通行证上确认客户身份了。这就是Cookie的工作原理。**  
（cookie - 客户端携带信息）

Cookie实际上是一小段的文本信息。客户端请求服务器，如果服务器需要记录该用户状态，就使用response向客户端浏览器颁发一个Cookie。客户端浏览器会把Cookie保存起来。当浏览器再请求该网站时，浏览器把请求的网址连同该Cookie一同提交给服务器。服务器检查该Cookie，以此来辨认用户状态。服务器还可以根据需要修改Cookie的内容。

**http-only可以阻止js读写cookie**

**cookie的大小限制在4kb左右**

#### 2. Session
Session是服务器端使用的一种记录客户端状态的机制，使用上比Cookie简单一些，相应的也增加了服务器的存储压力。

**如果说Cookie机制是通过检查客户身上的“通行证”来确定客户身份的话，那么Session机制就是通过检查服务器上的“客户明细表”来确认客户身份。Session相当于程序在服务器上建立的一份客户档案，客户来访的时候只需要查询客户档案表就可以了。**

虽然Session保存在服务器，对客户端是透明的，它的正常运行**仍然需要客户端浏览器的支持**。这是因为Session需要使用Cookie作为识别标志。  

HTTP协议是无状态的，Session不能依据HTTP连接来判断是否为同一客户，因此服务器向客户端浏览器发送一个名为JSESSIONID的Cookie，它的值为该Session的id（也就是HttpSession.getId()的返回值）。Session依据该Cookie来识别是否为同一用户。

### SessionStorage && LocalStorage
两者统称为Web Storage，它可以在客户端本地存储数据，类似cookie。

与cookie的区别

1.cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。

2.存储大小限制
- cookie数据不能超过4k，同时因为每次Http请求都会携带cookie，所以cookie只适合保存很小的数据
- web storage大小可以达到5M


3.数据有效期不同
- cookie在设置的有效期（服务端设置）内有效，不管窗口或者浏览器是否关闭
- sessionStorage仅在当前浏览器窗口关闭前有效（刷新页面或进入同源另一页面，数据仍然存在）
- localStorage始终有效


