$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: 'getbooklist/',
        data: {'pn':1},
        dataType:"json",
        success: function (data) {
            console.log(data)
        }
    })

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