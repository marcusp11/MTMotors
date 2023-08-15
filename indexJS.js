(function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

   $.fn.visible = function(partial) {

    var $t            = $(this),
    $w            = $(window),
    viewTop       = $w.scrollTop(),
    viewBottom    = viewTop + $w.height(),
    _top          = $t.offset().top,
    _bottom       = _top + $t.height(),
    compareTop    = partial === true ? _bottom : _top,
    compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };

})(jQuery);

$(window).scroll(function(event) {

  $(".container").each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("come-in"); 
    } 
  });
  
});

$(document).ready(function(){
 
 // If user clicks anywhere outside of the modal, Modal will close
 var modal = document.getElementById('login-wrapper');
 window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
})