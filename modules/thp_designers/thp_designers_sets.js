(function ($) {
  $(document).ready(function() {

		var drWr = $('#draggable-wrapper'),
		    rsWr = $('#resizable-wrapper'),
		    elem = $('#elem-wrapper');
		
		elem.resizable({
			aspectRatio: true,
			handles:     'ne, nw, se, sw'
		});
		
		drWr.draggable();
		
		elem.parent().rotatable();


///////////////////////
  });
})(jQuery);

