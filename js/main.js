import {getData} from './serverRequests.js';
import {imgUploading} from './pictureUpload.js';
import { renderPictures } from './thumbnail.js';

getData(renderPictures);
imgUploading();
