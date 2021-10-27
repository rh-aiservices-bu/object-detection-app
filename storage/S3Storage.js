const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

const S3_API_VERSION = "2006-03-01";

class S3Storage {
  constructor(s3Endpoint, s3Bucket, s3Prefix, s3AccessKeyId, s3SecretAccessKey) {
    this.s3Endpoint = s3Endpoint;
    this.s3Bucket = s3Bucket;
    this.s3Prefix = s3Prefix;
    this.s3AccessKeyId = s3AccessKeyId;
    this.s3SecretAccessKey = s3SecretAccessKey;

    this.s3 = new AWS.S3({
      apiVersion: S3_API_VERSION,
      endpoint: s3Endpoint,
      accessKeyId: s3AccessKeyId,
      secretAccessKey: s3SecretAccessKey,
    });
  }

  async _fileExists(fileKey) {
    try {
      await this.s3
        .headObject({
          Bucket: this.s3Bucket,
          Key: fileKey,
        })
        .promise();
      return true;
    } catch (error) {
      if (error.statusCode === 404) {
        return false;
      } else {
        throw error;
      }
    }
  }

  fileExists(filePath) {
    return this._fileExists(path.join(this.s3Prefix, filePath));
  }

  listObjects(prefix, maxKeys = 1000) {
    return this.s3
      .listObjects({
        Bucket: this.s3Bucket,
        Prefix: prefix,
        MaxKeys: maxKeys,
      })
      .promise();
  }

  ls(fileDir, maxKeys = 1000) {
    return this.listObjects(path.join(this.s3Prefix, fileDir, "/"), maxKeys);
  }

  _deleteFile(fileKey) {
    return this.s3
      .deleteObject({
        Bucket: this.s3Bucket,
        Key: fileKey,
      })
      .promise();
  }

  deleteFile(filePath) {
    return this._deleteFile(path.join(this.s3Prefix, filePath));
  }

  async deleteDir(fileDir) {
    const files = await this.ls(fileDir);

    return this.s3
      .deleteObjects({
        Bucket: this.s3Bucket,
        Delete: {
          Objects: files.Contents.map((x) => ({ Key: x.Key })),
          Quiet: false,
        },
      })
      .promise();
  }

  _putObject(fileKey, fileObject) {
    return this.s3
      .putObject({
        Bucket: this.s3Bucket,
        Key: fileKey,
        Body: fileObject,
      })
      .promise();
  }

  _readFile(src) {
    return new Promise((resolve, reject) => {
      fs.readFile(src, (error, fileContent) => {
        if (error) {
          reject(error);
        } else {
          resolve(fileContent);
        }
      });
    });
  }

  writeFile(fileContent, dest) {
    let fileKey = path.join(this.s3Prefix, dest);
    return this._putObject(fileKey, fileContent);
  }

  async uploadFile(src, dest) {
    let fileContent = await this._readFile(src);
    return this.writeFile(fileContent, dest);
  }

  writeJson(filePath, jsObject) {
    let dest = path.join(this.s3Prefix, filePath);
    return this._putObject(dest, JSON.stringify(jsObject));
  }

  async _readJson(fileKey) {
    let result;

    const readPromise = this.s3
      .getObject({
        Bucket: this.s3Bucket,
        Key: fileKey,
      })
      .promise();

    result = await readPromise;
    return JSON.parse(result.Body.toString());
  }

  readJson(filePath) {
    return this._readJson(path.join(this.s3Prefix, filePath));
  }

  async readJsonDir(fileDir) {
    const jsonRe = /.*\.json$/;
    const files = await this.ls(fileDir);
    let readPromises = [];

    files.Contents.forEach(({ Key }) => {
      if (jsonRe.test(Key)) {
        readPromises.push(this._readJson(Key));
      }
    });

    return Promise.all(readPromises);
  }
}

module.exports = S3Storage;
