export const ModalService = [

  class ModalService {
    constructor () {
      'ngInject';
      this.modals = [];
    }

    addModal (modal) {
      this.modals.push(modal);
      return this.modals;
    }

    openModal (id) {
      let index = this.modals.findIndex((data) => {
        return data.id === id;
      })
      this.modals[index].open();
     }

    closeModal (id) {
      let index = this.modals.findIndex((data) => {
        return data.id === id;
      })
      this.modals[index].close();
    }

    removeModal (id) {
      this.modals = this.modals.filter((data) => {
        return data.id !== id;
      })
    }

    getModal () {
      return this.modals;
    }

  }
];