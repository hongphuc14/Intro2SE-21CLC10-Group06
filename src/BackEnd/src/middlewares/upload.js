const multer = require('multer');

const storage = (folderName) => multer.diskStorage({
    //d/n đường dẫn lưu file
    destination: (req, file, cb)=>{
        //cb(null, process.cwd() + "/public/admin_avatar");
        cb(null, process.cwd() + "/public/" + folderName);
    },
    // đổi tên file khi upload (trước khi lưu file)
    filename: (req, file, cb)=>{
        let fileName = Date.now() + "_" + file.originalname;
        cb(null, fileName);
    }
})

//const upload = multer({ storage });
const upload = (folderName) => multer({
    storage: storage(folderName)
});

module.exports = {upload}
