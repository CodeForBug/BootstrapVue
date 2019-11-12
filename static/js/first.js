$(document).ready(function () {
    queryUser();
    function queryUser() {
        $.ajax({
            async: true,
            type: "post",
            url: "getbooklist/",
            dataType: "json",
            data: {page:'1'},
            cache: false,
            success: function(data) {
                var trs = "";
                for (let i = 0; i < data.data.bookList.length; i++) {
                    var tr = "";
                    tr = '<tr><td style="text-align:center;vertical-align:middle">' + (i + 1) + '</td>'
                        + '<td style="text-align:center;vertical-align:middle">' + data.data.bookList[i].name + '</td>'
                        + '<td style="text-align:center;vertical-align:middle">' + data.data.bookList[i].author + '</td>'
                        + '<td style="text-align:center;vertical-align:middle">' + data.data.bookList[i].press + '</td>'
                        + '<td style="text-align:center;vertical-align:middle">' + data.data.bookList[i].category + '</td>'
                        + '<td style="text-align:center;vertical-align:middle">' + data.data.bookList[i].createTime + '</td>'
                        + '<td style="text-align:center;vertical-align:middle"><button class="btn-danger deleteBook">删除</button><button class="btn-default" style="margin-left:3px">修改</button></td></tr>'
                    trs += tr;
                }
                $("#bookList").html(trs)

                var currentPage = data.data.currentPage; //当前页数
                var pageCount = data.data.pageCount; //总页数
                var options = {
                    bootstrapMajorVersion: 3, //版本
                    currentPage: currentPage, //当前页数
                    totalPages: pageCount, //总页数
                    numberOfPages: 5,
                    shouldShowPage:true,//是否显示该按钮
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "末页";
                            case "page":
                                return page;
                        }
                    },//点击事件，用于通过Ajax来刷新整个list列表
                    onPageClicked: function (event, originalEvent, type, page) {
                        $.ajax({
                            async: true,
                            url: "getbooklist/",
                            type: "post",
                            dataType : "json",
                            data: {page:page},
                            cache: false,
                            success: function (data) {
                                var trs = "";
                                for (let i = 0; i <data.data.bookList.length; i++) {
                                    var tr = "";
                                    tr = '<tr><td style="text-align:center;vertical-align:middle">' + (i+1) + '</td>'
                                        + '<td style="text-align:center;vertical-align:middle">' + data.data.bookList[i].name + '</td>'
                                        + '<td style="text-align:center;vertical-align:middle">' + data.data.bookList[i].author + '</td>'
                                        + '<td style="text-align:center;vertical-align:middle">' + data.data.bookList[i].press + '</td>'
                                        + '<td style="text-align:center;vertical-align:middle">' + data.data.bookList[i].category + '</td>'
                                        + '<td style="text-align:center;vertical-align:middle">' + data.data.bookList[i].createTime + '</td>'
                                        + '<td style="text-align:center;vertical-align:middle"><button class="btn-danger deleteBook">删除</button><button class="btn-default" style="margin-left:3px">修改</button></td></tr>'
                                    trs += tr;
                                }
                                $("#bookList").html(trs)
                            }/*success*/
                        });
                    }
                };
                $('#Pagination').bootstrapPaginator(options);
            }/*success*/
        });
    }

    // getBookList(0);
    //
    // function getBookList(pn) {
    //     $.ajax({
    //         type: 'GET',
    //         url: 'getbooklist/',
    //         data: {'pn':pn},
    //         dataType:"json",
    //         success: function (data) {
    //             for (i in data.data) {
    //                 var number = parseInt(i)+1;
    //                 var tr;
    //                 tr = '<td style="text-align:center;vertical-align:middle">' + number + '</td>'
    //                     + '<td style="text-align:center;vertical-align:middle">' + data.data[i].name + '</td>'
    //                     + '<td style="text-align:center;vertical-align:middle">' + data.data[i].author + '</td>'
    //                     + '<td style="text-align:center;vertical-align:middle">' + data.data[i].press + '</td>'
    //                     + '<td style="text-align:center;vertical-align:middle">' + data.data[i].category + '</td>'
    //                     + '<td style="text-align:center;vertical-align:middle">' + data.data[i].createTime + '</td>'
    //                     + '<td style="text-align:center;vertical-align:middle"><button class="btn-danger deleteBook">删除</button><button class="btn-default" style="margin-left:3px" οnclick="editBook('+data.data[i].pk+')">修改</button></td>'
    //                 $("#bookList").append('<tr>' + tr + '</tr>')
    //             }
    //         }
    //     })
    // }
    //
    // $('body').on('click', '.deleteBook', function() {
    //     console.log('ddd')
    // });

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