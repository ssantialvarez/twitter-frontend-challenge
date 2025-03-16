import axios from "axios";

export const S3Service = {
  upload: async (file: File, url: string) => {
    const blob = new Blob([file], { type: file.type });

    await axios.put(url, blob, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};


export const S3Url = 'https://twitter-backend-demo-a617f6da-58a7-4888-b927-88eaae142243.s3.us-east-2.amazonaws.com/';