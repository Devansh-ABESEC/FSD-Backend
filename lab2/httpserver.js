// import http from "http";
// const server=http.createServer((req,res)=>{
//     // res.end("hello server");
//     const url=req.url;
//     const method=req.method;
//     if(url=='/msg' && method=="GET"){
//         res.end("this is welcome message from server");
//     }
//     else if (url=='/sys' && method=="POST"){
//         res.statusCode=201;
//         res.end("this is system message from server");
//     }
//     else if(url=='/data' && method=="GET"){
//         res.end("this is data message from server");
//     }
// });
// server.listen(3000,()=>{
//     console.log("server is running on port number 3000");
// });
import http from "http";
const userdata = [{
    id : 1,
    name : "cm",
    email : "m@abes.ac.in"
}]
const server = http.createServer((req,res)=>{

    res.end("Hello Server");
    const url=req.url;
    const method=req.method;
    if(url=="/msg" && method == "GET"){
        res.end("this is welcome message from server");

    }
    else if(url="/sys" && method=="GET"){
        res.end("This is sysytem information ");
    }
    else if(url == "/data" && method == "GET"){
        res.statusCose = 201;
        res.end(json.stringify(userdata));
    }

});
server.listen(3005,()=>{
    console.log("server is running on port number 3000");
});