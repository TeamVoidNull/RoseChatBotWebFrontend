var rchat = rchat || {};

rchat.test = true;

rchat.url = rchat.test ? "http://localhost:8080/" : "http://teamvoidnull.csse.rose-hulman.edu:8080/"

function htmlToElement(html) {
	var template = document.createElement("template");
	html = html.trim();
	template.innerHTML = html;
	return template.content.firstChild;
}

rchat.sendMessage = function() {
    let inputBox = document.getElementById("input-box");
    let inputText = inputBox.value;
    if(inputText == "") {inputBox.focus(); return;}
    let chatArea = document.getElementById("chatBlock");
    let chatbox = chatArea.parentElement;
    chatArea.appendChild(htmlToElement(`
        <div class="chat-bubble right-bubble">
            <div class="chat-text chat-right">
                <p>${inputText}</p>
            </div>
        </div>
    `));
    chatbox.scrollTop = chatbox.scrollHeight;
    inputBox.value = "";
    let req = new XMLHttpRequest();
    req.open("POST", rchat.url + "send", true)
    req.setRequestHeader("Content-Type", "text/plain");
    req.onload = () => {
        if(req.status == 200){
            console.log(req.responseText);
            chatArea.appendChild(htmlToElement(`
                <div class="chat-bubble">
                    <div class="chat-text">
                        <p>${req.responseText}</p>
                    </div>
                </div>
            `));
            chatbox.scrollTop = chatbox.scrollHeight;
            inputBox.focus();
        }
        else{
            console.error(req.statusText);
        }
    };
    req.onerror = () => {
        console.error(req.statusText);
    };
    req.send(inputText);
    
}

rchat.main = function(){
    document.getElementById("send").onclick = rchat.sendMessage;
    document.addEventListener('keydown', function(event){
        if(event.key == "Enter") rchat.sendMessage();
    })
    document.getElementById("input-box").focus();
}

rchat.main();

