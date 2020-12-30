import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Clarifai from 'clarifai';
import FaceRecogonition from './Components/FaceRecogonition/FaceRecogonition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';



const app = new Clarifai.App({
 apiKey: 'eeec217ffd084fcca63e70982a7ac59a'
});

class App extends Component{
	constructor(){
		super();
		this.state={
			input:'',
			imageUrl:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fnews.berkeley.edu%2F2014%2F09%2F16%2Fhuman-faces-are-so-variable-because-we-evolved-to-look-unique%2F&psig=AOvVaw0DTyXwpWCjUKJ2AAkYysN9&ust=1609394806034000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOj065279O0CFQAAAAAdAAAAABAD',
			clarifai_data:[],
			isSignedIn:false,
			route:'signin',
		}
	}

addBorders=()=>{
		const x =document.getElementById('inputImage');
		const height=Number(x.height)
		const width=Number(x.width)
		const y=document.getElementById('boundingBox');
		
	Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
	}
	NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
document.getElementsByClassName("boxingModel").remove();


	for(let i=0;i<this.state.clarifai_data.length;++i){
		
		const z= document.createElement('div');
		z.classList.add("boxingModel");
		
		
		z.style.top=(this.state.clarifai_data[i].top_row*height)+"px";
		z.style.bottom=(height-this.state.clarifai_data[i].bottom_row*height)+"px";
		z.style.left=(this.state.clarifai_data[i].left_col*width)+"px";
		z.style.right=(width-this.state.clarifai_data[i].right_col*width)+"px";
		y.appendChild(z);
	}
}

onInputChange=(event)=>{
	this.setState({
		input:event.target.value
	})
}

onSubmit=(event) =>{

	this.setState({
		imageUrl:this.state.input,
	})

const array=[]

app.models.predict(Clarifai.FACE_DETECT_MODEL,
 		 this.state.input)
        .then(response => {
       		
       		this.array=response.rawData.outputs[0].data.regions;
       		
       		this.state.clarifai_data=this.array.map((obj)=>{
       			return obj.region_info.bounding_box;
       		})
 
       		
         this.addBorders();
          
        })
        .catch(err => {
          console.log(err);
        });



   }

  onRouteChange=(route)=>{
  	if(route==='home'){
  		this.setState({
  			isSignedIn:true,
  		})
  	}
  	if(route==='signin'){
  		this.setState({
  			isSignedIn:false,
  		})
  	}

  	this.setState({route:route});
  }
  render(){
    return (
    	<div >
    	<Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
    	{	(this.state.route!=='home')?(
    		this.state.route==='signin'?
    		<SignIn onRouteChange={this.onRouteChange}/>:
    		<Register onRouteChange={this.onRouteChange}/>
    	

    		)
    	:
    	          
    	          <div>

    	          <Logo/>
    	          <Rank/>
    	          <ImageLinkForm 
    	          onInputChange={this.onInputChange}
    	          onSubmit={this.onSubmit}
    	          />
    	          <FaceRecogonition 
    	           imageUrl={this.state.imageUrl}
    	           />

    	           </div>

    	       }
        </div>

        );
  }
}

export default App;
