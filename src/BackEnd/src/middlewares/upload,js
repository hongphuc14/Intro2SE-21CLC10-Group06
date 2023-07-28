const multer = require('multer');
const storage = multer.diskStorage({
    //d/n đường dẫn lưu file
    destination: (req, file, cb)=>{
        cb(null, process.cwd() + "/public/img")
    },
    // đổi tên file khi upload (trước khi lưu file)
    filename: (req, file, cb)=>{
        let fileName = Date.now() + "_" + file.originalname;
        cb(null, fileName);
    }
})
const upload = multer({ storage });

module.exports = {upload}