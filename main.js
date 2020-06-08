var list = [];

$(document).ready(() => {
    if (localStorage.list) {
        list = JSON.parse(localStorage.list);
        updateList();
    }
});

// 37 38 39 40 왼 위 오 아래
$("ul").keydown((val) => {
    var idx = list.findIndex((l) => l === $(event.target)[0].outerHTML);
    switch (event.keyCode) {
        case 13:
            //엔터
            let foo = $(event.target);
            foo.toggleClass("done");
            list[idx] = String(foo[0].outerHTML);
            updateList();
            $("li")[idx].focus();
            break;
        case 37:
            //왼
            if (idx > 0) {
                $("li")[idx - 1].focus();
            }
            break;
        case 39:
            //오
            if (idx < list.length - 1) {
                $("li")[idx + 1].focus();
            }
            break;
        case 38:
            //위
            if (idx > 0) {
                [list[idx - 1], list[idx]] = [list[idx], list[idx - 1]];
                updateList();
                $("li")[idx - 1].focus();
            }
            break;
        case 40:
            //아래
            if (idx < list.length - 1) {
                [list[idx + 1], list[idx]] = [list[idx], list[idx + 1]];
                updateList();
                $("li")[idx + 1].focus();
            }
            break;
        case 46:
            //del
            if (window.confirm("일정 삭제")) {
                list.splice(idx, 1);
                updateList();
                $("li").focus();
            }
            break;
        default:
            break;
    }
});

$("#addList").submit((e) => {
    e.preventDefault();
    e.target.todo.value.split(",").forEach((v) => {
        list.push('<li class="list-group-item list-group-item-action" tabindex="0">' + v + "</li>");
    });
    //console.log(list);
    updateList();
    e.target.todo.value = "";
});

function updateList() {
    localStorage.list = JSON.stringify(list);
    $("#list").empty();
    $("#list").append(list.join(""));
}
