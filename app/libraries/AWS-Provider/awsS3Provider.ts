import AWS from 'aws-sdk';
export class AwsS3Provider {
  private s3: any;
  constructor() {
    this.s3 = new AWS.S3({
      region: process.env.AWS_REGION || 'ap-south-1',
      accessKeyId: process.env.AWS_KYC_TEXTRACT_ACCESS_KEY,
      secretAccessKey: process.env.AWS_KYC_TEXTRACT_SECRET_KEY,
    });
  }

  public getSignedUrl = async (params: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      this.s3.getSignedUrl('getObject', params, (err, url) => {
        if (err) reject(err);
        resolve(url);
      });
    });
  };
}
