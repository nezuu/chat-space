  $(function(){
    // function buildHTML(message){

    //   imageUrl = message.image !== null ? `<img src= "${ message.image }" class="lower-message__image">` : ""

    //   var html = `<div class="chat-main__body--messages-list">
    //                 <div class="chat-main__message" "data-message-id": ${ message.id }>
    //                   <div class="chat-main__message-name">
    //                     ${ message.name }
    //                   </div>
    //                   <div class="chat-main__message-time">
    //                     ${message.created_at}
    //                   </div>
    //                   <div class="chat-main__message-body">
    //                     ${ message.content }
    //                     ${ imageUrl }
    //                   </div>
    //                 </div>
    //               </div>`
    //   return html;
    // }
    function buildHTML(message){
    var insertImage = (message.image) ? `<img src="${message.image}">` : "";
    var html =`<div class="chat-main__body--messages-list">
                    <div class="chat-main__message" data-message-id= ${ message.id }>
                      <div class="chat-main__message-name">
                        ${ message.name }
                      </div>
                      <div class="chat-main__message-time">
                        ${message.date}
                      </div>
                      <div class="chat-main__message-body">
                        ${ message.content }
                        ${ insertImage }
                      </div>
                    </div>
                  </div>`;
      return html
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
      }).done(function(message){
          var html = buildHTML(message);
          $('.chat-main__body').append(html)
          $('.chat-main__footer-form').val('')
          $('.hidden').val('')
          $('.chat-main__body').animate({scrollTop:$('.chat-main__body')[0].scrollHeight}, 'fast')
      })
      .fail(function() {
        alert('error');
      });
    return false;
    });
  });
