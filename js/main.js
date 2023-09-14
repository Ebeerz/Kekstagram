import {getData} from './serverRequests.js';
import {imgUploading} from './pictureUpload.js';
import {managePictures} from './thumbnail.js';

getData(managePictures);
imgUploading();
