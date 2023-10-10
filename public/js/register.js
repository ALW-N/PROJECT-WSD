$('#register_form').on('submit', (e) => {
    e.preventDefault();
    let data = $('#register_form').serializeArray();
    let formData = {};
    data.forEach(ele => {
        formData[ele.name] = ele.value;
    });
    $.ajax({
        type: 'POST',
        url: '/user/register',
        data: formData,
        encode: true,
        dataType: 'json',
        success: (response) => {
            console.log(response);
            if(response.err) {
                $('#res_container').removeAttr('class');
                $('#res_container').addClass('invalid-feedback');
                if(response.error.message)
                    $('#res_container').text(response.error.message);
                else{
                    let k = Object.keys(response.error.keyValue)[0];
                    $('#res_container').text( k + ' - ' +  response.error.keyValue[k] + ' already exisits.');
                }
                    
            }
            else {
                $('#res_container').removeAttr('class');
                $('#res_container').addClass('valid-feedback');
                $('#res_container').text(response.msg);
                setTimeout(() => {
                    location.replace('/user');
                },2000);
            }
        }
    });
});

$('input[type=Date]').prop('max', new Date().toISOString().substring(0,10));