$(function() {

    // set ngày tháng mặc định cho ô input
    var date = new Date();
    var local = date.toISOString().substring(0, 10);
    $("#start-date").val(local);
    $("#end-date").val(local);
    
    $.ajax({
        url: "https://gnews.io/api/v4/top-headlines?&max=10&token=39f234bb19b1dfcf90af7fa730dc7af1&lang=en",
        dataType: 'json',
        type: "get",
        cache: false,
        success: function(data) {

            $("#content").html("");
            $('.loader').fadeIn('fast');
            // ghi dữ liệu ra website
            $(data.articles).each(function(index,values) {
                $("#content").append(
                    '<div class="row mt-3 mb-3 contents border">' +
                        '<div class="content-img col-12 col-sm-3 col-md-3">' +
                            '<img class="img-fluid" width="100%" src="' + values.image + ' alt="#" class="img">'+
                        '</div>' +
                        '<div class="content-text col-12 col-sm-9 col-md-9">' +
                            '<h4><a href="'+ values.url +'" target="_blank">' + values.title + '</a></h4>' +
                            '<p>' + values.publishedAt + '</p>' +
                            '<p>' + values.content.substring(0, 150) + ' ...' + '</p>' +
                        '</div>' +
                    '</div>'
                );
            });
            $('.loader').delay(1000).fadeOut('fast');
        }
    });

    // hiển thị hộp tìm kiếm
    $("#search").on('click', function() {
        $(".backdrop, .search-box").css("display", "block");
    });

    // tìm kiếm khi click button search
    $("#search-btn").click(function() {
        // xóa nội dung cũ
        $("#content").html("");
        // hiển thị biểu tượng load mỗi khi load nội dung trang
        $('.loader').fadeIn('fast');
        //lấy giá trị từ ô  input
        var startDate = new Date($("#start-date").val()).toISOString().substring(0,10);
        var endDate = new Date($("#end-date").val()).toISOString().substring(0,10);
        var key = $("#search-input").val();

        var endpoint = "https://gnews.io/api/v4/search?q=" + key + "&from=" + startDate + "T00:00:00Z&to=" +
                        endDate + "T00:00:00Z&max=10&token=39f234bb19b1dfcf90af7fa730dc7af1&lang=en";
        fetch(endpoint)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
            $(data.articles).each(function(index,values) {
                $("#content").append(
                    '<div class="row mt-3 mb-3 border">' +
                        '<div class="content-img col-12 col-sm-3 col-md-3">' +
                            '<img class="img-fluid" width="100%" src="' + values.image + ' alt="#" class="img">'+
                        '</div>' +
                        '<div class="content-text col-12 col-sm-9 col-md-9">' +
                            '<h4><a href="'+ values.url +'" target="_blank">' + values.title + '</a></h4>' +
                            '<p>' + values.publishedAt + '</p>' +
                            '<p>' + values.content.substring(0, 150) + ' ...' + '</p>' +
                        '</div>' +
                    '</div>'
                );

                
            });
            $('.loader').delay(1000).fadeOut('fast');
        });

        // tắt hộp thoại tìm kiếm khi tìm xong
        $(".backdrop, .search-box").css("display", "none");
    });

    // bắt sự kiện tìm kiếm khi người dùng ấn enter
    $('#search-input').keypress(function(event){

        // kiểm tra trình duyệt hỗ trợ keyCode hay which
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            // xóa nội dung cũ
            $("#content").html("");
            $('.loader').fadeIn('fast');
            //lấy giá trị từ ô  input
            var startDate = new Date($("#start-date").val()).toISOString().substring(0,10);
            var endDate = new Date($("#end-date").val()).toISOString().substring(0,10);
            var key = $("#search-input").val();

            var endpoint = "https://gnews.io/api/v4/search?q=" + key + "&from=" + startDate + "T00:00:00Z&to=" +
                        endDate + "T00:00:00Z&max=10&token=39f234bb19b1dfcf90af7fa730dc7af1&lang=en";
            fetch(endpoint)
            .then(function (response) {
                // thay đổi kiểu trả về là json
                return response.json();
            })
            .then(function (data) {
                // show dữ liệu ra website
                $(data.articles).each(function(index,values) {
                    $("#content").append(
                        '<div class="row mt-3 mb-3 border">' +
                            '<div class="content-img col-12 col-sm-3 col-md-3">' +
                                '<img class="img-fluid" width="100%" src="' + values.image + ' alt="#" class="img">'+
                            '</div>' +
                            '<div class="content-text col-12 col-sm-9 col-md-9">' +
                                '<h4><a href="'+ values.url +'" target="_blank">' + values.title + '</a></h4>' +
                                '<p>' + values.publishedAt + '</p>' +
                                '<p>' + values.content.substring(0, 150) + ' ...' + '</p>' +
                            '</div>' +
                        '</div>'
                    );
                });
                $('.loader').delay(1000).fadeOut('fast');
            });

            // tắt hộp thoại tìm kiếm khi tìm xong
            $(".backdrop, .search-box").css("display", "none");
        }
    });

    // tắt hộp thoại tìm kiếm khi ấn [X]
    $(".close").click(function() {
        $(".backdrop, .search-box").css("display", "none");
    });
    // tắt hộp thoại tìm kiếm khi click chuột ra ngoài
    $(".backdrop").click(function() {
        $(".backdrop, .search-box").css("display", "none");
    });

    // hien thi side khi di chuot vao logo
    $(".logo a").mouseenter(function() {
        $('#sideNavigation').css("width", "300px");
    });

    // tat side khi click vao page
    $(document).click(function() {
        $('#sideNavigation').css("width", "0px");
    });
    
    // hiển thị khi người dùng click menu Top headline
    $("#list-item1").click(function() {

        $("#content").html("");
        $('.loader').fadeIn('fast');

        var url = "https://gnews.io/api/v4/top-headlines?&max=10&token=39f234bb19b1dfcf90af7fa730dc7af1&lang=en";
        fetch(url)
        .then(function (response) {
            // thay đổi kiểu trả về là json
            return response.json();
        })
        .then(function (data) {
            $(data.articles).each(function(index,values) {
                $("#content").append(
                    '<div class="row mt-3 mb-3 border">' +
                        '<div class="content-img col-12 col-sm-3 col-md-3">' +
                            '<img class="img-fluid" width="100%" src="' + values.image + ' alt="#" class="img">'+
                        '</div>' +
                        '<div class="content-text col-12 col-sm-9 col-md-9">' +
                            '<h4><a href="'+ values.url +'" target="_blank">' + values.title + '</a></h4>' +
                            '<p>' + values.publishedAt + '</p>' +
                            '<p>' + values.content.substring(0, 150) + ' ...' + '</p>' +
                        '</div>' +
                    '</div>'
                );
            });
            $('.loader').delay(1000).fadeOut('fast');
        });

        $('#sideNavigation').css("width", "0px");
    });
});
