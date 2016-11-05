const template = require('./default.html');

export const DefaultCtrlName = 'DefaultCtrl';

export const DefaultCtrlState = {
  url: '/',
  template,
  controller: DefaultCtrlName,
  controllerAs: 'default'
};

export class DefaultCtrl {
  constructor() {

  }
}