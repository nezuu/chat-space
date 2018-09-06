$(function() {
  var search_list = $("#user-search-result");
  function appendProduct(user) {
    var html =  `<div class="chat-group-user clearfix">
                   <p class="chat-group-user__name">${user.name}</p>
                   <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                 </div>`
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    var inputValue = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { input: inputValue },
      dataType: 'json'
    }).done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0 && inputValue.length !== 0) {
          users.forEach(function(user){
            appendProduct(user);
          });
        }
    }).fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    });
  });

$(function() {
  function buildProduct(name, id) {
    var user =  `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                   <input name='group[user_ids][]' type='hidden' value=${id}>
                   <p class='chat-group-user__name'>${name}</p>
                   <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                 </div>`
    return user
 }

  $("#user-search-result").on("click",".user-search-add", function(){
    var user_name = $(this).data('user-name');
    var user_id = $(this).data('user-id');
    user = buildProduct( user_name, user_id )
    $(this).parent().remove();
    $(".chat-group-form__field__middle").append(user);
  });

  $(".chat-group-form__field__middle").on("click",".user-search-remove", function(){
    $(this).parent().remove();
  });
});
