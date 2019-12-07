
$('#user-form').on('submit',function() {
    let obj = $(this).serialize()
    $.ajax({
        url:'/users',
        type:'post',
        data: obj,
        success: function () {
            location.reload()
        },
        error: function() {
            alert('报错')
        }
    })
    
    return false
})

$('#modifyBox').on('change','#avatar',function() {
    let forData = new FormData();
    forData.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:forData,
        processData:false,
        contentType:false, 
        success: function(response) {
            console.log(response);
            $('#preview').attr('src',response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar)
            
        }
    })
})

$.ajax({
    type:'get',
    url:'/users',
    success:function (response) {
        console.log(response);
        var html = template('userTpl',{data:response});
        $('#userBox').html(html)
        
    }
})

$('#userBox').on('click','.edit',function() {
     let id = $(this).attr('data-id');
     $.ajax({
         type:'get',
         url: '/users/' +id ,
         success: function(response) {
             console.log(response);
             let html = template('modifyTpl',response);
             $('#modifyBox').html(html)
                   
         }
     })
     
})

$('#modifyBox').on('submit','#modifyForm',function() {
    let formData = $(this).serialize();
    
    let id = $(this).attr('data-id');
    //console.log(id);
    
    $.ajax({
        type:'put',
        url: '/users/' + id,
        data: formData,
        success: function (response) {
           location.reload()
            
        }
    })
    return false
})

$('#userBox').on('click','.delete',function() {
    if (confirm('要删除用户吗')) {
        let id = $(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/users/' +id,
            success: function() {
                location.reload()
            }
        })
        
    }
})

let selecAll = $('#selectAll');
let deleteMany = $('#deleteMany')
selecAll.on('change',function() {
    let status = $(this).prop('checked');
    if (status) {
        deleteMany.show()
    } else {
        deleteMany.hide()
    };
    $('#userBox').find('input').prop('checked',status)
    
});

$('#userBox').on('change','.userStatus',function() {
    let inputs = $('#userBox').find('input');
    if (inputs.length == inputs.filter(':checked').length) {
        selecAll.prop('checked',true)
    } else {
        selecAll.prop('checked',false)

    };
    if (inputs.filter(':checked').length > 0) {
        deleteMany.show()
    } else {
        deleteMany.hide()
    }
})

deleteMany.on('click',function() {
    let ids = [];
    let checkedUser = $('#userBox').find('input').filter(':checked');
    checkedUser.each(function (index, element) {
        ids.push($(element).attr('data-id'))
    });
    if (confirm('要删除用户吗')) {
        $.ajax({
            type : 'delete',
            url: '/users/' + ids.join('-'),
            success: function() {
                location.reload()
            }
        })
    }
    
})