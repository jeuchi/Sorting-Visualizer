import React from 'react';
import './ArrayVisual.css';
import {bubbleSortAnimated} from '../BubbleSort/BubbleSort';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const ANIMATION_SPEED = 300; //in ms

class ArrayVisual extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: [],
			sorted: false,
			speed: 1000,
			stop: false,
		}
	}

	bubbleSortStart = () => {
		console.log('g')
		this.setState({stop: false})
		this.bubbleSort(this.state.array,0, 0, 0)
	}

	bubbleSort(array, index, b1HTML, b2HTML) {
		setTimeout(() => {
		const [animations,sortArray] = bubbleSortAnimated(array);
		var frameEnd = animations.length;
		if(index === frameEnd) {
			return
		}
		var max = 6;
		var swap = false;
		
        	var action = animations[index][0];
	        var bar1 = document.getElementsByClassName('bar')[animations[index][1]];
	        var bar2 = document.getElementsByClassName('bar')[animations[index][1] + 1];
	   
	   		if(this.state.stop === true) {
        		console.log('stopped')
        		return;
        	}

        	if(action === 'compare') {
        		//console.log('compare', bar1, bar2)
        		if(bar1 && bar2) {

	        	bar1.style.backgroundColor = 'red';
	        	bar2.style.backgroundColor = 'red';
        		}
	        	b1HTML = animations[index][1];
	        	b2HTML = animations[index][2];
	     

        	}else if(action === 'swap'){
        		swap = true;
    
        	} else if(action === 'sorted') {
        		console.log('sorted')
        		return;
        	}

				setTimeout(() => {
					//console.log(bar2)
					if(bar1 && bar2) {
					bar1.style.backgroundColor = '#357edd';
			        bar2.style.backgroundColor = '#357edd';
					}
			        if(swap) {
			        	const self = this
			        	const newArray = self.state.array.slice()
			        	var temp = newArray[b1HTML];
			        	newArray[b1HTML] = newArray[b2HTML]
			        	newArray[b2HTML] = temp   
			        	//console.log('swap', newArray[b2HTML], newArray[b1HTML], 'b1HTML', b1HTML)
			        	self.setState({array: newArray})
			        }
				}, this.state.speed)
        this.bubbleSort(array, ++index, b1HTML, b2HTML);  
		}, this.state.speed);

	}

	onGenerateArray = () => {
		this.setState({stop: true})
	    const ARRAY_LENGTH = 6;
	    const min = 1;
	    const max = 80;
	    this.setState({array: Array.from(Array(ARRAY_LENGTH)).map(x=>Math.floor(Math.random() * (max-min) + min))})
  	}


	
	marks = [
	  {
	    value: 100,
	    label: 'Fastest',
	  },
	  {
	    value: 600,
	    label: 'Faster',
	  },
	  {
	    value: 1100,
	    label: 'Medium',
	  },
	  {
	    value: 1700,
	    label: 'Slower',
	  },
	  {
	    value: 2100,
	    label: 'Slowest',
	  },
	];

	valuetext = (value) => {
		if(this.state.speed != value) {
			this.setState({speed: value})
		}
	 	return({value})
	}

	valueLabelFormat = (value) => {
	  return this.marks.findIndex((mark) => mark.value === value) + 1;
	}


	render() {
		if(this.state.array.length) {
  			return ( 
  				<div>
	  				<div className="barcontainer">
	  					<div className='barcontainerheader'></div>
		  				{this.state.array.map((arr, idx) => 
						<div className='bar' style={{height: arr+10 +'%'}}  key= {idx}>
		  					<div className='barlabel'>
						      {arr}
						    </div>
		  				</div>
		  				)}

		  				<button onClick={() => this.onGenerateArray()} className='f6 link dim ph3 pv2 mb2 dib white bg-blue center'>Generate!</button>
		  
			  			<button 
			  			onClick={() => this.bubbleSortStart()}
			  			className='f6 link dim ph3 pv2 mb2 dib white bg-blue center'>Sort!
			  			</button>
		  			</div>
		  			
	  				<Typography id="discrete-slider-restrict" style={{marginTop: '100px'}}>
						  Change Speed
					</Typography>
					<Slider
					 	style={{width: '50%', marginTop: '50px'}}
						defaultValue={1000}
						valueLabelFormat={this.valueLabelFormat}
						getAriaValueText={this.valuetext}
						aria-labelledby="discrete-slider-restrict"					
						valueLabelDisplay="off"
						min={100}
						max={2100}  
						step={null}
						marks={this.marks}
					/>
  				
  				</div>

  			);
		}
		return(
			<div>
		  	<h1>Click Generate to get started!</h1>
		  	<button onClick={() => this.onGenerateArray()} className='f6 link dim ph3 pv2 mb2 dib white bg-blue center'>Generate!</button>
			</div>
		)
	}
}

export default ArrayVisual;