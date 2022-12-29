const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req, file);

    // setup thư mục mà file sẽ được lưu vào
    cb(null, "./static/");
  },
  filename: (req, file, cb) => {
    // Override filename để tránh trường hợp cùng 1 thời điểm có 2 hoặc nhiều files cùng tên được upload
    const prefix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, `${prefix}-${file.originalname}`);
  },
});

// Cách 1
// module.exports = multer({ storage });

// Cách 2
const upload = multer({ storage });
module.exports = upload;
