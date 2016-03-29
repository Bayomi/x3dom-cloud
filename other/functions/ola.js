function changeScene(content) {
	//console.log(content);
	//$("scene").remove();
	//$("#unbao").append("<scene></scene>")
	//$("scene").empty();
	//$("scene").append(String(content));
	//console.log($("scene").html());
	//x3dom.reload();

	$("scene").empty();
	$("scene").append(String(content));
	//console.log($("#unbao")[0]);
}

function ajaxToScene() {
	console.log("aqui");
	//sendAjaxData(content, changeScene);
}

function sendAjaxData(content, callback) {
    var submit = $.ajax({
            url: 'http://192.168.1.107:2222/', 
            type: 'POST', 
            data: content,
            error: function(error) {
            console.log("Error - AJAX");
          }
        });
          submit.success(function (data) {
            var success = data;
            callback(data);
        });
  };