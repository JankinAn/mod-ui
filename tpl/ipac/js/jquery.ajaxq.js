(function($) {
    var ajaxRequest = {};
    $.ajaxQueue = function(settings) {
        var options = $.extend({className: 'DEFEARTNAME'}, $.ajaxSettings, settings);
        var _complete = options.complete;
        $.extend(options, {
            complete: function() {
                if (_complete)
                    _complete.apply(this, arguments);
                if ($(document).queue(options.className).length > 0) {
                    $(document).dequeue(options.className);
                } else {
                    ajaxRequest[options.className] = false;
                }
            }
        });
        $(document).queue(options.className, function() {
            $.ajax(options);
        });
        if ($(document).queue(options.className).length == 1 && !ajaxRequest[options.className]) {
            ajaxRequest[options.className] = true;
            $(document).dequeue(options.className);
        }
    };
})(jQuery);