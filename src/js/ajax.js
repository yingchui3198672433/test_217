function ajax(opt) {
    var def = {
            dataType: 'string',
            type: 'get',
            async: true,
            success: null,
            error: null
        },
        setting = Object.assign({}, def, opt),
        xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.onload = function() {
        if ((xhr.status == 200 && xhr.status < 300) || xhr.status == 304) {
            setting.success && setting.success(setting.dataType == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText);
        } else {
            setting.error && setting.error(xhr.status);
        }
    }
    xhr.open(setting.type, setting.url, setting.async);
    xhr.send();
};