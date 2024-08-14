'use client';

import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

interface UploadedFile {
  Key: string;
}

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadLink, setUploadLink] = useState<string | null>(null);
  const [permanentLink, setPermanentLink] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [allFiles, setAllFiles] = useState<AWS.S3.ObjectList | undefined>(
    undefined,
  );
  const [buckets, setBuckets] = useState<AWS.S3.Bucket[] | undefined>(
    undefined,
  );

  const ACCESSKEY = process.env.LIARA_ACCESS_KEY;
  const SECRETKEY = process.env.LIARA_SECRET_KEY;
  const ENDPOINT = 'https://storage.iran.liara.space';
  const BUCKET = process.env.LIARA_BUCKET_NAME;

  const fetchBuckets = async () => {
    const s3 = new AWS.S3({
      accessKeyId: ACCESSKEY,
      secretAccessKey: SECRETKEY,
      endpoint: ENDPOINT,
      s3ForcePathStyle: true, // Ensure to set s3ForcePathStyle for custom endpoints
    });
    try {
      const response = await s3.listBuckets().promise();
      setBuckets(response.Buckets);
    } catch (error) {
      console.error('Error fetching buckets: ', error);
    }
  };

  const fetchAllFiles = async () => {
    const s3 = new AWS.S3({
      accessKeyId: ACCESSKEY,
      secretAccessKey: SECRETKEY,
      endpoint: ENDPOINT,
      s3ForcePathStyle: true, // Ensure to set s3ForcePathStyle for custom endpoints
    });

    try {
      const response = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
      setAllFiles(response.Contents);
    } catch (error) {
      console.error('Error fetching files: ', error);
    }
  };

  useEffect(() => {
    fetchBuckets();
    fetchAllFiles();
  }, [uploadLink]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    setError(null);
    setUploadLink(null);
    setPermanentLink(null);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        setError('Please select a file');
        return;
      }

      const s3 = new AWS.S3({
        accessKeyId: ACCESSKEY,
        secretAccessKey: SECRETKEY,
        endpoint: ENDPOINT,
        s3ForcePathStyle: true, // Ensure to set s3ForcePathStyle for custom endpoints
      });

      const params = {
        Bucket: BUCKET,
        Key: file.name,
        Body: file,
      };

      const response = await s3.upload(params).promise();
      const signedUrl = s3.getSignedUrl('getObject', {
        Bucket: BUCKET,
        Key: file.name,
        Expires: 3600,
      });

      setUploadLink(signedUrl);

      // Get permanent link
      const permanentSignedUrl = s3.getSignedUrl('getObject', {
        Bucket: BUCKET,
        Key: file.name,
        Expires: 31536000, // 1 year
      });
      setPermanentLink(permanentSignedUrl);

      // Update list of uploaded files
      setUploadedFiles((prevFiles) => [...prevFiles, { Key: file.name }]);

      // Update list of all files
      fetchAllFiles();

      console.log('File uploaded successfully');
    } catch (error) {
      setError('Error uploading file: ' + error.message);
    }
  };

  const handleShowFiles = () => {
    console.log('List of uploaded files:', uploadedFiles);
  };

  const handleDeleteFile = async (file: UploadedFile) => {
    try {
      const s3 = new AWS.S3({
        accessKeyId: ACCESSKEY,
        secretAccessKey: SECRETKEY,
        endpoint: ENDPOINT,
        s3ForcePathStyle: true, // Ensure to set s3ForcePathStyle for custom endpoints
      });

      await s3.deleteObject({ Bucket: BUCKET, Key: file.Key }).promise();

      // Update the list of uploaded files
      setUploadedFiles((prevFiles) =>
        prevFiles.filter((uploadedFile) => uploadedFile.Key !== file.Key),
      );

      // Update list of all files
      fetchAllFiles();

      console.log('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file: ', error);
    }
  };

  return (
    <div className='upload-container'>
      <h1>Upload File to S3</h1>
      <input type='file' onChange={handleFileChange} />
      <button className='upload-button' onClick={handleUpload} disabled={!file}>
        Upload
      </button>
      {uploadLink && (
        <h3 className='success-message'>
          File uploaded successfully. Temporary Link:{' '}
          <a href={uploadLink} target='_blank' rel='noopener noreferrer'>
            Temporary Link
          </a>
        </h3>
      )}
      {permanentLink && (
        <h3 className='success-message'>
          Permanent Link:{' '}
          <a href={permanentLink} target='_blank' rel='noopener noreferrer'>
            Permanent Link
          </a>
        </h3>
      )}
      <button className='show-files-button' onClick={handleShowFiles}>
        Show Uploaded Files
      </button>
      {uploadedFiles.length > 0 && (
        <div>
          <h2>Uploaded Files:</h2>
          <ul>
            {uploadedFiles.map((uploadedFile) => (
              <li key={uploadedFile.Key}>
                {uploadedFile.Key}{' '}
                <a
                  href={new AWS.S3({
                    accessKeyId: ACCESSKEY,
                    secretAccessKey: SECRETKEY,
                    endpoint: ENDPOINT,
                    s3ForcePathStyle: true,
                  }).getSignedUrl('getObject', {
                    Bucket: BUCKET,
                    Key: uploadedFile.Key,
                    Expires: 3600,
                  })}
                  download
                >
                  Download
                </a>{' '}
                <button onClick={() => handleDeleteFile(uploadedFile)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {allFiles && allFiles.length > 0 && (
        <div>
          <h2>All Files:</h2>
          <ul>
            {allFiles.map((file) => (
              <li key={file.Key}>
                {file.Key}{' '}
                <a
                  href={new AWS.S3({
                    accessKeyId: ACCESSKEY,
                    secretAccessKey: SECRETKEY,
                    endpoint: ENDPOINT,
                    s3ForcePathStyle: true,
                  }).getSignedUrl('getObject', {
                    Bucket: BUCKET,
                    Key: file.Key,
                    Expires: 3600,
                  })}
                  download
                >
                  Download
                </a>{' '}
                <button onClick={() => handleDeleteFile(file)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <p className='error-message'>{error}</p>}
      <div>
        <h2>Buckets:</h2>
        <ul>
          {buckets &&
            buckets.length > 0 &&
            buckets.map((bucket) => <li key={bucket.Name}>{bucket.Name}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default Upload;
