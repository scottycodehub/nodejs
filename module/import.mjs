import { writeFileSync, readFileSync, appendFileSync } from 'fs'; 
  
let data = "This is a file containing a collection"
           + " of programming languages.\n"
 + "1. C\n2. C++\n3. Python"; 
  
writeFileSync("programming.txt", data); 
appendFileSync("programming.txt", "\n4. Nodejs is cool too!"); 
console.log("File written successfully\n"); 
console.log("The written has the following contents:"); 
console.log(readFileSync("programming.txt", "utf8")); 
