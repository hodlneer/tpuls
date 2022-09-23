
const cLayers = document.querySelectorAll('.layer');

const cImages = document.querySelectorAll('.carousel-img');


cLayers.forEach(function(layer) {
    
    layer.addEventListener('click', function(event) {

        let img = $(this).parent()[0];
        

        if( img.classList.contains('not-active') ) {

            cImages.forEach(function(oimg) {
                oimg.classList.remove('active');
                oimg.classList.add('not-active');
                
                $(oimg).find(':first-child').fadeIn('slow');
                $('#' +  $(oimg).find(':first-child').data('id')).hide();
                $('#' +  $(oimg).find(':first-child').data('content')).hide();
            });

            img.classList.remove('not-active');
            img.classList.add('active');

            $(this).fadeOut('slow')

            $('#' + $(this).data('id')).fadeIn('slow')
            $('#' + $(this).data('content')).fadeIn('slow')
        }
    });

});

