- HTTP (HyperText Transfer Protocal) 
    - It is the core of the Web application
    - It is implemented in two programs, client program and server program
    - Http defines the message format as well as the rule to transfer data btw client and server
    - In the Web page, it consists of many files, such as Web static page, base HTML file, media data....
    - The base HTML file refer their data with the object's URL
        - There are two parts in object URL 
            - the host name of server 
            - the object's pathname
    - It uses Tcp protocal as its underlying transport protocal

- HTTP is based on TCP protocal.
    - Important isssue : should each request/response pair be sent over a *seperate* process or should all of the requests and their corresponding responses be sent over the *same* TCP connection
    - *seperate connection* called non-persistent connections
    - *same connection* called persistent connection (**default**)
    - The ultilization of two methods has different execution time, we will discuss it later.

- HTTP has its own message formats.
    - There are two types of messages, request messages and response messages

### HTTP request message:
```HTTP
GET /chinese/ HTTP/1.1
Host: www.ntpu.edu.tw
User-Agent: curl/7.54.0
Accept: */*
```
    
Above example is one of the HTTP requests. There are four fields in one HTTP request.
    1. request line
    2. header line
    3. blank line
    4. body line
    
We are going to discuss those fields respectively except for blank line ( It just a line to split the body and request as well as header line.
    
1. Request Line
        Above example, the first line request message is request line, it consists of three fields,**method field,URL field and version field**, in it.
        - In the request field will tell the server which kind of request will be used. In this example, the client is going to get the infromation, so it used 'Get' method.
        
    - Some common methods used in request
        - GET -> retrieving
        - POST -> creating
        - PUT -> updating
        - DELETE -> removing
        - [More request Method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
    - In the URL field, the client will get the object from server by URL. In this example, the client request the object /chinese/
    - The version is self-explanatory object. In this example, the browser is implements HTTP/1.1
2. Header Line
    
    Above example, the subsequent lines in the request message are header line. There are many header field in the message.I am only going to discuss the example above.
    ```HTTP
    Host: www.ntpu.edu.tw
    User-Agent: curl/7.54.0
    Accept: */*
    ```
    We see the above section, it's part of the request message which is the HeaderLine. On the ***Host Line***, it specify the host on which object resides. The **User-Agent** specifies the the browser type which the request camefrom. Lastly, **Accept Line** means which types of data can be sent back from server.
        
    Nevertheless, above example explains the host is resided on www.ntpu.edu.tw, and we uses curl, a powerful command-line HTTP client that be used to send request by command line tools to a target server, to make request to server, and ```*/*``` means the client accept all the data to be received
    
    There are more fileds in the the [Wekpedia](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields), if you want to know them in more detail.
    
3. Body Line
    
    The body line, ordinarily, is used to send the data to a server. For example, you could fill up some form on the website. When you click the 'submit' button, it means the ***POST*** method is used, and the content you wrote will be embedded in body line and transfer to the server to record the context. 
        
    Above example, because you don't use ***POST***, so you don't have body line from request message.
   
### HTTP Response Message

When you make a http request, you will return the message from the remote server. Below message is an example for http response message. We are going to discuss the response message.
```
HTTP/1.1 200 OK
Date: Thu, 01 Mar 2018 10:24:22 GMT
Server: Apache
X-Powered-By: PHP/4.4.7
Set-Cookie: PHPSESSID=5dc4703bb9fb03359356c23ad8cd22a8 ; httpOnly
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0
Pragma: no-cache
Set-Cookie: is_count_0=yes; expires=Thu, 01 Mar 2018 11:24:22 GMT
Transfer-Encoding: chunked
Content-Type: text/html
data......
data......
data......
(HTML code)
```
In the HTTP Response message, we have three different sections:
- **Status Line**
- **Header Line**
- **Entity Body**

**1. Status Line**

On the first line of the response, ```HTTP/1.1 200 OK```,is the status line. **It contains three fields- protocal version field, status code field, and a satus message.** In the example, it indicates the server use the HTTP/1.1 protocal, the status code is 200, and the status messages is "OK"

When client sends a request, it has different situations when handling the reuqest message, so there are many status code from the server if it were sent the data.Some usual status codes we use are below.

- **200 OK:** Sending the request successfully and the response is returned.
- **301 Moved Permanently:** the reqeust has been changed, and it will redirect a new link automatically.
- **400 Bad Request:** this is a generic error code indicating server is unable to sovle the request
- **404 Not Found:** the request doen't exist or cannot be found by server
- **505 HTTP VERSION NOT SUPPORT:** the http version in the request message cannot support by server.

**2. Header Line**

Above example, there are ten types in the header line. The detail codes are below.

```
Date: Thu, 01 Mar 2018 10:24:22 GMT
Server: Apache
X-Powered-By: PHP/4.4.7
Set-Cookie: PHPSESSID=5dc4703bb9fb03359356c23ad8cd22a8 ; httpOnly
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0
Pragma: no-cache
Set-Cookie: is_count_0=yes; expires=Thu, 01 Mar 2018 11:24:22 GMT
Transfer-Encoding: chunked
Content-Type: text/html
```
The data stored in header line is stored in key-value style. Let's look in detail and learn fields in each line.

The ***Date*** field indicates the time and date when the server send the response. The ***Server*** field tells the message was generated by an Apache Web Server. In ***X-Powered-By*** field, it is non-standard format, so we don't discuss it now. In ***Set-Cookie*** field, it send the cookies from the server to user client. The ***Cache-Control*** field is a directive for cache mechanism in request and response, and the direction may be different in request and response. The ***Expires*** contains the date/time after which the response is consider stale. ***Content-Type*** field is use to give us the information about the type of the resource.

3. Entity Body
For each response, the body is the message we send. For the example, the server sent the html code to the client. We know it is the html code because of the content-type fields in header line. Sometimes, the server may send the plain text.

## Conclusion

For this passage, at first we talk about some introduction in **HTTP protocal**,**basic http request and response format** , HTTP is one of example using in TCP protocal. When we make a request, there are four method mostly use in usual- GET,POST,PUT,and DELETE.We know some url and verison use in make a request. In response message, we know frequest-used status code when making a response. There are many kinds of fields using in field line. Last, we will send either html code or plain text to respond the request. 


---

- HTTP request method verbs
    - GET -> retrieving
    - POST -> creating
    - PUT -> updating
    - DELETE -> removing
- **cURL** is a powerful command-line HTTP client that can be used to send requests to a target server 
