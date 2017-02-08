(function($) {
  var registered_modals = []

  $.fn.leanModal = function(options) {
    var defaults = {
      top: 100,
      overlay: 0.4,
      closeButton: null,
      openOnClick: true,
      closeOnClick: true
    }


    var overlay_id = "lean_overlay";

    if($("#" + overlay_id).length == 0){
      $("body").append($("<div id='" + overlay_id + "'></div>"));
    }

    var options = $.extend(defaults, options);

    function close_modal(modal_id, fade_overlay = true) {
      if(fade_overlay){
        $("#lean_overlay").fadeOut(200);
      }
      $(modal_id).css({
        'display': 'none'
      });
    }
    return this.each(function() {
      var leanModalInstance = this
      registered_modals.push(this)
      this.openModal = function(modal_id) {
        registered_modals.forEach(function(elem){
          elem.closeModal(null, false)
        })
        var o = options;
        var modal_id = modal_id || $(this).attr("href");

        $("#lean_overlay").click(function() {
          if(o.closeOnClick) {
            close_modal(modal_id);
          }
        });

        $(o.closeButton).click(function() {
          close_modal(modal_id);
        });

        var modal_height = $(modal_id).outerHeight();
        var modal_width = $(modal_id).outerWidth();
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

      this.closeModal = function(modal_id, fade_overlay = true) {
        var modal_id = modal_id || $(this).attr("href")
        close_modal(modal_id, fade_overlay);
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
