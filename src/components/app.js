import React from 'react'
import cornerstone from '../../public/cornerstone/cornerstone2.js';
import DcmLoader from '../../public/cornerstone/DcmLoader.js';

export default class App extends React.Component {

	constructor(props){
		super(props);
	}


handleDocumentUploadChange(event ){
	
	var fileInput = document.querySelector("#input-file");
    var element = document.getElementById('dicomImage');
	var file = fileInput.files[0];
	var reader = new FileReader();
	 	
	 reader.addEventListener("load", function () {
   
		 var imageId =	DcmLoader.wadouri.fileManager.add(file);
	 	 cornerstone.loadImage(imageId).then(function(image) {
	  	 var viewport = cornerstone.getDefaultViewport(element.children[0], image);

           cornerstone.displayImage(element, image , viewport);
           
       });
         

  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }

}


	componentDidMount() {
			var element = document.getElementById('dicomImage');
	        cornerstone.enable(element);

	}


  render () {
    return (
      <div>
        <div id="dicomImage" style={{width:'512px',height:'512px'}}/>
        <input id='input-file' multi type='file' onChange={this.handleDocumentUploadChange.bind(null ,this)} />
      </div>

    )
  }
}
