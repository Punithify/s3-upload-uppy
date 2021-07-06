import aws from "aws-sdk";
const bucket = process.env.AWS_BUCKET_NAME;

aws.config.update({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
  signatureVersion: "v4",
  region: process.env.AWS_REGION,
});

const s3 = new aws.S3();

export default function handler(req, res) {
  const params = {
    Bucket: bucket,
    Key: `${req.body.filename}`,
    ContentType: req.body.contentType,
  };

  try {
    s3.getSignedUrl("putObject", params, (err, url) => {
      return res.status(200).json({
        method: "put",
        url,
        fields: {},
      });
    });
  } catch (error) {
    res.status(500).json({ err: "something went wrong" }).end();
    
  }
}
export const config = {
  api: {
    externalResolver: true,
  },
}