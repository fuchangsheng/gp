$(document).ready(function(){
    $('.nav.nav-tabs.mark li').click(function(){
        $('.nav.nav-tabs.mark li').toggleClass('active');
        $('.content').toggleClass('hidden');
    });

    $('.nav.nav-tabs.modalnav li').click(function(){
        $('.nav.nav-tabs.modalnav li').removeClass('active');
        $(this).addClass('active');
        $('#modal-content').children('div').addClass('hidden');
        var id = $(this).attr('id')+'-content';
        $('#'+id).removeClass('hidden');
    });
});

function loadPlanList(options) {
    options = options || {};
    var index = parseInt(options.index) || 0;
    var count = parseInt(options.count) || 10;
    var marked = parseInt(options.marked) || 0;
    
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
                    eventid.text(item.mid || '');
                    row.append(eventid);

                    var createtime = $('<td></td>');
                    createtime.text(formatDate(item.update_time));
                    row.append(createtime);

                    var actions = $('<td></td>');
                    var view = $('<div><div>');
                    view.addClass('btn btn-sm btn-warning');
                    view.attr('data-id', item.mid);
                    view.attr('data-content', item.content || '');
                    view.text('标注');
                    view.click(function(){
                        openMark(this);
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
        url: '/mark/list',
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

function loadMarkList(options) {
    options = options || {};
    var index = parseInt(options.index) || 0;
    var count = parseInt(options.count) || 10;
    var marked = parseInt(options.marked) || 1;
    
    var tid = "#mark-list";
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

                    var trigger = $('<td></td>');
                    trigger.text(item.trigger || '');
                    row.append(trigger);

                    var who = $('<td></td>');
                    who.text(item.who || '');
                    row.append(who);

                    var whom = $('<td></td>');
                    whom.text(item.whom || '');
                    row.append(whom);

                    var how = $('<td></td>');
                    how.text(item.how || '');
                    row.append(how);

                    var when = $('<td></td>');
                    when.text(item.when || '');
                    row.append(when);

                    var where = $('<td></td>');
                    where.text(item.where || '');
                    row.append(where);

                    var actions = $('<td></td>');
                    var view = $('<div><div>');
                    view.addClass('btn btn-sm btn-primary');
                    view.text('查看');
                    var edit = $('<div><div>');
                    edit.addClass('btn btn-sm btn-danger');
                    edit.css({marginLeft:'10px'});
                    edit.text('修改');
                    actions.append(view);
                    actions.append(edit)
                    row.append(actions);

                    rows.push(row);
                }

                setTbody(tid, rows);

                setTfoot(tid, pagination(index, 5, pagenumber, total, function(t, e) {
                    loadMarkList({index: parseInt(t.hash.replace("#", ""))});
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
        url: '/mark/list',
        data: {
            index: index,
            count: count,
            marked: 1
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


function openMark(that){
    var $modal = $('#markmodel');

    //reset modal
    $modal.find('#modal-content').children('div').html('');
    
    $('.nav.nav-tabs.modalnav li').removeClass('active');
    $('.nav.nav-tabs.modalnav #trigger').addClass('active');
    $('#modal-content').children('div').addClass('hidden');
    var id = $(this).attr('id')+'-content';
    $('#trigger-content').removeClass('hidden');
    
    var cs = {trigger:1,who:1,whom:1, when:1, where:1,how:1};
    for(var k in cs){
        var s = getSelectedContent(k);
        $('#selectcontent').children('div.'+k).children('span.label').siblings('span').text('');
    }
    $('#submitmark').unbind('click');
    

    var content = $(that).data('content').trim().replace(/\u200B/g,'').replace(/\s+/g,'');
    var mid = $(that).attr('data-id');

    var words = $('<div></div>');
    for(var index=0,realindex=0; index < content.length;index++){
        if(content[index]){
            var word = $('<a><div></div></a>');
            word.addClass("segmentword");
            word.text(content[index]);
            word.attr('data-index',realindex);
            word.click(function(e){
                $(this).toggleClass("schecked");
                var $ca = $(this).parent().children('.schecked');

                if($ca.length==2){
                    var si,ei
                    $ca.each(function(i,e){
                        if(i == 0){si = $(this).data('index')}
                        if(i == 1){ei = $(this).data('index')}
                    });
                    for(var c=si; c<=ei;c++){
                        $(this).parent().find('a').eq(c).addClass('schecked');
                    }
                }

                if($ca.length > 2){
                    $(this).parent().find('a').removeClass('schecked');
                    $(this).addClass('schecked');
                }
                sync();
            });
            words.append(word);
            realindex++;
        }
    }
    $modal.find('#modal-content').children('div').html(words);
    $('#submitmark').click(function(){
        var data = sync();
        if(Object.keys(data).length){
            data.id = mid;
            ajaxcall({url:'/mark/mark',data:data}, function(err, data){
                if(err)return alert(err.message);
                $modal.modal('hide');
                loadPlanList();
                loadMarkList();
            });
        }else{
            alert('请至少标记一项');
        }
    });
    $modal.modal();
}

function sync(){
    var cs = {trigger:'',who:'',whom:'', when:'', where:'',how:''};
    for(var k in cs){
        var s = getSelectedContent(k);
        if(s){cs[k]=s;}else{delete cs[k];}
        $('#selectcontent').children('div.'+k).children('span.label').siblings('span').text(s);
    }
    return cs;
}

function getSelectedContent(id){
    var str = '';
    var $ca = $('#'+id+'-content').children('div').find('a.schecked');
    $ca.each(function(i,e){
        str += $(this).text();
    });
    return str;
}