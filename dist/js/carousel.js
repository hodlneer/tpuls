
const cLayers = document.querySelectorAll('.layer');

const cImages = document.querySelectorAll('.carousel-img'); //

let current = cImages[0];

function handleMediaQuery(x) {
    if (x.matches) { // If media query matches
       if(current) {
        // $(current).append($('#' +  $(current).find(':first-child').data('id'))[0])
       }
    } else {
        $('#img-content').append($('#' +  $(current).find(':first-child').data('id'))[0]);
    }
  }

let x = window.matchMedia("(max-width: 929px)")
handleMediaQuery(x) 
x.addEventListener('change', () => {
    handleMediaQuery(x);
});



cLayers.forEach(function(layer) {
    
    layer.addEventListener('click', function(event) {

        let img = $(this).parent()[0]; //
        

        if( img.classList.contains('not-active') ) {

            cImages.forEach(function(oimg) {
                
                oimg.classList.remove('active');
                oimg.classList.add('not-active');

                current = oimg;

                if (!x.matches) { 
                    $('#img-content').append($('#' +  $(oimg).find(':first-child').data('id'))[0]);
                } else {
                    $(oimg).append($('#' +  $(oimg).find(':first-child').data('id'))[0])
                }
                
                $(oimg).find(':first-child').fadeIn('slow')//
                $('#' +  $(oimg).find(':first-child').data('id')).hide()//
                $('#' +  $(oimg).find(':first-child').data('content')).hide()//

            });

            img.classList.remove('not-active');
            img.classList.add('active');

            $(this).fadeOut('slow')

            $('#' + $(this).data('id')).fadeIn('slow')
            $('#' + $(this).data('content')).fadeIn('slow')
        }
    });

});

