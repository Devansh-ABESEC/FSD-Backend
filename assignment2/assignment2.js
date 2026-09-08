import http from "http";
const userdata = [{
    id : 1,
    name : "cm",
    email : "c.m@abes.ac.in"
}];
const server = http.createServer((req,res)=>{
   // res.end("Hello Server");
    const url=req.url;
    const method=req.method;
    if(url=="/msg" && method == "GET"){
        res.end("this is welcome message from server");
    }
    else if(url=="/sys" && method=="GET"){
        res.end("This is sysytem information ");
    }
    else if(url == "/data" && method == "GET"){
        res.statusCode = 201;
        res.end(JSON.stringify(userdata));
    }
    else if(url == "/create" && method == "POST"){
        let body = " ";
        req.on("data" , (chunk)=>{
            body += chunk;
        });
        req.on("end" , ()=>{
            const newdata = JSON.parse(body);
            const newUserdata={
                id : newdata.id,
                name : newdata.name,
                email : newdata.email
            }
            userdata.push(newUserdata);
            res.end("data created successfully");
        })   
    }
    else if(url.startsWith("/users") && method == "GET"){
        const id = url.split("/")[2];
        console.log(id);
        const user = userdata.find((u) => u.id == id);
        if(!user){
            return res.end("user not found");
        }
        res.end(JSON.stringify(user));
    } 
});
server.listen(4000,()=>{
    console.log("server is running on port number 4000");
});