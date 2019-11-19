function ajax({url,method,dataType,data,headers,success,error}) {
    function createXHR() {
        if (typeof XMLHttpRequest !== 'undefined') {
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject !== 'undefined') {
            if (typeof arguments.callee.activeXString !== 'string') {
                let versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'], i, len;
                for (i = 0, len = versions.length; i < len; i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (e) {
                        console.log('不存在！！')
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        }
    }
    const xhr = new createXHR();
    if (method.toLowerCase() !== 'get') {
        url = url + "?";
        for (let key in data) {
            let value = data[key];
            url += key + "=" + value + "&";
        }
        data = null;
    }
    xhr.open(method,url);
    /*要成功发送setRequestHeader()头部信息，必须在open()之后，send()之前调用*/
    for (let key in headers) {
        let value = headers[key];
        xhr.setRequestHeader(key, value);
    }
    xhr.send(data);
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                success.call(undefined, JSON.parse(xhr.responseText));
                document.writeln(xhr.getResponseHeader('Content-Type') + ":::::");
                document.writeln(xhr.getAllResponseHeaders());
            } else {
                error.call(undefined, xhr);
            }
        }
    };
};
module.exports = {
    ajax
};
