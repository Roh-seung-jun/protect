<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="token" content="{{csrf_token()}}">
    <title>Document</title>
    <link rel="stylesheet" href="./public/css/bootstrap.min.css">
    <link rel="stylesheet" href="./public/css/style.css">
    <script src="./resources/js/jquery-3.6.0.min.js"></script>
    <script src="./resources/js/bootstrap.min.js"></script>
    <script src="./resources/js/script.js"></script>
</head>
<body>
<input type="radio" name="open" id="open" class="d-none">
<input type="radio" name="open" id="close" class="d-none" checked>
<input type="checkbox" name="open" id="share" class="d-none">
<div class="position-fixed menu h-100" style="margin-left: -30px;left: 100%;z-index:235235235">
    <div class="d-flex h-100 margin_event">
        <div class="menu_bar">
            <label for="open" class="d-flex justify-content-center align-items-center position-absolute menu_open open_menu"><img src="./public/img/open.png" alt=""></label>
            <label for="close" class="d-flex justify-content-center align-items-center position-absolute menu_open close_menu"><img src="./public/img/close.png" alt=""></label>
            <label for="share" class="d-flex justify-content-center align-items-center icon share_icon" style="margin-top:200px;
"><img src="./public/img/share.png" alt=""></label>
            <label for="close" class="d-flex justify-content-center align-items-center icon icon_1 so mt-4"><img src="./public/img/so_1.png" alt=""></label>
            <label for="close" class="d-flex justify-content-center align-items-center icon icon_2 so mt-4"><img src="./public/img/so_2.png" alt=""></label>
            <label for="close" class="d-flex justify-content-center align-items-center icon icon_3 so mt-4"><img src="./public/img/so_3.png" alt=""></label>
        </div>
        <div class="menu_box d-flex justify-content-center align-items-center flex-column">
            <a href="{{route('/')}}"><p class="m-1 w-100">Home</p></a>
            <a href="{{route('map')}}"><p class="m-1 w-100">특산품 안내</p></a>
            <a href="{{route('event')}}"><p class="m-1 w-100">이벤트</p></a>
            <a href="{{route('review')}}"><p class="m-1 w-100">구매후기</p></a>
        </div>
    </div>
</div>
@yield('contents')
</body>
</html>
