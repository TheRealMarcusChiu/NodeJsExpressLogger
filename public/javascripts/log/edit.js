function updateLog(logId) {
    var method = "POST";
    var url = "/log/update";
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

    var params = {
        "id": logId,
        "title":document.getElementById("inputTitle").value,
        "content": document.getElementById("textareaContent").value,
        "topics": getSelectedTopics(),
        "timestamp": document.getElementById("inputTimestamp").value
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
