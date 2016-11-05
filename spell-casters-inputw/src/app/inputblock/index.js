const template = require('./inputblock.html');

export const InputBlockCtrlName = 'InputBlockCtrl';

export const InputBlockCtrlState = {
  url: '/inputblock',
  template,
  controller: InputBlockCtrlName,
  controllerAs: 'inputblock'
};

export class InputBlockCtrl {
  constructor() {
    this.numbers = [2,4,6,8];
  }
}