$(document).ready(function() {
    $(window).resize(function() {
        var bodywidth = $(this).width();
        var bodyheight = $(this).height();
        var contentlistmain = $("content-list-main");


        $("#header-name").width(bodywidth * 0.33);
        if (bodywidth >=950)
        {
          $("#content-list-main").width(bodywidth * 0.33);
          $("#content-list-main").height(bodywidth * 0.33);
  $("#header-name").width(bodywidth * 0.33);

        }

       

 if (bodywidth < 950 && bodywidth >=680)
        {
          
          $("#content-list-main").height(bodywidth *.4);
          $("#content-list-main").width(bodywidth * 0.4);
  


        }

        if (bodywidth < 680)
        {
          
          $("#content-list-main").height(bodywidth *.63);
          $("#content-list-main").width(bodywidth * 0.63);
  


        }

    }).resize();
});
