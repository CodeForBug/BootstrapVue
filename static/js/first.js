$(document).ready(function () {

    function EditDeleteFunction(value, row, index) {
        return [
            '<button id="edit" type="button" class="btn btn-default">编辑</button>',
            '<button id="view" type="button" class="btn btn-default" style="margin-left:3px">查看</button>',
        ].join('');
    };
    window.operateEvents = {
        'click #edit': function (e, value, row, index) {
            alert(row.id);
        },
        'click #view': function (e, value, row, index) {
            console.log(row.url);
            window.open("http://"+row.url);
        }
    };

    $('#btn_submit').on('click', function () {
        var formData = new FormData();
        formData.append('bookname', $('#txt_book_name').val());
        formData.append('bookauthor', $('#txt_book_author').val());
        formData.append('bookpress', $('#txt_book_press').val());
        formData.append('booktype', $('#txt_book_type').val());
        formData.append('file', $('#input_file')[0].files[0]);
        $.ajax({
            type: 'POST',
            url: 'addbook/',
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                $('#table').bootstrapTable('refresh');
            },
        })
    });

    $('#btn_delete').on('click', function () {
        var rows = $('#table').bootstrapTable('getSelections');
        var data = new Array;
        if (rows.length == 0) {
            alert("请先选择书籍");
        } else {
            if (confirm("您确定要删除这些书籍？")) {
                for (var i = 0; i < rows.length; i++) {
                    data.push(rows[i].id);
                }
                deleteBookById(data);
            }
        }
    });

    function deleteBookById(id) {
        $.ajax({
            type: 'POST',
            url: 'deletebook/',
            traditional: true,
            data: {
                'id': id
            },
            success: function (data) {
                console.log(data.status)
                $('#table').bootstrapTable('refresh');
            }
        })
    };


    function getBookList() {
        $('#table').bootstrapTable({
            method: 'POST',
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            url: 'getbooklist/',
            pagination: true,
            showRefresh: true,
            showToggle: true,
            buttonsAlign: 'left',
            cache: false,
            sidePagination: "server",
            pageNumber: 1,
            pageSize: 10,
            idField: 'id',
            responseHandler: function (res) {
                console.info(res);
                return {
                    'total': res.data.total,
                    'rows': res.data.bookList
                };
            },
            columns: [{
                checkbox: true,
                align: 'center'
            }, {
                formatter: function (value, row, index) {
                    return index + 1
                },
                title: '序号',
                align: 'center'
            }, {
                field: 'name',
                title: '书籍名称',
                align: 'center'
            }, {
                field: 'author',
                title: '书籍作者',
                align: 'center'
            }, {
                field: 'category',
                title: '书籍类型',
                align: 'center'
            }, {
                field: 'press',
                title: '出版社',
                align: 'center'
            }, {
                field: 'createTime',
                title: '创建时间',
                align: 'center'
            }, {
                field: 'Button',
                title: '操作',
                align: 'center',
                events: operateEvents,
                formatter: EditDeleteFunction
            }]
        });
    };

    getBookList();
});