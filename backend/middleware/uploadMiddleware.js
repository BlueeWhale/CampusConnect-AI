const multer =
require("multer");

const path =
require("path");

const fs =
require("fs");

// =============================
// CREATE UPLOADS FOLDER
// =============================

const uploadPath =
"path/to/uploads";

const realUploadPath =
path.join(
  __dirname,
  "../uploads"
);

// CREATE IF NOT EXISTS
if(
  !fs.existsSync(
    realUploadPath
  )
){

  fs.mkdirSync(
    realUploadPath,
    { recursive: true }
  );
}

// =============================
// STORAGE
// =============================

const storage =
multer.diskStorage({

  destination:
  (req, file, cb)=>{

    cb(
      null,
      realUploadPath
    );
  },

  filename:
  (req, file, cb)=>{

    cb(

      null,

      Date.now() +

      path.extname(
        file.originalname
      )

    );
  }

});

// =============================
// FILE FILTER
// =============================

const fileFilter =
(req, file, cb)=>{

  if(
    file.mimetype.startsWith(
      "image"
    )
  ){

    cb(null, true);

  }else{

    cb(
      new Error(
        "Only image files allowed"
      ),
      false
    );
  }
};

// =============================
// EXPORT
// =============================

module.exports =
multer({

  storage,
  fileFilter

});