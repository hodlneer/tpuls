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







