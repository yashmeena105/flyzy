import axios from 'axios';
import { AxiosAll } from './NetworkEngine';

class UploadFilesService {
  upload(file, onUploadProgress, uid) {
    console.log("dat", file)
    console.log("uid2", uid)


    const data = {
      assets: [{
        "name": file?.name,
        "mimetype": file?.type,
        "size": file?.size
      }]
    }

    const res = AxiosAll("post", "/company/upload-asset", data, uid)
    return res, onUploadProgress
    // formData.append('file', file);

    // return axios.post('/upload', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   onUploadProgress,
    // });
  }

  getFiles() {
    return axios.get('/files');
  }
}

export default new UploadFilesService();
