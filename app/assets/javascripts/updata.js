$(function(){
  $(window).on('load', function() {
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

    setInterval(function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
        console.log(location.href);
        $.ajax({
          url: location.href,
          dataType: 'json',
          type: 'GET'
        })
        .done(function(messages) {
          var id = $('.chat-main__message').filter(":last").data('message-id');
          console.log($('.chat-main__message').filter(":last").data('message-id'))
          var insertHTML = '';
          messages.forEach(function(message){
            if (message.id > id ) {
              console.log(message.id)
              insertHTML += buildHTML(message);
              $('.chat-main__body').append(insertHTML);
              $('.chat-main__body').animate({scrollTop:$('.chat-main__body')[0].scrollHeight}, 'fast')
            }
          });
        })
        .fail(function() {
          alert('error')
        });
      };
    }, 5000);
  });
});
