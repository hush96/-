$('#modifyForm').on('submit',function() {
    let forData = $(this).serialize();
    $.ajax({
        url :'/users/password',
        type: 'put',
        data: forData,
        success: function () {
            location.href = '/admin/login.html'
        }
    
        
    })
    return false
})