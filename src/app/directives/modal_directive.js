export const modalDirective = [
  'ModalService',
  (ModalService) => {
  return {
    link: function (scope, element, attrs) {
      console.log('attrs', attrs);
      if (!attrs.id) {
        console.error('modal have no id');
        return;
      }

      element.appendTo('body');

      element.on('click', function (e) {
        let target = $(e.target);
        if (!target.closest('.modal-body').length) {
          scope.$evalAsync(Close);
        }
      });

      // add self (this modal instance) to the modal service so it's accessible from controllers
      var modal = {
        id: attrs.id,
        open: Open,
        close: Close
      };
      ModalService.Add(modal);

      // remove self from modal service when directive is destroyed
      scope.$on('$destroy', function() {
        ModalService.Remove(attrs.id);
        element.remove();
      });


      // open modal
      function Open() {
        element.show();
        $('body').addClass('modal-open');
      }

      // close modal
      function Close() {
        element.hide();
        $('body').removeClass('modal-open');
      }


    }//eof link

  } // eof return

}


];