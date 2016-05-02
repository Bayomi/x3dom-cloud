function changeScene(text) {
	text = formatString(text);
    var obj = {};
    obj['value'] = text;
    sendAjaxData(obj);
}

function formatString(str) {
	str = str.replace(/\n/g, '$');
	str = str.replace(/\s+/g, ' ');
	str = str.replace(/\$/g, '\n');
	return str
}

function changeX3D(content) {
	$("scene").empty();
	$("scene").append(String(content));
  }

function sendAjaxData(content) {
	var submit = $.ajax({
        url: 'http://localhost:3333/', 
        type: 'POST', 
        data: content,
        error: function(error) {
        console.log("Error - AJAX");
      }
    });
    submit.success(function (data) {
        var success = data;
        console.log(data);
        changeX3D(data);
    });
};