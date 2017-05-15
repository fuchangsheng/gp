'use strict';

/*
config: [{"name": "a", "text": "b", "url": "/c"}, ...]
current: name of one of the items in config
*/
function initTabs(config, current) {
    var tabs = $("#tabs");
    var ul = $("<ul class=\"nav nav-tabs\"></ul>");
    tabs.append(ul);
    for (var i = 0; i < config.length; i++) {
        var item = config[i];
        if (item.text==''||item.text==null){
            var li = $("<li><a href=\"" + (item.url || "#") + "\">" + "<img src=\""+(item.src)+"\">"+ "</a></li>");
        }else{
            var li = $("<li><a href=\"" + (item.url || "#") + "\">" + (item.text || "")+ "</a></li>");
        }
        if (current == item.name) {
            li.addClass("active");
        }
        ul.append(li);
    }
}

function spinLoader(text) {
    return $("<div class=\"spin-loader\"><div class=\"text-center\"><img src=\"/images/ripple.gif\"></div><div class=\"small text-muted text-center\">" + (text || "") + "</div></div>");
}

function stringLoadFail(text) {
    return $("<div style=\"text-align:center;\" class=\"small text-muted\">" + (text || "数据加载失败, 请尝试刷新页面。") + "</div>");
}

/* table helpers */
function emptyTbody(id) {
    $(id).find("tbody").empty();
}

function emptyTfoot(id) {
    $(id).find("tfoot").empty();
}

function getTableCloumnNumber(id) {
    return $(id).find("thead>tr:first>th").length;
}

function setTbody(id, element) {
    emptyTbody(id);
    $(id).find("tbody").append(element);
}

function setTfoot(id, element) {
    emptyTfoot(id);
    var columns = getTableCloumnNumber(id);
    $(id).find("tfoot").append($("<tr><td colspan=\"" + columns + "\"></td></tr>"));
    $(id).find("tfoot>tr>td:first").append(element);
}

function pagination(index, range, total,totalCount, callback) {
    var index = parseInt(index);
    var range = parseInt(range);
    var total = parseInt(total);
    var callback = callback || function(t, e) {console.log(t);};
    var pagination = $("<nav class=\"text-center\"><ul class=\"pagination\"></ul></nav>");
    var first = index - Math.floor((range - 1) / 2);
    first = total - range < first ? total - range : first;
    first = first < 0 ? 0 : first;
    var last = first + range;
    last = last > total ? total : last;
    var items = [];
    items.push({text: "首页", index: 0});
    items.push({text: "上一页", index: index - 1 < 0 ? 0 : index - 1});
    if (index == 0) {
        items[0].style = "disabled";
        items[1].style = "disabled";
    }
    for (var i = first; i < last; i++) {
        items.push({text: i + 1, index: i});
        if (i == index) {
            items[items.length - 1].style = "active";
        }
    }
    items.push({text: "下一页", index: index + 1 > last ? last : index + 1});
    items.push({text: "末页", index: total - 1});
    if (index == total - 1) {
        items[items.length - 2].style = "disabled";
        items[items.length - 1].style = "disabled";
    }
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var li = $("<li><a href=\"#" + item.index + "\">" + item.text + "</a></li>");
        if (item.style) {
            li.addClass(item.style);
        } else {
            li.find("a").click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                callback(this, e);
            });
        }
        pagination.find("ul").append(li);
    }
    var outerWrapper = $('<div class="text-center"></div>');
    var wrapper = $('<div></div>');
    var description = $('<span></span>');
    var desStr = '共 ' + total + ' 页 ' + totalCount + ' 条数据 跳转到第  ' ;
    description.append(desStr);

    var hint = $('<span></span>');

    var input = $('<input type="tel" class="text-center">');
    input.css({width:'30px',background:'#00000000'});

    input.on('keyup',function(){
        var val = input.val();
        var gp = parseInt(val);
        if(gp >=1 && gp <= total){
            hint.html('');
            gp = gp-1;
            go.removeClass('hidden');
            go.attr('href','#' + gp);
        }else{
            go.addClass('hidden');
            hint.text('请输入正确页码');
            hint.removeClass('hidden');
        }

        if(val == ''){hint.html('');}
    });

    var span = $('<span></span>');
    span.append(input);
    span.append('  页   ');
    var go = $('<a class="hidden" id="goPage"></a>');
    var goBtn = $('<button class="btn btn-sm">确定</button>');
    goBtn.css({
        fontSize:'smaller',
        padding:'inherit',
        marginBottom:'3px',
        paddingLeft:'2px',
        paddingRight:'2px'
    });
    go.click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        callback(this, e);
    });
    go.append(goBtn);

    wrapper.append(description);
    wrapper.append(span);
    wrapper.append(go);
    wrapper.append(hint);
    outerWrapper.append(pagination);
    outerWrapper.append(wrapper);

    return outerWrapper;
}
