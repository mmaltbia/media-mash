var apiKey = 'aed6f0e06ba82459eda02de5aaca4980';
var apiURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=';
var tagsURL = 'https://api.flickr.com/services/rest/?method=flickr.tags.getListPhoto&api_key=';
var terms;
var tags;
var height;
var width;
var item;
var tagData;
var btn;
function stopCall(){
    return false;
}

$(document).ready(function(){

    $(document).on('click', '.search-btn1', '.search-btn2', function(e){
        e.preventDefault();
        $('.suggested').css('display', 'none');
        $('#images').empty();
        console.log(e.target.id);
        var btn = e.target.id;
        if(btn === "search-btn1"){
            var terms = function(btn){
                var btn = btn;
                var terms = {
                    searchValue1: $('#query').val()
                };
                tags = terms.searchValue1;
                btn = 'search-btn1';
                return btn;
            }
            terms();
        }
        if(btn === "search-btn2"){
            var terms = function(btn){
                var btn = btn;
                var terms = {
                    searchValue2: $('#query2').val()
                };
                tags = terms.searchValue1;
                btn = 'search-btn2';
                return btn;
            }
            terms();
        }
        console.log(btn);

        var url = apiURL + apiKey + '&tags=' + tags + "&extras=url_o&license=5&per_page=99&format=json&jsoncallback=?";
        $.getJSON(url, function(data){

            $.each(data.photos.photo, function(i,item){
                var source = "Flickr";
                src = "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_b.jpg";
                var srcHome = "http://www.flickr.com/photos/"+item.owner+"/"+item.id;
                var item= item.id;
                getMeta(src, srcHome, source, item);

                function getMeta(url, srcHome, source, item){ 
                    var img = new Image();
                    var item = item;
                    img.addEventListener("load", function(){
                        var width = this.naturalWidth;
                        var height = this.naturalHeight;

                        if(width > height){

                            function getTags(item){
                                id = item;
                                //Get the tags for each Image
                                var urlTag = tagsURL + apiKey + '&photo_id=' + id + '&format=json&jsoncallback=?';
                                $.getJSON(urlTag, function(tagData){
                                    var tagDataArr = tagData.photo.tags.tag;
                                    var tagsArr = [];
                                    for(i=0; i < tagDataArr.length; i++){
                                        var content = tagDataArr[i].raw;
                                        tagsArr.push(content);
                                    }

                                    $("#images").append('<button class="col-xs-6 col-sm-4 well animated fadeIn"><img id="img-'+ $('#images')[0].childElementCount +'" src="'+ img.src +'" onClick="getAdditional(event)" width="100%" height="250px" data-source="'+ source +'" data-link="'+ srcHome +'" data-index="'+$('#images')[0].childElementCount+'" data-toggle="modal" data-target="#myModal" data-tags="'+ printTags(tagsArr)+'"/></button>');

                                    function printTags(tagsArr){
                                        for(i=0; i<tagsArr.length; i++){
                                            var text = tagsArr[i];
                                            if(i===0){
                                                var tagTextStr = text;
                                                i++;
                                            }
                                            else {
                                                var tagTextStr = tagTextStr + ", " + text ;
                                                i++;
                                            }
                                        }
                                        return tagTextStr;
                                    }
                                })
                            }
                            getTags(item);
                        }
                    });
                    img.src = url;
                }
            })
        })
        var unsplashUrl = "https://api.unsplash.com/photos/search?client_id=de40156cd68ca2452b915dd405ee0ed2750042cce1138c9173dce2f15aa28061&query=" + tags;
        //        $.getJSON(unsplashUrl, function(data){
        //            $.each(data, function(i,item){
        //                console.log(data);
        //                var source = "Unsplash";
        //                src = item.urls.regular;
        //                var srcHome = item.links.html;
        //                var item= item.id;
        //
        //                getMeta(src, srcHome, source, item);
        //            })
        //        })
    })

});