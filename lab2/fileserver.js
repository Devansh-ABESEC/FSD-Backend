import fs from "node:fs/promises";
const filePath = "data.txt";

async function createFile(content)  {
    try{
        await fs.writeFile(filePath , content , "utf8");
        console.log("File Created Successfully!");
    }catch(err){
        console.error("Error created file: ", err);
    }
}

async function readFile()  {
   try{ const data = await fs.readFile(filePath , "utf8");
    console.log("File Content:\n ", data);
    return data;
}
catch(err){
    if(err.code === "ENOENT"){
        console.error("File not found!");
    }
    console.error("Error reading file: ", err);
}
}
function UpdateFile()  {

}
function deleteFile()  {

}
await createFile("WelCome to backend");
await readFile();