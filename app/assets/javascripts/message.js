  $(function(){
    function buildHTML(message){

      if(message.url !== null){
        var imageUrl = `<img src= "${ message.url }" class="lower-message__image">`
      } else{
        var imageUrl = ""
      }

      var html = `<div class="chat-main__body--messages-list">
                    <div class="chat-main__message">
                      <div class="chat-main__message-name">
                        ${ message.name }
                      </div>
                      <div class="chat-main__message-time">
                        ${message.created_at}
                      </div>
                      <div class="chat-main__message-body">
                        ${ message.content }
                        ${ imageUrl }
                      </div>
                    </div>
                  </div>`
      return html;
    }

    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        type: 'POST',
        url: url,
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(message){
        console.log("成功");
        var html = buildHTML(message);
        $('.chat-main__body').append(html)
        $('.chat-main__footer-form').val('')
        $('.hidden').val('')
        $('.chat-main__body').animate({scrollTop:
        $('.chat-main__body')[0].scrollHeight}, 'fast')
      })
      .fail(function() {
        alert('error');
      });
    return false;
    });
  });
