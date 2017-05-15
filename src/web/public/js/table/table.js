function loadPlanList(index, count) {
        var tid = "#plan-list";
        emptyTbody(tid);
        setTfoot(tid, spinLoader("数据加载中，请稍候..."));
        var index = parseInt(index) || 0;
        var count = parseInt(count) || 10;

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
                        row.append($("<td>" + item.plan_name + "</td>"));
                        var wrapper = $("<div class=\"switch\"></div>");
                        var status = $("<input type=\"checkbox\" data-size=\"mini\" data-on-color=\"success\" data-off-color=\"warning\"></input>");
                        row.attr("data-id", i);
                        row.attr("data-plan-id", item.plan_id);
                        row.attr("data-plan-name", item.plan_name);
                        row.attr("data-plan-cycle", item.plan_cycle);
                        if (item.plan_status == "启用") {
                            status.attr("checked", true);
                        }
                        wrapper.append(status);
                        row.append($("<td></td>").append(wrapper));
                        row.append($("<td>" + item.budget + "</td>"));
                        row.append($("<td>" + item.start_time + "</td>"));
                        row.append($("<td>" + item.end_time + "</td>"));
                        var actions = $("<td></td>");
                        row.append(actions);
                        var edit = $("<button type=\"button\" class=\"btn btn-xs btn-link\">编辑</button>");
                        edit.attr("edit-btn-id", i);
                        actions.append(edit);
                        var del = $("<button type=\"button\" class=\"btn btn-xs btn-link\">删除</button>");
                        del.click(function(e) {
                            if (confirm("确定要删除这条记录吗？")) {
                                var arr=parseInt($(this).parents("tr").attr("data-plan-id"));
                                confirmarr(arr);
                            }
                        });
                        actions.append(del);
                        rows.push(row);
                    }

                    setTbody(tid, rows);

                    setTfoot(tid, pagination(index, 5, pagenumber, function(t, e) {
                        loadPlanList(parseInt(t.hash.replace("#", "")));
                    }));

                } catch(e) {
                    ecb();
                }
            }
        }

        function ecb() {
            emptyTbody(tid);
            setTfoot(tid, stringLoadFail());
        }
        
        var param = {
            sinterface: SERVERCONF.ADS.PLANLIST,
            data: {
                index: index,
                count: count,
                sort: $("#data-sort").val()
            }
        }
        ajaxCall(param, function(err, data){
            if(err){
                ecb();
            }else{
                scb(data);
            }
        });
}