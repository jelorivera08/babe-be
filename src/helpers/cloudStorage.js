const util = require("util");
const gc = require("../config/cloudStorage");
const bucket = gc.bucket("babe-photos"); // should be your bucket name

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadImage = (file, username) =>
  new Promise((resolve, reject) => {
    const { buffer } = file;
    const date = new Date();

    const blob = bucket.file(`${username}${date}.jpg`);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream
      .on("finish", () => {
        const publicUrl = util.format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      })
      .on("error", (err) => {
        reject(
          `Unable to upload image, something went wrong: ${JSON.stringify(err)}`
        );
      })
      .end(buffer);
  });

module.exports = uploadImage;
