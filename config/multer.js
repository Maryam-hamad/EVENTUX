const multer = require ('multer')
const path = require ('path')


 //create storage of the media
const storage = multer.diskStorage({
  destination: (req,res , cb) => {
    cb( null ," mediauploads/")
  },

  // creating unique file naming 
  filename :(req ,res ,cb) => {
    const extension = path.extname(file.originialName)//comming from FE
    const name = path.basename(file.originalname , extension)
    cb ( null ,`${name}-${new Date()}${extension}`)
  },

})

  //to avoid more error(uploding wrong file type) ...we create filter
  const fileFilter =(res, req, cb) =>{
    if(file.mimeType.startsWith('image/')){
      cb( null , true)
    }
    else{
      cb( new Error('Only images are Allowed'))
    }
      
  } 

  const upload = multer({
    storage,
    fileFilter,
    limits:{
      fileSize:1024 * 1024 * 5
    }
  })
  module.exports = upload;