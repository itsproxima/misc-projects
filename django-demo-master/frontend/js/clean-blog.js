(function($) {
  "use strict"; // Start of use strict

  // Floating label headings for the contact form
  $("body").on("input propertychange", ".floating-label-form-group", function(e) {
    $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
  }).on("focus", ".floating-label-form-group", function() {
    $(this).addClass("floating-label-form-group-with-focus");
  }).on("blur", ".floating-label-form-group", function() {
    $(this).removeClass("floating-label-form-group-with-focus");
  });

  // Show the navbar when the page is scrolled up
  var MQL = 992;

  //primary navigation slide-in effect
  if ($(window).width() > MQL) {
    var headerHeight = $('#mainNav').height();
    $(window).on('scroll', {
        previousTop: 0
      },
      function() {
        var currentTop = $(window).scrollTop();
        //check if user is scrolling up
        if (currentTop < this.previousTop) {
          //if scrolling up...
          if (currentTop > 0 && $('#mainNav').hasClass('is-fixed')) {
            $('#mainNav').addClass('is-visible');
          } else {
            $('#mainNav').removeClass('is-visible is-fixed');
          }
        } else if (currentTop > this.previousTop) {
          //if scrolling down...
          $('#mainNav').removeClass('is-visible');
          if (currentTop > headerHeight && !$('#mainNav').hasClass('is-fixed')) $('#mainNav').addClass('is-fixed');
        }
        this.previousTop = currentTop;
      });
  }
  getAllBlogs();

})(jQuery); // End of use strict

function getAllBlogs(){

  var url  = "http://127.0.0.1:8000/blog/bloglist/";
  $.ajax({
    url:url,
    type:"GET",
    datatype: 'application/json',
    headers: {"Access-Control-Allow-Origin": "*","X-Frame-Options":"SAMEORIGIN"},
    // Instructions for how to deserialize a `mycustomtype`
    success:function(result){
      console.log(result);
      renderPosts(result);
    }
  });
}
function renderPosts(posts){
  for(var i=0;i<posts.length;i++){
    var post = '<div class="post-preview"><a href="post.html"><h2 class="post-title">'+posts[i]["title"]+'</h2><h3 class="post-subtitle">'+posts[i]["desc"]+'</h3></a><p class="post-meta">Posted by<a href="#">'+posts[i]["author"]+'</a></p></div>';
    $(".mx-auto").append(post);
  }
}