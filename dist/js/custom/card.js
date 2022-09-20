

let cardListItems = $('.nlist-item');

cardListItems.mouseenter(function(event) {
    try {
        let prevEl = $(this).prev();
        if(prevEl.hasClass('top-border')) { 
            prevEl.css('visibility', 'hidden');
        }
        let nextEl = $(this).next();
        if(nextEl.hasClass('top-border')) {  
            nextEl.css('visibility', 'hidden');
        }
    } catch(err) {
        
    }
});

cardListItems.mouseleave(function(event) {
    try {
        let prevEl = $(this).prev();
        if(prevEl.hasClass('top-border')) {  
            prevEl.css('visibility', 'visible');
        }
        let nextEl = $(this).next();
        if(nextEl.hasClass('top-border')) {  
            nextEl.css('visibility', 'visible');
        }
    } catch(err) {
        
    }
});


let mainNewsCards =  $('.main-news-card');

mainNewsCards.mouseenter(function(event) {
    try {
        let prevEl = $(this).prev();
        if(prevEl.hasClass('featuer-card-tag') || prevEl.hasClass('light-featuer-card-tag')) {
            let featureTag = $(this).prev();
            featureTag.fadeOut(400);
        }
    } catch(err) {
        
    }
});

mainNewsCards.mouseleave(function(event) {
    try {
        let prevEl = $(this).prev();
        if(prevEl.hasClass('featuer-card-tag') || prevEl.hasClass('light-featuer-card-tag')) {
            let featureTag = $(this).prev();
            featureTag.fadeIn(400);
        }
       
    } catch(err) {
        
    }
});