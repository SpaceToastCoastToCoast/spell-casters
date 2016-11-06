const template = require('./parsedWord.html');

export const ParsedWordCtrlName = 'ParsedWordCtrl';

export const ParsedWordCtrlState = {
  url: '/parsedWord',
  template,
  controller: ParsedWordCtrlName,
  controllerAs: 'parsedWord'
};


export class ParsedWordCtrl{
  constructor(){
    this.words = ['foo', 'believe', 'hotdogs'];
  }
}