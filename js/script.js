// Get input in searchbar and call function instead of refreshing page after click
$(document).ready(function(){
    var searchForm = $('#searchSong');
    var searchValue = $('#searchSong :input')[0];
        
    searchForm.submit(function(){
        event.preventDefault()
        callItunesApi(searchValue.value);
    });
});

// Call Itunes API
function callItunesApi(searchTerm){
    // Test if search term is being read
    //console.log(searchTerm);
    
    // AJAX call if searchTerm is present
    if(searchTerm){
        $.ajax({
            url: ('https://itunes.apple.com/search?term='+searchTerm),
            jsonp: "callback",
            data: {limit: 10},
            dataType: "jsonp"
        })
        .done(function(data){
            // tests if API is successfully called and data is grabbed
            console.log(data);
            var songListContainer = $('.songContainer');
            // empty the array each time you submit a search
            songListContainer.empty()
            prepareSongList(data.results)
            // .results refers to name of group of arrays
        })
        .fail(function(err){
            console.log(err);
        })
        .always(function(){
            console.log('done');
        })
    }
};

// Prepare songs and print on screen
function prepareSongList(songList){
    var songListContainer = $('.songContainer');
    //console.log(songList);
    
    songList.forEach(function(song){
        songListContainer.append(songElement(song));
    })
};

// Pull songs from list
function songElement(song){
    //console.log(song); // returns individual data objects
    
    var songElement = $('<div class="media"><div class="media-left"></div><div class="media-body"></div></div>');
    
    var trackName = $('<h2></h2>');
    var collectionName = $('<p></p>');
    var artistName = $('<p></p>');
    var artworkUrl100 = $('<img src="" />');
    var artistViewUrl = $('<a href="">Link</a>');
    var previewUrl = $('<br><br><audio controls><source src="" type="audio/m4a"></audio>')
    
    trackName.text('Song Name: ' + song.trackName);
    collectionName.text('Album: ' + song.collectionName);
    artistName.text('Artist: ' + song.artistName);
    artworkUrl100.attr('src', song.artworkUrl100);
    artistViewUrl.attr('href', song.artistViewUrl);
    previewUrl.attr('src', song.previewUrl);
    
    songElement
        .find('.media-body')
            .append(trackName)
            .append(collectionName)
            .append(artistName)
            .append(artistViewUrl)
            .append(previewUrl)
    songElement
        .find('.media-left')
            .append(artworkUrl100)
    
    return songElement
}