import http from "http";
const userData =[{
    id : 101 ,
    name : "Abc" ,
    email : "cm@abes.call.in" 
}]
const server=http.createServer((req,res)=>{
    //   res.statusCode=201;
    //   res.setHeader("Content-type","text/plane");
    //   res.end("Hello Serever.")
    const url=req.url;
    const method=req.method;
    if(url=="/msg" && method == "GET"){
        res.end("This is welcome message from server");
    }
    else if(url=="/sys" && method == "GET"){
        res.end("This is system information");
    }
    else if (url =="/data" && method =="GET") {
        res.end(JSON.stringify(userdata)) ;
    } else if (url=="/create" && method=="POST") {
        let body = "" ;
        req.on("data",(chunk)=>{
            body += chunk ;
        })
        req.on("end",()=> {
          const newData =JSON.parse(body) ;
          const newuserData = {
            id : newData.id ,
            name:newData.name,
            email:newData.email
          }  
          userData.push(newuserData)
          res.end("")
        })
    }else if (url=="/users" && method == "GET") {
        res.end(JSON.stringify(userData)) ;
    }else if (url.startsWith("/users/") && method =="GET") {
        const id = url.split("/")[2] ;
        console.log(id) ;
        const user = userData.find((u) => u.id == id) ;
        if (!user){
            return res.end("User Not found ") ;
        }
        res.end(JSON.stringify(user));
    }
})
server.listen(4000,()=>{
    console.log("Server is running on port number 4000");
})