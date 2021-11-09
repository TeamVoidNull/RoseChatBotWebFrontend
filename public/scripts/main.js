
var send_button = document.getElementById("send_button")

send_button.onclick = function SendMsg() {
    var text = document.getElementById("text");
    if (text.value == "" || text.value == null) {
        alert("Please enter some text")
    }
    else {
        AddMsg('user', text.value);
        console.log("input is valid");
        text.value = "";
    }
}



function AddMsg(user, content) {
    var string = CreatMsg(user, content);
    var msgs = document.getElementById("text_block");
    msgs.innerHTML = msgs.innerHTML + string;
}

function CreatMsg(user, content) {
    var string = "";
    if (user == 'user') {
        string = "<div class=\"user_msg\">" + content + "</div>"
    }
    else {
        string = "<div  class=\"bot_msg\>" + content + "</div>"
    }
    return string;
}
