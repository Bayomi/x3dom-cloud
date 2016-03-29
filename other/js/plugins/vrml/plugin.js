tinymce.PluginManager.add('vrml', function(editor, url) {
  // Add a button that opens a window
  editor.addButton('vrml', {
    text: 'Add Changes',
    icon: false,
    onclick: function() {
      var content = editor.getContent({ format: 'text' });
      changeScene(String(content).trim());
    }
  });
  //Add Shape button
    editor.addButton('Shape', {

      text: 'VRML',
      icon: false,
      onclick: function() {
        var content = editor.getContent({ format: 'text' });
        changeSceneVRML(String(content).trim());
      }

    /*
    text: 'Shapes',
    icon: false,
    onclick: function() {
      editor.windowManager.open({
        title: 'Shape Editor',
        body: [
          {type: 'checkbox', name: 'Appearance', label: 'Appearance', class: 'Appearance'},
          {type: 'checkbox', name: 'Geometry', label: 'Geometry', class: 'Geometry'}
        ],
        onsubmit: function(e) {
          send_to_editor = '#VRML V2.0 utf8' + "<br />" + 'Shape {' + "<br />";

          if (e.data.Appearance == true){
            send_to_editor += '&nbsp; appearance' + "<br />";
          }
          if (e.data.Geometry == true){
            send_to_editor += '&nbsp; geometry' + "<br />";
          }

          send_to_editor += '}';
          editor.insertContent(send_to_editor); 
        }
      });
    }
    */
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