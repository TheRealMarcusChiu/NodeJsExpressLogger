
function newLog() {
    var method = "POST";
    var url = "/log/add";
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function() { //Call a function when the state changes.
        if(xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.responseText === "1") {
                window.location.href = '/log/list';
            }
            else {
                alert("error");
            }
        }
    };

    var timestamp = '';

    if (document.getElementById("inputToggleOverrideTimeStamp").checked) {
        timestamp = document.getElementById("inputTimestamp").value;
    }

    var params = {
        "title":document.getElementById("inputTitle").value,
        "content": document.getElementById("textareaContent").value,
        "topics": getSelectedTopics(),
        "timestamp": timestamp
    };

    xhr.send(JSON.stringify(params));
}

function getSelectedTopics() {
    var selectedTopics = [];

    var topicContainer = document.getElementById("divTopicContainer");
    topicContainer.childNodes.forEach(function(topicNode){
        selectedTopics.push(topicNode.innerHTML);
    });

    return selectedTopics;
}

function topicKeyUp(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code === 13) { // Enter keycode
        addTopic(e.target.value);
        e.target.value = "";
    }
}

function addTopic(string_topic) {
    var btn = document.createElement("BUTTON");
    btn.innerHTML = string_topic;
    btn.onclick = function() {this.parentNode.removeChild(this);};
    document.getElementById("divTopicContainer").appendChild(btn);
}