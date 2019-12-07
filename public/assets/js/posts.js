$.ajax({
    type:'get',
    url:'/posts',
    success: function(response) {
        let html = template('postsTpl',response);
        $('#postsBox').html(html)
        
    }
});
function formateDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}