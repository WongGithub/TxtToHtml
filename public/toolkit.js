/**
 * Mr.Wong
 * 201307271042
 * Toolkit 2.0
 * **/

;
(function ($,W,D) {
    var _t = {};
    /**
     * Hide Address
     * **/
    _t.hideAddress = function () {
        var _height = window.screen.height,
            _body = document.getElementsByTagName('body')[0];
        _body.setAttribute('style', 'height:' + _height + 'px');
        W.scrollTo(0, 1);
        setTimeout(function () {
            _body.setAttribute('style', '');
        }, 0.4 * 1000);
    }
    /**
     * Touch event
     * **/
    _t.Touch = (function () {
        var istouch = 'ontouchstart' in window,
            start = istouch ? 'touchstart' : 'mousedown',
            move = istouch ? 'touchmove' : 'mousemove',
            end = istouch ? 'touchend' : 'mouseup';
        return {
            start: start,
            move: move,
            end: end,
            isTouch:istouch
        }
    })();
    /**
     * 版本判断
     * **/
    _t.Prefix = (function(){
        var style = D.createElement('div').style,
            prefixs = ['t','webkitT','mozT','msT'];
        for(var i= 0,len=prefixs.length;i<len;i++){
            var at = prefixs[i]+'ransform';
            if(at in style){
                var pf = prefixs[i].substr(0,prefixs[i].length-1);
                return pf?'-'+pf+'-':'';
            }
        }
    })();
    /**
     * wipe off the event
     * **/
    _t.PreventDefault = function (e) {
        if(e){
            e.preventDefault();
        }else{
            window.event.returnValue = true;
        }
        var e = e || window.event;
        return e;
    };
    /**
     * Cookie handle
     */
    _t.Cookie = {
        _add: function (objName, objValue, objDays, Domain) {
            var str = objName + "=" + encodeURIComponent(objValue);
            if (objDays > 0) {
                var date = new Date();
                var ms = objDays * 3600 * 1000 * 24;
                date.setTime(date.getTime() + ms);
                str += ";expires=" + date.toGMTString();
            }
            document.cookie = str + (Domain?';domain='+Domain+';path=/':'');
        },
        _del: function (name, domain, path) {
            document.cookie = window.encodeURIComponent(name) + "=" +
                (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
        },
        _get: function (name) {
            var strcookie = document.cookie;
            var arrcookie = strcookie.split("; ");
            for (var i = 0; i < arrcookie.length; i++) {
                var arr = arrcookie[i].split("=");
                if (arr[0] == name) {
                    return decodeURIComponent(arr[1]);
                }
            }
            return "";
        }
    };
    /**
     * Location.search handle
     * **/
    _t.QueryString = function (key) {
        var search = window.location.search + '';
        if (search.charAt(0) != '?') {
            return undefined;
        }

        var pairs = search.substr(1).split('&'), search = {};
        for (var i = 0, len = pairs.length; i < len; i++) {
            var pair = pairs[i].split('=');
            search[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }

        if (arguments.length === 0) {
            return search;
        } else {
            return search[key];
        }
    }
    /**
     * Dev:Mr.Wong
     * Hash handle
     * type: 设置hash为获取hash参数，设置search为获取url？后面的参数
     * keys: 如果设置为获取hash参数，则keys参数为必填，keys是hash的参数名，Example：['id','name','number']，对应hash的每个参数值，
     *       如果设置为获取search参数，无需设置keys
     * 调用Gethash将会返回一个获取参数方法，通过这个方法获取参数
     * 例如：
     *  var get = Gethash('hash',['id','name']),
     *      id = get('id');
     *  var get = Gethash('search'),
     *      id = get('id');
     * **/
    _t.GetUrlParam = function (param) {
        var type = param.type,
            keys = param.keys || '';
        switch (type){
            case 'hash':
                return function getKey(key) {
                    var hash = window.location.hash,
                        hashs,
                        param = {};
                    if (!hash || !keys) {
                        return undefined;
                    }
                    hashs = hash.split('/');
                    for (var i = 0, len = hashs.length; i < len; i++) {
                        param[keys[i]] = decodeURIComponent((hashs[i].split('?'))[0]);
                    }
                    if(key){
                        return param[key].replace('#','');
                    }else{
                        return hash;
                    }
                }
                break;
            case 'search':
                return function getQuery(key,url){
                    var query = url || window.location.search || window.location.hash,
                        _query = query.split('?')[1],
                        parts,
                        part = '',
                        param = {};
                    if(!_query){
                        return undefined;
                    }
                    parts = _query.split('&');
                    for(var i = 0,len = parts.length;i<len;i++){
                        part = parts[i].split('=');
                        param[decodeURIComponent(part[0])] = decodeURIComponent(part[1]);
                    }
                    if(key){
                        return param[key];
                    }else{
                        return query;
                    }
                }
                break;
        }

    }

    /**
     * Set transform
     * **/
    _t.setTransform = function (obj, x, y,type) {
        if(!obj)return;
        var val_3d = 'translate3d(' + x + type + ',' + y + type + ',' + 0 +')',
            val_2d = 'translate(' + x + type + ',' + y + type + ')';
        obj.style.webkitTransform = val_3d;
        obj.style.mozTransform = val_2d;
        obj.style.oTransform = val_2d;
        obj.style.transform = val_3d;
        return obj;
    }
    /**
     * Set transition
     * **/
    _t.setTransition = function(obj,attr,time,type) {
        if(!obj)return;
        var val = attr+' '+time+'s '+ (type||'ease-in');
        if(_t.Prefix == '-webkit-'){
            obj.style.webkitTransition = attr == 'all'? val:'-'+_t.Prefix +'-'+ val;
        }else if(_t.Prefix == '-moz-'){
            obj.style.mozTransition =  attr == 'all'? val:'-'+_t.Prefix +'-'+ val;
        }else if(_t.Prefix == '-o-'){
            obj.style.oTransition =  attr == 'all'? val:'-'+_t.Prefix +'-'+ val;
        }else{
            obj.style.transition = val;
        }
        return obj;

    }
    _t.delTransition = function(obj){
        if(!obj)return;
        var val = '';
        obj.style.webkitTransition = val;
        obj.style.mozTransition = val;
        obj.style.oTransition = val;
        obj.style.transition = val;
        return obj;
    }
    /**
     * CancelBubble
     * 阻止冒泡
     * **/
    _t.CancelBubble = function(e) {
        if (e.stopPropagation) e.stopPropagation();
        else e.cancelBubble = true;
        return e;
    }
    /**
     * OrientationChange
     * **/
    _t.OrientationChange = function(callback){
        window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', function () {
            setTimeout(function () {
                callback&&callback();
            }, 'onorientationchange' in window ? 0 : 300);
        }, true);
    }
    /**
     * Dialog
     * dev:Mr.Wong
     * 1.创建一个实例
     * 2.param:(example)
     *      dialogId:'#id'
     *      dialogClass:'.class'
     *      content: Set content,support HTML
     *      button:[{},{}](optional)
     *            {
     *                id:'#btnid'
     *                cb:callback
     *                hoverCb:callback
     *            }
     * **/
    _t.Dialog = function(param) {
        if (!param || !param.dialogId || !param.dialogClass)return;
        //参数初始化
        var content = param.content || '',
            button = param.button || '',
            dialogId = param.dialogId,
            dialogClass = param.dialogClass,
            bgHide = param.bgHide || '',
            dialog = document.createElement('div');
        dialog.id = dialogId.replace('#', '');
        dialog.className = 'dialogBox ' + dialogClass.replace('.','');
        dialog.innerHTML = content;
        document.body.appendChild(dialog);
        if(bgHide.isHide){
            dialog.addEventListener('click',function(){
                  bgHide.cb();
            });
        }
        if (button) {
            for (var i = 0, len = button.length; i < len; i++) {
                var btn = document.getElementById(button[i].id.replace('#','')),
                    btnCb = button[i].cb || function(){return},
                    hoverCb = button[i].hoverCb || function(){return};
                if(W.addEventListener){
                    btn.addEventListener('mousedown',hoverCb)
                    btn.addEventListener('mouseup', btnCb);
                }else{
                    btn.attachEvent('mousedown',hoverCb)
                    btn.attachEvent('mouseup', btnCb);
                }

            }
        }
        this.dialog = dialog;
        return dialog;
    }
    /**
     * UA judge
     * **/
    _t.UAhandle = (function(){
        var ua = W.navigator.userAgent;
        function isIE(){
            return /MSIE\s([\d.]+)/.test(ua);
        }
        function isChrome(){
            return /Chrome\/([\d.]+) (Mobile)?/.test(ua);
        }
        function isMChrome(){
            return /CriOS/.test(ua);
        }
        function isFF(){
            return /Firefox\/([\d.]+)/.test(ua);
        }
        function isIEver(ver){
            var reg = new RegExp('MSIE[ ]'+ver);
            return reg.test(ua);
        }
        function isUC(){
            return /(?:UC|UCBrowser)[ /]([\d.]+)?/.test(ua);
        }
        function isQQ(){
            return /MQQBrowser\/([\d.]+)/.test(ua);
        }
        function getIEver(){
            /MSIE[ ]?(\d*)[;]?/.test(ua);
            return parseInt(RegExp.$1);
        }
        function isAndroid(){
            return /Android[ ]([\d.]+)?/.test(ua);
        }
        function isIOS(){
            return /OS[ ]?([\d_]+)?[ ]?like[ ]?Mac[ ]?OS[ ]?X/.test(ua);
        }
        return{
            isIE:isIE,
            isChrome:isChrome,
            isMChrome:isMChrome,
            isFF:isFF,
            isIEver:isIEver,
            isUC:isUC,
            isQQ:isQQ,
            isAndroid:isAndroid,
            isIOS:isIOS,
            getIEver:getIEver
        }
    })();
    /**
     * 数据获取方法
     *
     *
     * **/
    _t.DAL = (function($){
        getdata = function(param){
            //判断是否有参数
            if(!param) return false;
            //参数预设
            var p = {
                url:param.url,
                type:param.type || 'get',
                dataType:param.dataType||'json',
                data:param.data || '',
                cache:param.cache || false,
                timeout:param.timeout || 0,
                beforeSend:param.beforeSend || function(xhr){
                    //xhr.withCredentials = true;//解决跨域发送验证信息问题
                },
                success:function (data) {
                    if(!data){
                        param.nodata && param.nodata();
                        //console.log('nodata');
                        return;
                    }
                    param.success && param.success(data);
                },
                error:param.error || function (e) {
                    //console.log(e);
                }
            }

            //ajax路线
            function getAjax(p) {
                $.ajax({
                    url:p.url,
                    type:p.type,
                    dataType:p.dataType,
                    cache:p.cache,
                    data:p.data,
                    timeout:p.timeout,
                    beforeSend:p.beforeSend,
                    success:p.success,
                    error:p.error
                });
            }
            getAjax(p);
        }

        return {
            getdata:getdata
        }

    })($);

    /** requestAnimationFrame 兼容 **/
    _t.RequestAFrame = (function () {
        return W.requestAnimationFrame ||
            W.webkitRequestAnimationFrame ||
            W.mozRequestAnimationFrame ||
            W.oRequestAnimationFrame ||
            function (callback) {
                return W.setTimeout(callback, 1000 / 60); // shoot for 60 fps
            };
    })();
    /** cancelAnimationFrame 兼容 **/
    _t.CancelAFrame = (function () {
        return W.cancelAnimationFrame ||
            W.webkitCancelAnimationFrame ||
            W.mozCancelAnimationFrame ||
            W.oCancelAnimationFrame ||
            function (id) {
                W.clearTimeout(id);
            };
    })();

    /** 判断CSS 3D特性 **/
    _t.has3D = (function(){
        var browser = _t.UAhandle;
        if(browser.isFF() || browser.isQQ()){
            return true;
        }else if(browser.isUC() && browser.isAndroid()){
            return false;
        }else if(browser.isIE()){
            return false;
        }
        var body = D.body, el = D.createElement('div'), has3d = true,
            transforms = _t.Prefix + 'transform';
        body.appendChild(el);
        if( el.style[transforms] !== undefined ){
            el.style[transforms] = 'perspective(1000px) rotateY(90deg)';
            has3d = (el.getBoundingClientRect().width === 0);
        }
        body.removeChild(el);
        return has3d?true:false;
    });

    /** APP全屏方法 **/
    _t.FullScreen = (function(){
         return function(clickObj,fullScreenObj){
            var _clickObj = clickObj.on?clickObj[0]:clickObj,
                _fullScreenObj = fullScreenObj.on?fullScreenObj[0]:fullScreenObj;//判断是否JQ对象，是则转换成dom对象

            _clickObj.addEventListener('click',function(){
                var rfs = _fullScreenObj.requestFullscreen ? 'requestFullscreen':
                          _fullScreenObj.mozRequestFullScreen ?'mozRequestFullScreen':
                          _fullScreenObj.webkitRequestFullscreen ?'webkitRequestFullscreen':
                          _fullScreenObj.msRequestFullscreen ?'msRequestFullscreen':
                          null;

                if(rfs){
                    _fullScreenObj[rfs]();
                }
            });

         }
    })();

    //TODO _t.CancelFullScreen

    /** 特性检测
     *
     * 需要modernizr.js库支持
     *
     * 参数可以是单字符串，或者一个特性数组，建议以数组形式
     *
     * 例如：CheckCharacter(['canvas','js',...]);
     *
     * 返回true or false
     * **/
    _t.CheckCharacter = function (param){
        if(!param)return;
        var character = document.getElementsByTagName('html')[0].getAttribute('class').split(' '),
            param_type = param.constructor+'';
        if(param_type.indexOf('String') != '-1'){
            for(var i = 0, len = character.length;i<len;i++){
                if(param == character[i]){
                    return true;
                }
            }
            return false;
        }else if(param_type.indexOf('Array') != '-1'){
            var pass = [];
            for(var _i= 0,_len=param.length;_i<_len;_i++){

                for(var i = 0, len = character.length;i<len;i++){

                    if(param[_i] == character[i]){
                        pass.push(param[_i]);
                    }
                }

            }
            if(pass.length != param.length){
                return false;
            }else{
                return true;
            }
        }
    }

    W.Toolkit = _t;

})($,window,document);
