function loadPlanList(options) {
    options = options || {};
    var index = parseInt(options.index) || 0;
    var count = parseInt(options.count) || 10;
    
    var tid = "#plan-list";
    emptyTbody(tid);
    setTfoot(tid, spinLoader("数据加载中，请稍候..."));

    function scb(data) {
        if (data.size == 0) {
            setTfoot(tid, stringLoadFail("没有数据"));
        } else {
            try {
                var total = data.total;
                var list = data.list;
                var pagenumber = Math.ceil(total / count);
                var rows = [];
                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    var row = $("<tr></tr>");

                    var username = $('<td></td>');
                    username.text(item.username || '');
                    row.append(username);

                    var content = $('<td></td>');
                    content.text(getMainStr(item.content) || '');
                    content.attr('data-str',item.content || '');
                    row.append(content);

                    var eventid = $('<td></td>');
                    eventid.text(item.id || '');
                    row.append(eventid);

                    var createtime = $('<td></td>');
                    createtime.text(formatDate(item.update_time));
                    row.append(createtime);

                    var actions = $('<td></td>');
                    var view = $('<div><div>');
                    view.addClass('btn btn-sm btn-primary');
                    view.attr('data-id', item.id);
                    view.attr('data-content', item.content || '');
                    view.text('查看');
                    view.click(function(){
                        var content = $(this).data('content');
                        alert(content);
                    });
                    actions.append(view);
                    row.append(actions);

                    rows.push(row);
                }

                setTbody(tid, rows);

                setTfoot(tid, pagination(index, 5, pagenumber, total, function(t, e) {
                    loadPlanList({index: parseInt(t.hash.replace("#", ""))});
                }));
                
            } catch (e) {
                ecb();
            }
        }
    }

    function ecb() {
        emptyTbody(tid);
        setTfoot(tid, stringLoadFail());
    }

    var param = {
        'url': '/events/list',
        data: {
            index: index,
            count: count
        }
    };

    ajaxcall(param, function(err, data) {
        if (err) {
            ecb();
        } else {
            scb(data);
        }
    });
}
