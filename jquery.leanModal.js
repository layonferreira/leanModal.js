(function($) {

  $.fn.leanModal = function(options) {

    var defaults = {
      top: 100,
      overlay: 0.5,
      closeButton: null,
      openOnClick: true
    }

    var overlay = $("<div id='lean_overlay'></div>");

    $("body").append(overlay);

    var options = $.extend(defaults, options);

    function close_modal(modal_id) {

      $("#lean_overlay").fadeOut(200);

      $(modal_id).css({
        'display': 'none'
      });

    }
    return this.each(function() {
      var leanModalInstance = this
      this.openModal = function(modal_id) {
        var o = options;
        var modal_id = modal_id || $(this).attr("href");

        $("#lean_overlay").click(function() {
          close_modal(modal_id);
        });

        $(o.closeButton).click(function() {
          close_modal(modal_id);
        });

        var modal_height = $(modal_id).outerHeight();
        var modal_width = $(modal_id).outerWidth();

        $('#lean_overlay').css({
          'display': 'block',
          opacity: 0
        });

        $('#lean_overlay').fadeTo(200, o.overlay);

        $(modal_id).css({
          'display': 'block',
          'position': 'fixed',
          'opacity': 0,
          'z-index': 11000,
          'left': 50 + '%',
          'margin-left': -(modal_width / 2) + "px",
          'top': o.top + "px"
        });

        $(modal_id).fadeTo(200, 1);
      }
      $(this).data("leanModal", leanModalInstance)

      $(this).click(function(e) {
        if(options.openOnClick) {
          $(this).data("leanModal").openModal();
          e.preventDefault();
        }
      });
    });
  }

})(jQuery);
