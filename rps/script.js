function setActiveButton(btn) {
    var wrapper = $(btn).parent();
    wrapper.find('img').removeClass('active')
    $(btn).addClass('active')
}

$('img').on('click', function(){
    setActiveButton($(this))

});