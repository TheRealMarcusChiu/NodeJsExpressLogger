function removeLog(logID) {

    var result = confirm("Are you sure you want to delete?");

    if (result) {
        var method = "POST";
        var url = "/log/delete";
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
            "id":logID
        };

        xhr.send(JSON.stringify(params));
    }
}
