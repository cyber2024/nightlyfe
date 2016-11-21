var appURL = window.location.origin;
console.log('appURL', appURL);

var ajaxFunctions = {
    ready: function ready(fn){
        if(typeof fn !== 'function'){
            return;
        }
        if(document.readyState === 'complete'){
            return fn();
        }
        document.addEventListener('DOMContentLoaded',fn, false);
    },
    
    ajaxRequest: function ajaxRequest(method, url, callback, data){
        console.log('ajax data', data);
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
                callback(xmlhttp.response);
            } else {
                
            }
        };
        
        xmlhttp.open(method, url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(data);
    }
}