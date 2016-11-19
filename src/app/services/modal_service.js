export const ModalService = [

  class ModalService {
    constructor () {
      this.modals = [];
    }

    addModal (modal) {
      this.modals.push(modal);
      return this.modals;
    }

    openModal (id) {
      this.modals[0].open();
     }

    closeModal (id) {
      this.modals[0].close();
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