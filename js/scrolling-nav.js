//jQuery to expand the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-expand");
        $('.navbar-form').removeClass('navbar-form-toggled');
        $('.navbar-form').addClass('navbar-form-toggled');
        
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-expand");
    }
});

//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top < 50) {
        $(".navbar-fixed-top").removeClass("top-nav-expand");
        $('.navbar-form').addClass('navbar-form-not-toggled');
        $('.navbar-form').removeClass('navbar-form-toggled');
        

    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
