$(document).ready(function() {
    $('#myModal').modal();
    $('#myModal').on('hidden.modal.bs',function(){
        $(this).modal();
    });

    var $username = $('#exampleInputEmail1');
    var $password = $('#exampleInputPassword1');

    var login = function(){
        var u = $username.val().trim();
        var p = $password.val().trim();
        data = {username:u, password:p};
        $.post('/users/login',data, function(data, status){
            if(!data.success){
                $('#errlogin').removeClass('hidden');
            }else{
                $('#errlogin').addClass('hidden');
                window.location = '/admin/main?cid=' + data.cid;
            }
        }); 
    }

    $username.on('keyup', function(){
        if(!$(this).val().trim()){
            $('#errmobile').removeClass('hidden');
        }else{
            $('#errmobile').addClass('hidden');
        }
        if(($(this).val().trim())&&($password.val().trim())){
            $('#login').removeAttr('disabled');
            $('#login').removeClass('disabled');
        }else{
            $('#login').attr('disabled', 'disabled');
            $('#login').addClass('disabled');
        }
    });

    $password.on('keyup', function(){
        if(!$(this).val().trim()){
            $('#errpassword').removeClass('hidden');
        }else{
            $('#errpassword').addClass('hidden');
        }
        if(($(this).val().trim())&&($username.val().trim())){
            $('#login').removeAttr('disabled');
            $('#login').removeClass('disabled');
        }else{
            $('#login').attr('disabled', 'disabled');
            $('#login').addClass('disabled');
        }
    });

    $('#login').click(login);
});
