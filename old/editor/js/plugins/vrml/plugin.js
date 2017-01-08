function checkNumberInputs(args, e) {
  args.forEach(function(element, index, array) {
    if(!isNumeric(element)) {
      e.preventDefault();
      alert(String(element) + " is not a number");
    }
  })
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

tinymce.PluginManager.add('vrml', function(editor, url) {
  //Add a button that opens a window
  editor.addButton('save', {
    text: 'Save',
    icon: false,
    onclick: function() {
      var text = tinyMCE.activeEditor.getContent({format : 'text'});
      //console.log($('#tinytextarea'));
      changeScene(text)
    }
  });
  editor.addButton('shape', {
      text: 'Shape',
      icon: false,
      onclick: function() {
      editor.windowManager.open({
        title: 'Shape Editor',
        body: [
          {type: 'checkbox', name: 'appearance', label: 'appearance', class: 'appearance'},
          {type: 'checkbox', name: 'geometry', label: 'geometry', class: 'geometry'}
        ],
        onsubmit: function(e) {

          send_to_editor = '#VRML V2.0 utf8' + "<br />" + 'Shape {' + "<br />";
          
          if (e.data.appearance == true){
            send_to_editor += '&nbsp; appearance' + "<br />";
          } 

          if (e.data.geometry == true){
            send_to_editor += '&nbsp; geometry' + "<br />";
          }

          send_to_editor += '}';
          editor.insertContent(send_to_editor); 
        }
      });
    }
  });
  editor.addButton('cone', {
      text: 'Cone',
      icon: false,
      onclick: function() {
      editor.windowManager.open({
        title: 'Cone Editor',
        body: [
          {type: 'textbox', name: 'bottomRadius', label: 'bottomRadius', class: 'bottomRadius', value: '1.0'},
          {type: 'textbox', name: 'height', label: 'height', class: 'height', value: '2.0'},
          {type: 'checkbox', name: 'side', label: 'side', class: 'side'},
          {type: 'checkbox', name: 'bottom', label: 'bottom', class: 'bottom'}
        ],
        onsubmit: function(e) {

          checkNumberInputs([e.data.bottomRadius, e.data.height], e);

          send_to_editor = 'Cone {' + "<br />";

          
          send_to_editor += '&nbsp;&nbsp; bottomRadius ' + e.data.bottomRadius +  "<br />";
          send_to_editor += '&nbsp;&nbsp; height ' + e.data.height +  "<br />";
          
          if (e.data.side == true){
            send_to_editor += '&nbsp;&nbsp; side' + " TRUE <br />";
          } 

          if (e.data.bottom == true){
            send_to_editor += '&nbsp;&nbsp; bottom' + " TRUE <br />";
          } 

          send_to_editor += '&nbsp;}';
          editor.insertContent(send_to_editor); 
        }
      });
    }
  });
  //Add Shape button
  editor.addButton('sphere', {
      text: 'Sphere',
      icon: false,
      onclick: function() {
        var content = editor.getContent({ format: 'text' });
        changeSceneVRML(String(content).trim());
        changeSceneVRML(content.trim()); 
      }
  });
  //Add Shape button
  editor.addButton('box', {
      text: 'Box',
      icon: false,
      onclick: function() {
        var content = editor.getContent({ format: 'text' });
        changeSceneVRML(String(content).trim());
        changeSceneVRML(content.trim()); 
      }
  });
  //Add Shape button
  editor.addButton('cylinder', {
      text: 'Cylinder',
      icon: false,
      onclick: function() {
        var content = editor.getContent({ format: 'text' });
        changeSceneVRML(String(content).trim());
        changeSceneVRML(content.trim()); 
      }
  });
  editor.addButton('indexedFaceSet', {
      text: 'IndexedFace',
      icon: false,
      onclick: function() {
        var content = editor.getContent({ format: 'text' });
        changeSceneVRML(String(content).trim());
        changeSceneVRML(content.trim()); 
      }
  });

  // Adds a menu item to the tools menu
  editor.addMenuItem('vrml', {
    text: 'VRML EDITOR',
    context: 'tools',
    onclick: function() {
      // Open window with a specific url
      editor.windowManager.open({
        title: 'TinyMCE site',
        url: 'http://www.tinymce.com',
        width: 800,
        height: 600,
        buttons: [{
          text: 'Close',
          onclick: 'close'
        }]
      });
    }
  });
});