const http = require('../ajax');
// const http = require('http');
window.onload = function () {
    document.getElementById('login').onclick = function () {
        let user = 'liyan';
        let pwd = '123456';
        http.ajax({
            url: "/api/login?user='" + user + "'&pwd='" + pwd + "'",
            method: "GET",
            dataType: "JSON",
            data: {
                userTel: '18242052987',
                codeType: '绑定手机'
            },
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: (res) => {
                alert(res.msg);
                console.log(res);
            },
            error: (res) => {
                console.log(res);
            }
        });
    };
};
