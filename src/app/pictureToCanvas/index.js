const template = require('./pictureToCanvas.html');
//import { LoadPicture } from '../services/loadPicture';

export const PictureToCanvasCtrlName = 'PictureToCanvasCtrl';

export const PictureToCanvasCtrlState = {
  url: '/canvas',
  template,
  controller: PictureToCanvasCtrlName,
  controllerAs: 'pictureToCanvas'
};

export const PictureToCanvasCtrl = [
  '$scope',

  class PictureToCanvasCtrl {
    constructor($scope) {




    }
  }
]