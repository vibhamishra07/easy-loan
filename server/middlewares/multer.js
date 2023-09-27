import multer from "multer";
import path from 'path';


const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

const storageEngine = multer.diskStorage({
   destination: function (req, file, cb) {
        cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

export const upload = multer({
    storage: storageEngine,
    limits: {fileSize: 1000000},
    fileFilter(req, file, cb) {
        checkFileType(file, cb);
    }
});

