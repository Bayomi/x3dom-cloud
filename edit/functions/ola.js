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

function changeSceneVRML(content) {
	sendAjaxData(content, changeScene);
}

function sendAjaxData(content, callback) {
	var submission = {};
	//console.log(content);
	submission['value'] = content;
	//console.log(submission);
    var submit = $.ajax({
            url: 'http://172.30.97.164:3333/', 
            type: 'POST', 
            data: submission,
            error: function(error) {
            console.log("Error - AJAX");
          }
        });
          submit.success(function (data) {
            var success = data;
            console.log(data);
            callback(data);
        });
 };