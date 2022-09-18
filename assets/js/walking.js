var window_width = $(window).width() - $('#object ').width();

var document_height = $(document).height() - $(window).height();

$(function () {
    $(window).scroll(function () {
        var scroll_position = $(window).scrollTop();
        var object_position_left = window_width * (scroll_position / document_height);
        $('#object #rocket').css({
            'left': object_position_left
        });
    });
});