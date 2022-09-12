
const cLayers = document.querySelectorAll('.layer');

const cImages = document.querySelectorAll('.img');


cLayers.forEach(function(layer) {
    
    layer.addEventListener('click', function(event) {

        let img = $(this).next()[0];
        

        if( img.classList.contains('not-active') ) {

            cImages.forEach(function(oimg) {
                oimg.classList.remove('active');
                oimg.classList.add('not-active');
                
                $(oimg).prev().show()
                $('#' + $(oimg).prev().data('id')).hide()
                $('#' + $(oimg).prev().data('content')).hide()
            });

            img.classList.remove('not-active');
            img.classList.add('active');

            $(this).hide()

            $('#' + $(this).data('id')).show()
            $('#' + $(this).data('content')).show()
        }
    });

});

