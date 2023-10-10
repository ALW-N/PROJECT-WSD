

$('#contact-form').on('submit', (e) => {
    e.preventDefault();
    let data = $('#contact-form').serializeArray();
    let formData = {};
    data.forEach(ele => {
        formData[ele.name] = ele.value;
    });
    console.log(formData);
    $.ajax({
        type: 'POST',
        url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSc2kAUW3UlZ1YdxsRPLHIYSiK0r8U4ePQxHUrDQhEYmjA3_Jg/formResponse",
        data: formData,
        dataType: "xml",
        statusCode: {
          0: function() {
            //Success message
            // console.log('Hello');
            $('#contact-toast').toast('show');
            setTimeout(function () { location.reload(true); }, 2000);
          },
          200: function() {
            //Success Message
            // console.log('World');
            $('#contact-toast').toast('show');
            setTimeout(function () { location.reload(true); }, 2000);
          }
        }
      });
});