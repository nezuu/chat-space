$(function(){
  $(document).on('turbolinks:load', function() {
    function buildHTML(message){
    var insertImage = '';
    if (message.image) {
      insertImage = `<img src="${message.image}">`;
    }
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
      }, 5000);
  });
});
