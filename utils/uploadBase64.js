// const { v4: uuidv4 } = require("uuid");
// const bucket = require("../firebase/firebaseAdmin");
// const sharp = require("sharp");

// const uploadFile = async (fileBase64, isArray) => {
//   if (isArray) {
//     const files = [];
//     for (let i = 0; i < fileBase64.length; i++) {
//       const fileContent = Buffer.from(
//         fileBase64[i].replace(/^data:image\/\w+;base64,/, ""),
//         "base64"
//       );
//       const fileName = `${uuidv4()}.jpg`;
//       const file = bucket.file(fileName);
//       const compressed = await sharp(fileContent)
//         .png({ quality: 100 })
//         .toBuffer();

//       await file.save(compressed, {
//         metadata: { contentType: "image/jpeg" },
//         public: true,
//       });

//       const fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
//       files.push(fileUrl);
//     }
//     return files;
//   }

//   const fileContent = Buffer.from(
//     fileBase64.replace(/^data:image\/\w+;base64,/, ""),
//     "base64"
//   );
//   const fileName = `${uuidv4()}.jpg`;
//   const file = bucket.file(fileName);
//   const compressed = await sharp(fileContent).png({ quality: 100 }).toBuffer();

//   await file.save(compressed, {
//     metadata: { contentType: "image/jpeg" },
//     public: true,
//   });

//   const fileUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
//   return fileUrl;
// };

// module.exports = uploadFile;

const { v4: uuidv4 } = require("uuid");
const bucket = require("../firebase/firebaseAdmin");
const sharp = require("sharp");

const processFile = async (fileBase64) => {
  const fileContent = Buffer.from(
    fileBase64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const fileName = `${uuidv4()}.jpg`;
  const file = bucket.file(fileName);
  const compressed = await sharp(fileContent).png({ quality: 100 }).toBuffer();

  await file.save(compressed, {
    metadata: { contentType: "image/jpeg" },
    public: true,
  });

  return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
};

const uploadFile = async (fileBase64, isArray) => {
  if (isArray) {
    const filePromises = fileBase64.map(processFile);
    return Promise.all(filePromises);
  }
  return processFile(fileBase64);
};

module.exports = uploadFile;
