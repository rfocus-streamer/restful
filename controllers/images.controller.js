/*******
* images.controller.js file - controllers
********/ 

const Joi = require('joi');
const fs = require('fs'); 
const path = require('path') 
const formidable = require('formidable'); 
const dotEnv = require('dotenv');
const { isProductExists, 
	    createImage,
	    updateImageDB,
	    getImages, 
	    getImageById,
      getImageByCategory,
      isIDExists,
	    deleteImage   
      } = require("../services/images.service");

const addImage = async (req, res, next) => {
       const product_id = req.headers["product_id"];
       const uploadDir = path.join(__dirname, '/..', '/'+ process.env.FILE_PATH +'/');
       let filepathdb = [];
       var form = new formidable.IncomingForm()
          form.multiples = true
          form.keepExtensions = true
          form.uploadDir = uploadDir
          form.parse(req, (err, fields, files) => {
            if (err) return res.status(500).json({ error: err })
          })
          form.on('fileBegin', function (name, file) {
            const [fileName, fileExt] = file.name.split('.')
            file.path = path.join(uploadDir, `${fileName}_${new Date().getTime()}.${fileExt}`)
            filepathdb.push(`${fileName}_${new Date().getTime()}.${fileExt}`)
          })

          form.on('end', function () {            
                if(ImgsaveToDB(filepathdb, product_id)){
                   res.status(200).json({
                    "success": true,
                    "message": "Image successfully added",
                    "data" : {"patch" : filepathdb}
                   });
                }else{
                   res.status(400).json({
                    "success": false,
                    "message": "Image not added",
                    "data" : {}
                   });
                }
          })
}

async function ImgsaveToDB(array, product_id) {
  for (const patch_el of array) {
    try{                        
        const image_data = {
                product_id : product_id,
                path : patch_el
        }

        let newImage = await createImage(image_data);

            if (!newImage) {
                array.forEach(img => { 
                    fs.unlink(__dirname+ '/../'+process.env.FILE_PATH +'/'+ img, function (err) {
                      if (err) {                                                 
                          console.error(err);                                    
                      }                                                                                    
                    });    
                });       
                return null;
            }
    } catch (error) { 
            array.forEach(img => { 
                fs.unlink(__dirname+ '/../'+process.env.FILE_PATH +'/'+ img, function (err) {       
                  if (err) {                                                 
                      console.error(err);                                    
                  }                                                                                    
                });    
            });  
        return null;           
    }
  }
  return true;
}

const updateImageData = async (req, res, next) => { 
       const product_id = req.headers["product_id"];
       const img_id = req.params.id;
       const uploadDir = path.join(__dirname, '/..', '/'+ process.env.FILE_PATH +'/');
       let filepathdb = [];
       var form = new formidable.IncomingForm()
          form.multiples = true
          form.keepExtensions = true
          form.uploadDir = uploadDir
          form.parse(req, (err, fields, files) => {
            if (err) return res.status(500).json({ error: err })
          })
          form.on('fileBegin', function (name, file) {
            const [fileName, fileExt] = file.name.split('.')
            file.path = path.join(uploadDir, `${fileName}_${new Date().getTime()}.${fileExt}`)
            filepathdb.push(`${fileName}_${new Date().getTime()}.${fileExt}`)
          })

          form.on('end', function () {   
            let img_update = ImgUpdateToDB(filepathdb, product_id, img_id);         
                if(img_update){
                   res.status(200).json({
                    "success": true,
                    "message": "Image successfully updated",
                    "data" : {"patch" : filepathdb}
                   });
                }else{
                   res.status(400).json({
                    "success": false,
                    "message": "Image not updated",
                    "data" : {}
                   });
                }
          })
}

