$(function(){
  $(document).on(function() {
    function buildHTML(message){
    var insertImage = (message.image) ? `<img src="${message.image}">` : "";
    var html =`<div class="chat-main__body--messages-list">
                    <div class="chat-main__message"  "data-message-id": ${ message.id }>
                      <div class="chat-main__message-name">
                        ${ message.name }
                      </div>
                      <div class="chat-main__message-time">
                        ${message.created_at}
                      </div>
                      <div class="chat-main__message-body">
                        ${ message.content }
                        ${ insertImage }
                      </div>
                    </div>
                  </div>`;
      return html
    }

    var interval = setInterval(function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
        $.ajax({
          url: location.href,
          type: 'GET',
          dataType: 'json'
        })
        .done(function(messages) {
          console.log("自動更新")
          var id = $('.chat-main__message').filter(":last").data('messageId');
          var insertHTML = '';
          messages.forEach(function(message){
            if (message.id > id ) {
              insertHTML += buildHTML(message);
              $('.chat-main__body').append(insertHTML);
            }
          });
        })
        .fail(function() {
          alert('error')
        });
      };
      clearInterval(interval)
    }, 5000);
  });
});
