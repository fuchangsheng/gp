var ajaxcall = function(param, fn) {
    $.ajax({
        url: param.url,
        type: param.type,
        dataType: param.dataType,
        data: param.data,
        traditional: true,
        success: function(data) {
            if (data.success) {
                fn(null, data);
            } else {
                fn({
                    message: data.message || 'ajaxcall failed'
                });
            }
        },
        error: function(err) {
            fn({
                message: 'SERVER IS NOT RUNNING.'
            });
        }
    });
};


var getMainStr = function(s) {
    var l = (s || '').length;
    if (l > 20) {
        return s.substring(0, 21) + '...';
    } else {
        return s;
    }
};

var formatDate = function(s) {
    s = s.replace('T', ' ');
    s = s.replace('.000Z', '');
    return s || '';
};

function charFilter(str) {
    var fileType = "";
    //非可见字符asc,多个就可以用数组  
    var ascNum = 173;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) != ascNum) {
            fileType += str.charAt(i);
        }
    }
    return fileType;
}