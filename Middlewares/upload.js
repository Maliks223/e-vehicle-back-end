const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  // fileFilter: (req, file, cb) => {
  //   console.log('upload');
  //   if (
  //     file.mimetype == "image/png" ||
  //     file.mimetype == "image/jpg" ||
  //     file.mimetype == "image/jpeg"
  //   ) {
  //     cb(null, true);
  //   } else {
  //     cb(null, false);
  //     return cb(
  //       new Error(
  //         "Image Type not allowed! Accepted types: .png, .jpg and .jpeg"
  //       )
  //     );
  //   }
  // },
});

module.exports = upload;
