$("li").hover(
    function() {
        $(this).find("a").css("color", "#FFF");
        $(this).find("span").stop().animate({
            width: "100%",
            opacity: "1",
        }, 600, function() {
            // Animation complete.
            // Show Navigation
        })
    },
    function() {
        $(this).find("a").css("color", "#FFF");
        $(this).find("span").stop().animate({
            width: "0%",
            opacity: "0",
        }, 600, function() {
            // Animation complete.
            // Show Navigation
        })
    }
);

$('.sli').each(function(){
    $(this).click(function(){
        $(this).siblings('.selected').removeClass('selected');
        $(this).addClass('selected');
        var src = $(this).data('id');
        $('#ifs_content').html('');
        var $iframe = $('<iframe width=100% height=100% frameborder=0 src="/admin/host"></iframe>');
        $iframe.attr('src', src);
        $('#ifs_content').append($iframe);
    });
});
