const upload = require ('../config/multer')

module.export = upload.single("image")   //for multiple upload use upload.array
