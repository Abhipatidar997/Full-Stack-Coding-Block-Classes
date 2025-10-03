// SDK initialization

const ImageKit = require("imagekit");
const config = require("../config/config");

var imagekit = new ImageKit({
  publicKey: config.imageKit_public_key,
  privateKey: config.imageKit_private_key,
  urlEndpoint: "https://ik.imagekit.io/dt5roofaq",
});

async function upload(profile) {
  
  const result = await imagekit.upload(
    {
      file: profile.buffer ,
      fileName: profile.originalname,
      isPrivateFile : false,
      isPublished : true
     
    },
 
  );

  return result

}

module.exports = upload;
