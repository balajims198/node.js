
import fs from'fs'
console.log(fs);

fs.writeFile("fileusage.js","console.log('read')",(err)=>{
  
 if(err){
    console.log('Error',err.message); 
 }

 console.log("Succfully done");
 


})
fs.writeFile("filecreate.js","console.log('file was create')",(err)=>{
  
 if(err){
    console.log('Error',err.message); 
 }

 console.log("Succfully done");
 


})



