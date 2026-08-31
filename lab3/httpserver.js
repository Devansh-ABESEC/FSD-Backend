import http from "http";
const server=http.createServer((req,res)=>{
    const url=req.url;
    const method=req.method;
    const userdata = [ {
         id: 1,
         name: "abc",
         email: "abcd@email.com", 
        }     
    ];
    if(url=='/msg' && method=='GET'){
        res.end("this is welcome messege from server");
    }
    else if(url=='/sys' && method=='GET'){
        res.end("This is system information");
    }
    else if (url == "/data" && method == "GET") {
    res.statusCode = 201;
    res.end(JSON.stringify(userdata));
    }
});
    
//    res.statusCode=201;
//    res.setHeader("content-Type","text/plain")
//    res.end("Hello Server");

server.listen(3000,()=>{
    console.log("Server is running on port 3000");
});