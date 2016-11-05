const template = require('./inputbox.html');

export const InputBoxCtrlName = 'InputBoxCtrl';

export const InputBoxCtrlState = {
  url: '/inputbox',
  template,
  controller: InputBoxCtrlName,
  controllerAs: 'inputbox'
};

export class InputBoxCtrl {
  constructor() {
    this.items = [2,4,6,8];
  }
}