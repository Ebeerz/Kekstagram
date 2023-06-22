import {getPictures} from './data.js';
import { imgUploading } from './pictureUpload.js';
import {renderPictures} from './thumbnail.js';
renderPictures(getPictures());
imgUploading();
