import React from 'react';
import './ArrayVisual.css';
import {bubbleSortAnimated} from '../BubbleSort/BubbleSort';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';

const ANIMATION_SPEED = 300; //in ms

class ArrayVisual extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: [],
			sorted: false,
			swapMessage: '',
			messageColor: 'green',
			speed: 600,
			stop: false,
			algorithm: 'bubble',
		}
	}

	sortStart = () => {
		this.setState({stop: false})

		if(this.state.algorithm === 'bubble') {
			this.bubbleSort(this.state.array,0, 0, 0)
		} else {
			console.log('not yet')
		}
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
        		if(bar1 && bar2) {
        		this.setState({swapMessage: `Comparing ${bar1.innerText} and ${bar2.innerText}`})
        		this.setState({messageColor: 'red'})

	        	bar1.style.backgroundColor = 'red';
	        	bar2.style.backgroundColor = 'red';
        		}
	        	b1HTML = animations[index][1];
	        	b2HTML = animations[index][2];
	     

        	}else if(action === 'swap'){
        		swap = true;
        		if(bar1 && bar2) {
					bar1.style.backgroundColor = 'green';
			        bar2.style.backgroundColor = 'green';
				}
        		this.setState({swapMessage: `Swapping ${bar1.innerText} with ${bar2.innerText}`})
        		this.setState({messageColor: 'green'})
    
        	} else if(action === 'sorted') {
        		this.setState({swapMessage: 'Sorted!'})
        		this.setState({messageColor: 'green'})
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
		this.setState({swapMessage: ''})
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


	handleAlgorithmChange = (event) => {
	  this.setState({algorithm: event.target.value})
	  return event.target.value
	};

	onStop = () => {
		this.setState({stop: true})
		this.setState({swapMessage: 'Stopped'})
		this.setState({messageColor: 'red'})
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


		  			</div>

		  			<Container maxWidth="md">
			  			<p>Steps: <span style={{color: this.state.messageColor}}>{this.state.swapMessage}</span></p>


		  				<Button onClick={() => this.onGenerateArray()} variant="contained" color="primary" style={{float: 'left', marginRight: '10px', textTransform: 'none'}}>
  							Randomize
						</Button>
		  
			  			<Button onClick={() => this.sortStart()} variant="contained" color="primary" style={{float: 'left', marginRight: '10px', textTransform: 'none'}}>
  							Sort
						</Button>

						<Button color="secondary" onClick={() => this.onStop()} style={{float: 'left'}}>Stop</Button>

			  			<FormControl style={{float: 'right', bottom: '13px'}}>
						       <InputLabel id="demo-simple-select-label"></InputLabel>
						       <Select
						         labelId="demo-simple-select-label"
						         id="demo-simple-select"
						         value={this.state.algorithm}
						         onChange={this.handleAlgorithmChange}
						       >
						         <MenuItem value={'bubble'}>Bubble Sort</MenuItem>
						         <MenuItem value={'insertion'}>Insertion Sort</MenuItem>
						         <MenuItem value={'selection'}>Selection Sort</MenuItem>
						       </Select>
						</FormControl>
			  			
		  				<Typography id="discrete-slider-restrict" style={{marginTop: '100px'}}>
							  Change Speed
						</Typography>
						<Slider
						 	style={{width: '90%', marginTop: '50px'}}
							defaultValue={600}
							valueLabelFormat={this.valueLabelFormat}
							getAriaValueText={this.valuetext}
							aria-labelledby="discrete-slider-restrict"					
							valueLabelDisplay="off"
							min={100}
							max={2100}  
							step={null}
							marks={this.marks}
						/>
					</Container>
  				
  				</div>

  			);
		}
		return(
			<div id="outPopUp">
			  	<h1>Click Randomize to get some numbers!</h1>
			  	<Button onClick={() => this.onGenerateArray()} variant="contained" color="primary" style={{textTransform: 'none'}}>
	  				Randomize
				</Button>
			</div>
		)
	}
}

export default ArrayVisual;