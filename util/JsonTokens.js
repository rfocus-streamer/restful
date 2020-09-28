/*******
* JsonTokens.js file - util
********/ 
 const fs = require('fs');

async function append_jsondata(filename, data){
    if (fs.existsSync(filename)) {
        read_data = await readJsonFile(filename)
        if (read_data == false) {
            console.log('not able to read json file')
        }else{
            read_data.push(data)
            dataWrittenStatus = await writeJsonFile(filename, read_data)
            if (dataWrittenStatus == true) {
              console.log('data added successfully')
            }else{
              console.log('data adding failed')
            }
        }
    }else{
        dataWrittenStatus = await writeJsonFile(filename, [data])
        if (dataWrittenStatus == true) {
            console.log('data added successfully')
        }else{
            console.log('data adding failed')
        }
    }
}

   async function readJsonFile(filePath){
      try {
        const data = await fs.promises.readFile(filePath, 'utf8')
        return JSON.parse(data)
      }
     catch(err) {
         return false;
      }
    }

    async function writeJsonFile(filename ,writedata){
      try {
          await fs.promises.writeFile(filename, JSON.stringify(writedata,null, 4), 'utf8');
          return true
      }
      catch(err) {
          return false
      }
    }

module.exports = {
  append_jsondata,
  readJsonFile,
};
