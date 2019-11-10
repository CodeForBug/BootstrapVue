$(document).ready(function () {


    var pageIndex = pageNumber - 1; //页面索引初始值
    var pageSize = 3; //每页显示条数初始化，修改显示条数，修改这里即可
    //分页，PageCount是总条目数，这是必选参数，其它参数都是可选
    $("#Pagination").pagination(100, {
        callback: PageCallback,
        prev_text: '上一页', //上一页按钮里text
        next_text: '下一页', //下一页按钮里text
        items_per_page: pageSize, //显示条数
        num_display_entries: 5, //连续分页主体部分分页条目数
        current_page: pageIndex, //当前页索引
        num_edge_entries: 2 //两侧首尾分页条目数
    });

    //翻页调用 index 是当前页的索引
    function PageCallback(index, jq) {
        Ajax(index, index + 1, 1);
    }


    $('#btn_submit').on('click', function () {
        var formData = new FormData();
        formData.append('bookname', $('#txt_book_name').val());
        formData.append('bookauthor', $('#txt_book_author').val());
        formData.append('bookpress', $('#txt_book_press').val());
        formData.append('booktype', $('#txt_book_type').val());
        formData.append('file', $('#input_file')[0].files[0]);
        //预先发送csrf值，防止出现403错误
        $.ajaxSetup({data: {csrfmiddlewaretoken: '{{ csrf_token }}'}});
        $.ajax({
            type: 'POST',
            url: 'addbook/',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log(data)
            },
        })
    });
});