async function ImgUpdateToDB(array, product_id, img_id) {
  for (const patch_el of array) {
    try{    
        let oldFile;                    
        const image_data = {
                product_id : product_id,
                path : patch_el
        }
      
        let oldimage = await getImageById(img_id);
        if (oldimage) {
            oldFile = oldimage.path;
        }
        let updateImage = await updateImageDB(img_id, image_data);
                if (!updateImage) {
                    array.forEach(img => { 
                       if (fs.existsSync(__dirname+ '/../'+process.env.FILE_PATH +'/'+ img)) {
                            fs.unlink(__dirname+ '/../'+process.env.FILE_PATH +'/'+ img, function (err) {        
                              if (err) {                                                 
                                  console.error(err);                                    
                              }                                                                                    
                            }); 
                        }   
                    });       
                    return null;
                }else{
                    if (fs.existsSync(__dirname+'/../'+process.env.FILE_PATH + '/' +oldFile)) {
                        fs.unlink(__dirname+'/../'+process.env.FILE_PATH + '/' +oldFile, function (err) {       
                            if (err) {                                                 
                                  console.error(err);                                    
                            }                                                                                    
                        });  
                    }
                }
    } catch (error) {
            array.forEach(img => { 
            if (fs.existsSync(__dirname+'/../'+process.env.FILE_PATH + '/' +img)) {
                fs.unlink(path.join(__dirname+ '/../'+process.env.FILE_PATH +'/'+ img), function (err) {       
                  if (err) {                                                 
                      console.error(err);                                    
                  }                                                                                    
                });    
            }
            });   
        return null;          
    }
  }
}

const getAllImages = async (req, res, next) => {
	try {
		return res.status(200).json({
			"success": true,
			'message': 'images fetched successfully',
	        'data': await getImages()
	    });
     } catch (error) {
        console.log(error)
        return res.status(500).json({
        	"success": false,
            'message': 'something went wrong, Please try again',
            'data': {}
        });
    }
}

const getImageId = async (req, res, next) => {
	try {
		let image =  await getImageById(req.params.id);
		if(image === null){
            return res.status(401).json({
            	"success": false,
      				'message': "image with id "+req.params.id+" does not exist",
      		    'data': {}
      		  });
		}else{
			return res.status(200).json({
				"success": true,
				'message': 'image fetched successfully',
		        'data': image
		    });
	    }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
        	"success": false,
            'message': 'something went wrong, Please try again',
            'data': {}
        });
    }
}

const getImageCategory = async (req, res, next) => {
    try {
        let imagesByCategory = await getImageByCategory(req.params.category);
        if(imagesByCategory === null){
            return res.status(401).json({
                "success": false,
                'message': "image with category "+req.params.category+" does not exist",
                'data': {}
            });
        }else{
            let allImages = []
            Object.values(await getImages()).forEach(img => {
                for (const key in img) { 
                    if(key == '_id'){
                        allImages.push(img);
                    }
                }
            });

            images_id = [];
            allImages.forEach(img => {
                var img_ids = JSON.parse(JSON.stringify(imagesByCategory.images))
                img_ids.forEach(id => {
                    if(id == img._id){
                        images_id.push(img)
                    }
                });
            });

            return res.status(200).json({
                "success": true,
                'message': 'images fetched successfully',
                'data': images_id
            });
        }
    } catch (error) {
        return res.status(500).json({
            "success": false,
            'message': 'something went wrong, Please try again',
            'data': {}
        });
    }
}

const deleteImageById = async (req, res, next) => {
	try {
        let oldimage = await getImageById(req.params.id);
        if (oldimage) {
            oldFile = oldimage.path;
        }
		let image = await deleteImage(req.params.id);
		if(image === null){
        return res.status(401).json({
            	"success": false,
				      'message': "image with id "+req.params.id+" does not exist",
		          'data': {}
		    });
		}else{
            if (fs.existsSync(__dirname+'/../'+process.env.FILE_PATH + '/' +oldFile)) {
                fs.unlink(__dirname+'/../'+process.env.FILE_PATH + '/' +oldFile, function (err) { 
                    if (err) {                                                 
                        console.error(err);                                    
                    }                                                                                    
                });  
            }
			return res.status(200).json({
				"success": true,
				'message': 'image successfully deletedy',
		    'data': {}
		    });
	    }
    } catch (error) {
        return res.status(500).json({
        	"success": false,
            'message': 'something went wrong, Please try again',
            'data': {}
        });
    }
}

module.exports = {
  addImage,
  updateImageData,
  getAllImages,
  getImageId,
  getImageCategory,
  deleteImageById
};