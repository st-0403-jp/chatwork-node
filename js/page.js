/*page.js*/

model.page = (function () {
  return {
    top: function () {
      console.log('top');

      var $form = $('#apiForm');

      $('body').on('click', 'input[name=decide]', function (e) {
        e.preventDefault();
        $form.submit(function () {
          common.render.getData();
        });
      });
    }
  };
})();
