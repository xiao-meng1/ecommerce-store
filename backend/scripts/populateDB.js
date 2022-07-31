#! /usr/bin/env node

require('dotenv').config({ path: '../.env' });
const fs = require('fs');
const mongoose = require('mongoose');
const async = require('async');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection.useDb('store_data_test');
db.on('error', () => {
  console.error('MongoDB connection error:');
});

// GridFS
const bucket = new mongoose.mongo.GridFSBucket(db, {
  bucketName: 'product_images',
});

// function uploadImage(cb) {
//   try {
//     const readStream = fs.createReadStream(
//       '../data/images/108044-switch-super-smash-bros-ultimate-can-1200x675.jpg'
//     );
//     const uploadStream = bucket.openUploadStream(
//       '108044-switch-super-smash-bros-ultimate-can-1200x675.jpg',
//       {
//         chunkSizeBytes: 1048576,
//         metadata: { game: 'Super Smash Bros. Ultimate' },
//       }
//     );
//     readStream.pipe(uploadStream).on('finish', () => {
//       cb(null, uploadStream.id);
//     });
//   } catch (error) {
//     cb(err, null);
//   }
// }

// // Download
// function downloadImage(id, cb) {
//   try {
//     bucket
//       .openDownloadStreamByName(
//         '108044-switch-super-smash-bros-ultimate-can-1200x675.jpg'
//       )
//       .pipe(fs.createWriteStream('./outputFile.jpg'))
//       .on('finish', () => {
//         cb(null);
//       });
//   } catch (error) {
//     cb(err, null);
//   }
// }

// function uploadThenDownloadImage(cb) {
//   async.waterfall([uploadImage, downloadImage], function (err, results) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(results);
//     }
//   });
// }

function uploadProduct(cb) {
  async.waterfall(
    [
      function uploadToGridFS(cb) {
        try {
          const readStream = fs.createReadStream(
            '../data/images/108044-switch-super-smash-bros-ultimate-can-1200x675.jpg'
          );
          const uploadStream = bucket.openUploadStream(
            '108044-switch-super-smash-bros-ultimate-can-1200x675.jpg',
            {
              chunkSizeBytes: 1048576,
              metadata: { game: 'Super Smash Bros. Ultimate' },
            }
          );
          readStream.pipe(uploadStream).on('finish', () => {
            cb(null, uploadStream.id);
          });
        } catch (error) {
          cb(err, null);
        }
      },
      function uploadDocument(imageId, cb) {
        try {
        } catch (error) {
          cb(err, null);
        }
      },
    ],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
}

uploadThenDownloadImage();
console.log('test');
