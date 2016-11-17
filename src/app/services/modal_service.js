export const ModalService = [

  class ModalService {
    constructor () {
      this.modals = [];
    }

    add (modal) {
      this.modals.push(modal);
      return this.modals;
    }

    remove (id) {
      let removeIndex = this.modals.findIndex(id);
      if ( removeIndex === -1) {
        throw new Error('model id not in modals');
      } else {
        this.modals = this.modals.filter((modal) => {
          return modal !== id;
        })
      }
      return this.modals;
    }

    Open (id) {
      let openIndex = this.modals.findIndex(id);
      if ( openIndex === -1) {
        throw new Error('model id not in modals');
      } else {
        let modalOpen = this.modals.filter((modal) => {
          return modalOpen === id;
        })
        modalOpen.open();
      }
    }

    Close (id) {
      let closeIndex = this.modals.findIndex(id);
      if ( closeIndex === -1) {
        throw new Error('model id not in modals');
      } else {
        let modalClose = this.modals.filter((modal) => {
          return modalClose === id;
        })
        modalClose.close();
      }
    }

  }
];