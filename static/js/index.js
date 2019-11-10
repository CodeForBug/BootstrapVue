$(document).ready(function () {

    $.ajax({
        url: "/backend/username",
        type: "GET",
        dataType: "json",
        sync: true,
        success: function (result) {
            if (result.status == 200) {
                $("#userName").html("你好，" + result.data.name);
            } else {
                alert(result.msg);
            }
        }
    })


    $.ajax({
        url: "/backend/booksamount",
        type: "GET",
        dataType: "json",
        sync: true,
        success: function (result) {
            if (result.status == 200) {
                $("#amount_of_books").html(result.data.amount);
            } else {
                alert(result.msg);
            }
        }
    })

    $.ajax({
        url: "/backend/moviesamount",
        type: "GET",
        dataType: "json",
        sync: true,
        success: function (result) {
            if (result.status == 200) {
                $("#amount_of_movies").html(result.data.amount);
            } else {
                alert(result.msg);
            }
        }
    })
});