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
    var input = $("#user-search-field").val();
    console.log(name);
    console.log(input);

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { input: input },
      dataType: 'json'
    })


    .done(function(users) {
      // console.log('ajax成功')
      $("#user-search-result").empty();
      if (users.length !== 0 && input.length !== 0)  {
        users.forEach(function(user){
          appendProduct(user);
        });
      }
    })

    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
});


$(function() {
  function movementProduct(name, id) {
    var user =  `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                   <input name='group[user_ids][]' type='hidden' value=${id}>
                   <p class='chat-group-user__name'>${name}</p>
                   <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                 </div>`
    return user
 }

  $(document).on("click",".user-search-add", function(){
    var name = $(this).data('user-name');
    var id = $(this).data('user-id');
    console.log(name, id)
    user = movementProduct( name, id )
    $(this).parent().remove();
    $(".chat-group-form__field__middle").append(user);
    console.log("クリック")
  });


  $(document).on("click",".user-search-remove", function(){
    console.log("リムーブ")
    $(this).parent().remove();
  });
});