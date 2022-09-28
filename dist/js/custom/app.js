$articleSpinner = $('#article-spinner');
$articleCounter = $('#article-counter');



if($articleCounter) {
    setInterval(() => {
        $articleCounter.fadeOut(300, 'swing', () => {
            $articleSpinner.fadeIn(300, 'swing', () => {
                setTimeout(() => {
                    $articleSpinner.fadeOut(300, 'swing', () => {
                        $articleCounter.fadeIn(300);
                    });
                }, 2000);
            });
        });
    }, 7000);
}

$(function() {
  // Handler for .ready() called.
});

window.onload = function() {

    let shareIntervalHanlde = null;

    const shareBtns = $('#shere-btns');

    let icount = 0;

    shareIntervalHanlde = setInterval(function() {

        const addThisDesktop = $('.addthis-smartlayers-desktop')[0];
        const addThisMobile = $('.addthis-smartlayers-mobile')[0];

        if(addThisDesktop != undefined && addThisDesktop != undefined) {
            const addThisCustomSidebar = $('#at-custom-sidebar');
            addThisCustomSidebar.removeClass('at-custom-sidebar atss-left addthis-animated slideInLeft');
            addThisDesktop.style.display = 'none';
            addThisMobile.style.display = 'none';

            addThisCustomSidebar.css('width', '58px');
            addThisCustomSidebar.css('line-height', 'normal');
            addThisCustomSidebar.css('text-align', 'center');
        
            shareBtns.append(addThisDesktop);
        
            addThisDesktop.style.display = 'block';

            clearInterval(shareIntervalHanlde)
        }

        ++icount;

        if(icount == 5) {
            clearInterval(shareIntervalHanlde)
        }

    }, 50);
    







}







