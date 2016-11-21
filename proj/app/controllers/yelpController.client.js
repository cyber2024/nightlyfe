var inputLocation = document.querySelector('#location');
var btnSearch = document.querySelector('#btnSearch');
var apiURL = 'https://nightlyfe-cyber2024.c9users.io/api/';
var list = document.querySelector('.pub-list');
var stringdata;
var parseddata;
var tmpLi = '<li class="list-item"></li>';

var tmplText = '<li class="list-item"><img class="list-img" src="http://findicons.com/files/icons/1176/dine_o_matic/128/pub.png"/><div class="list-item-right"><div class="list-name bordered">Loading pub...</div><hr/><div class="list-desc bordered">Loading description...</div><hr/><div class="list-rating-label">User Rating: </div><div class="list-rating bordered">?</div><div class="list-rating-label">/5</div></div></li>';

function htmlToTemplate(html){
    var tmpl = document.createElement('template');
    tmpl.innerHTML = tmplText;
    return tmpl.content.firstChild;
} 

btnSearch.addEventListener('click',function(e){
    console.log('clicked search',e.target);
    console.log('searching for ', inputLocation.value);
    ajaxFunctions.ready(
        ajaxFunctions.ajaxRequest("POST", apiURL + 'yelp_search', function(data){
            list.innerHTML = '';
            stringdata = data;
            parseddata = JSON.parse(data);
            var d = JSON.parse(parseddata);
            for(var i = 0; i < d.businesses.length; i++){
                var li = htmlToTemplate();
                var img = li.querySelector('.list-img');
                img.src = d.businesses[i].image_url;
                var name = li.querySelector('.list-name');
                name.textContent = d.businesses[i].name;
                var rating = li.querySelector('.list-rating');
                rating.textContent = d.businesses[i].rating;
                var shortDescription = li.querySelector('.list-desc');
                shortDescription.textContent = d.businesses[i].snippet_text;
                list.appendChild(li);
            }
        }, JSON.stringify({location:inputLocation.value})));
    
});

