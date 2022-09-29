$(document).ready(function () {
    $('#myModal').on('show.bs.modal', function () {
        var mod = $('.modal'); 
        $('.wrap').html(mod);
    });
});