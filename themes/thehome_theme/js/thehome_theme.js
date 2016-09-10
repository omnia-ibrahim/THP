(function ($) {
  $(document).ready(function() {
  

 //var myDropzone = new Dropzone("#test_yarab", { url: "file-upload"})
/*        

*/
//Dropzone.options.testYarab = { url: "upload.php",};
//Dropzone.options.testYarab = { url: "upload.php"};
//$("#test-yarab").dropzone({ url: "/file/post" });


  Dropzone.options.pageNodeForm = {
    addRemoveLinks: true,
    parallelUploads: 1,  
  }
  
  // For adding business shop
  Dropzone.options.editBusinessPhotos = {
    url: Drupal.settings.basePath + 'add_shop_request', 
    addRemoveLinks: true,
    parallelUploads: 1,  
  }
  
  //  $("div#edit-business-photos").dropzone({ url: Drupal.settings.basePath + 'add_shop_request'});
  
  /*
  
     $("#pagde-node-form").dropzone({ 

     paramName: "files", // The name that will be used to transfer the file
        enqueueForUpload: true,
    addRemoveLinks: true,


 
   });  
      $('#page-node-form').submit(function() {
              $.post(Drupal.settings.basePath + 'save_file');  
   
       });
*/
 
 });

///////////////////////
})(jQuery);
