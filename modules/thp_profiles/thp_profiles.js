(function ($) {
  $(document).ready(function() {
  
    if ($('#edit-designer-flag:checked').length == "1") {
      $('#edit-designer-fieldset').show();  
    } else {
      $('#edit-designer-fieldset').hide();
    }

     $("#edit-designer-flag").change(function() {
       if(this.checked) {
         $('#edit-designer-fieldset').show();  
       } else {
         $('#edit-designer-fieldset').hide();
       }
   });


  });

})(jQuery);
