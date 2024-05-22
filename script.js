var select;
var chat;
function addChat(user, text) {
  document.getElementById("chatbody").innerHTML += `<div>${user}:</div><div>${text}</div><br>`
}
async function load() {
  select = document.getElementById("chat");
  chat = select.value;
  $.get(`https://json-h1lsx-ea20d84e.koyeb.app/chat${chat}`).then(function (d) {
      //document.getElementById("chatbody").innerHTML = "";
      document.getElementById("chatbody").innerHTML = "";
      d.forEach(a => addChat(a.user, a.message));
    })
  setTimeout(load, 5000);
}
load();
async function submit() {
  select = document.getElementById("chat");
  chat = select.value;
  let user = document.getElementById("user").value;
  let message = document.getElementById("text").value;
  if(user == "delete4576") {
    $.ajax({
    url: `https://json-h1lsx-ea20d84e.koyeb.app/chat${chat}/${message}`,
    type: 'DELETE',
    success: function(result) {
        alert(`Deleted Message Id ${message}`)
      }
    })
  } else {
    let body = {
      "message": message,
      "user": user
    }
    $.post(`https://json-h1lsx-ea20d84e.koyeb.app/chat${chat}`, body, (d, status) => {
      alert("Chat Updated!");
      load();
    }).fail((d, status) => {
      alert("Chat Update Failed!");
    })
  }
}