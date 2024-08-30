// backend/utils/wasabiUpload.js
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.WASABI_ACCESS_KEY,
  secretAccessKey: process.env.WASABI_SECRET_KEY,
  region: process.env.WASABI_REGION || 'us-east-1',
  endpoint: process.env.WASABI_ENDPOINT || 'https://s3.wasabisys.com',
  s3ForcePathStyle: true,
});

exports.uploadToWasabi = async (file) => {
  console.log('Uploading file to Wasabi:', file.name);
  console.log('Wasabi configuration:', {
    accessKeyId: process.env.WASABI_ACCESS_KEY ? '****' : 'undefined',
    secretAccessKey: process.env.WASABI_SECRET_KEY ? '****' : 'undefined',
    region: process.env.WASABI_REGION || 'us-east-1',
    endpoint: process.env.WASABI_ENDPOINT || 'https://s3.wasabisys.com',
  });
  
  const params = {
    Bucket: process.env.WASABI_BUCKET,
    Key: `${Date.now()}_${file.name}`,
    Body: file.data,
    ContentType: file.mimetype,
  };

  try {
    const result = await s3.upload(params).promise();
    console.log('File uploaded successfully. Location:', result.Location);
    return result.Location;
  } catch (error) {
    console.error('Error uploading to Wasabi:', error);
    throw error;
  }
};