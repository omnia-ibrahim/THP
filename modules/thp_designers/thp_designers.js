(function ($) {
  $(document).ready(function() {
    // To change the color of checkboxes for selecting the product color
    $('#edit-field-design-color input[type=checkbox]').each(function () {
      var color =  $(this).next().text();
      $(this).next().text("").css('background', color).css('border', '1px solid black').css('width', '20px').css('height', '20px').css('float', 'left').attr('title', color).attr('alt', color);
    });

    $("ul#sortable_items_inside_album").sortable({ 
       opacity: 0.6, 
       cursor: 'move'  
    });

   ////////////////////////////////////////

 $( ".draggable, #draggable-nonvalid" ).draggable({

    cursor: 'move',
    containment: '#main_draggable_div',
    helper: 'clone',
    revert: "true",
  });
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
if(is_chrome) {
 $( ".draggable, #draggable-nonvalid" ).draggable({
    cursorAt: { top: 1000, left: 300 } 
  });

}

  $("#droppable" ).droppable({
    accept: ".draggable",
    activeClass: "ui-state-hover",
   hoverClass: "ui-state-active",
 
    drop: function( event, ui ) {
   $( this )
   .addClass( "ui-state-highlight" )
   .find( "p" )
   .html( "" ); 

     if ($(ui.draggable).hasClass('copied')) {
       return;
      }
      else {
            var droppedItem = $(ui.draggable).clone().addClass('copied').css({
                position: "absolute",
                top: $(ui.helper).position().top ,//- $(this).position().top,
                left: $(ui.helper).position().left - $(this).position().left,
                width: $(this).find('.ui-wrapper').width(),
              }).draggable({
             stop: function( event, ui ) {
                  $(ui.helper).parent().find('.selected').removeClass("selected");
                    var present = $(ui.helper).addClass("selected");
                  },
                containment: "#droppable",

            }).rotatable();
            
            droppedItem.find("img").resizable({
                aspectRatio: true,
		handles:     'ne, nw, se, sw',
                containment: "#droppable",
            });
            droppedItem.find(".ui-wrapper").parent().css("width","200");
            droppedItem.find(".ui-wrapper").css("width","200").css("height","200");
            droppedItem.find("img").css("width","200").css("height","200");
           $(this).append(droppedItem);

           $('#delete_image').click(function(event) {
             if(droppedItem.hasClass("selected")) {
                droppedItem.remove();
             }
          });
          $(document).keyup(function (e) {
            if (e.keyCode == 46 && droppedItem.hasClass("selected")) {
                droppedItem.remove();
            }
          });

          $('#clone_image').click(function(event) {
             if(droppedItem.hasClass("selected")) {
//               droppedItem.parent().append(droppedItem);
             }
          });




         $('#backward_image').click(function(event) {
             if(droppedItem.hasClass("selected")) {
                droppedItem.css("z-index", 0);
             }
          });

         $('#forward_image').click(function(event) {
             if(droppedItem.hasClass("selected")) {
                droppedItem.css("z-index", 10);
             }
          });
          // Flip image
          $('#flip_image').click(function(event) {
             if(droppedItem.hasClass("selected")) {
                if (droppedItem.find("img").hasClass("flipped_image"))  {  
                  droppedItem.find("img").removeClass("flipped_image");             
                } else {
                   droppedItem.find("img").addClass("flipped_image");
                }
             } 
          });
          // Flop image
          $('#flop_image').click(function(event) {
           if(droppedItem.hasClass("selected")) {
             if (droppedItem.find("img").hasClass("flopped_image"))  {  
                  droppedItem.find("img").removeClass("flopped_image");             
                } else {
                   droppedItem.find("img").addClass("flopped_image");
                }
              }
            });
        }   
    }
 });




   // Reset Button
   $('#reset_set').click(function(event) {
        if(confirm('Are you sure')) {  
          $('#droppable').html('<p>Create a set!</p>');
        }
   });
   // Save button
  $('#save_set').click(function(event) {
   
   var target = $('#droppable');
   var set_data = $('#droppable').html();

   target.find('.ui-resizable-handle').hide();
   target.find('.ui-rotatable-handle').hide();
   html2canvas(target, {
    onrendered: function(canvas) {
    var image_data = canvas.toDataURL();
    var fields = "";
    var counter = 1;
   $(set_data).each(function(){
      var img_src = $(this).find("img").attr("src");
      fields += '<input type="hidden" name="nodeid_field_' + counter + '" value="' + $(this).attr('id') +'" />';
      fields += '<input type="hidden" name="src_field_' + counter + '" value="' + img_src +'" />';
      fields += '<input type="hidden" name="style_field_' + counter + '" value="' + $(this).attr("style") +'" />';
      fields += '<input type="hidden" name="wrapperstyle_field_' + counter + '" value="' + $(this).find('.ui-wrapper').attr("style") +'" />';
      fields += '<input type="hidden" name="imgstyle_field_' + counter + '" value="' + $(this).find("img").attr("style") +'" />';
      counter ++;
    });
    
//  document.write('<img src="'+data+'"/>');
/*
  $.ajax({
    type: 'POST',
    url: Drupal.settings.basePath + 'save_data_image',
    data: image_data,
    success:function(result) {
                    var div_style = $(set_data).attr('style');
   
  var form = $('<form action="' + Drupal.settings.basePath + 'node/add/design-image/' + result + '" method="post">' +
  '<input type="hidden" name="set_data" value="' + div_style +'" />' +
  '</form>');
   $('body').append(form);
   $(form).submit();

      },

   // async:false
  });
*/
   var draft = false;
   if ($(this).attr('class') == 'save_draft') {
     draft = true;
   }
   $.post(Drupal.settings.basePath + 'save_data_image', {image: image_data}) .done(function( data ) {
//   $.post(Drupal.settings.basePath + 'node/add/design-image/' + data,  {image: data, set: set_data  }) .done(function( data ) {});
//    window.location.href = Drupal.settings.basePath + "node/add/design-image/" + data + '?data_set=' + set_data;
                    var div_style = $(set_data).attr('style');
  var form = $('<form action="' + Drupal.settings.basePath + 'node/add/design-image/' + data + '/' + draft +'" method="post">' +
   fields +
  '</form>');
   $('body').append(form);
   $(form).submit();

    });

//
//  $.post( "test.php", { image: data } );
    // data is the Base64-encoded image
    }
   });

  });

//var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
  
  //window.location.href=image;   

//var canvas = document.getElementById("#droppable");
//var img    = canvas.toDataURL("image/png");

//document.write('<img src="'+img+'"/>');


//////////////////////
  //TABS 
   showTab(location.hash || "first");

    $("#nav a").click(function() {
        var hash = this.getAttribute("href");
        if (hash.substring(0, 1) === "#") {
            hash = hash.substring(1);
        }
        location.hash = hash;
        showTab(hash);
        return false;
    });

    function showTab(hash) {
        $("div.tab").hide();
        $("#tab-" + hash).show();
    }

///////////////////////////////////////////////

   $('.image_inside_album_a').magnificPopup({
   type:'ajax',
   gallery:{enabled:true},
   closeOnBgClick: true,
   showCloseBtn: true,
   callbacks: {
   open: function() {
      window.history.pushState("", "Title", Drupal.settings.basePath + this.currItem.el.attr('href')); 
  },
   close: function() {
      window.history.pushState("", "Title", Drupal.settings.basePath + 'node');
   }
  }
  });
//////////////////////////////////
///////////////////////
  });
})(jQuery);

