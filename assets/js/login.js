$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    })


    var form = layui.form;

    var msg = layer.msg;



    form.verify({
        psw: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 测两次密码是否一致

        repwd: function(value) {
            // console.log("55");
            var repwd = $('.reg-box [name=password]').val()

            if (repwd !== value) {
                return '两次密码不一致'
            }
            // 发起ajax请求



        }

    })

    // 监听事件



    $('#form_reg').on('submit', function(e) {
            var data = {
                    username: $('#form_reg  [name = username]').val(),
                    password: $('#form_reg [name=password]').val()
                } //写在监听事件的里面
                // 阻止默认行为
            e.preventDefault();
            $.post('http://ajax.frontend.itheima.net/api/reguser', data, function(res) {
                if (res.status != 0) {
                    console.log(res.message);
                    // return console.log(res.message);
                    // console.log("11");
                    return layer.msg(res.message)
                }
                // return '注册成功'为什么不能用return
                // console.log('注册成功');
                layer.msg('注册成功，请登录')

            })
        })
        // 监听登录事件


    $("#form_login").on("submit", function(e) {
        e.preventDefault();
        // 手动添加ajax
        $.ajax({
                url: 'http://ajax.frontend.itheima.net/api/login',
                method: 'POST',
                data: $(this).serialize(),

                success: function(res) {
                    if (res.status != 0) {
                        return layer.msg('登录失败')
                    }
                    layer.msg('登录成功')
                    console.log(res.token);
                    //将登录成功的token，保存在localStorage
                    localStorage.setItem('token', res.token);

                    // 跳转到后台页面

                    location.href = '/index.html';

                }









            })
            // console.log($(this).serialize());






    })



})