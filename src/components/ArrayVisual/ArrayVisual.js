import React from 'react';
import './ArrayVisual.css';
import {bubbleSortAnimated} from '../BubbleSort/BubbleSort';
import {insertionSortAnimated} from '../InsertionSort/InsertionSort';
import {selectionSortAnimated} from '../SelectionSort/SelectionSort';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';


class ArrayVisual extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: [],
			reset: [],
			sorted: false,
			stepsMessage: '',
			messageColor: 'green',
			speed: 1100,
			stop: false,
			algorithm: 'bubble',
			buttonDisable: 'enabled'
		}
	}

	sortStart = () => {
		this.setState({stop: false})
		this.setState({buttonDisable: 'disable'})
		this.setState({reset: this.state.array})

		if(this.state.algorithm === 'bubble') {
			this.bubbleSort(this.state.array,0, 0, 0)
		} else if(this.state.algorithm === 'insertion') {
			this.insertionSort(this.state.array,0,0,0)
		} else if(this.state.algorithm === 'selection') {
			this.selectionSort(this.state.array,0,0,0,0)
		}
	}

	selectionSort(array, index, targetHTML, b1HTML, b2HTML) {
		setTimeout(() => {
			const [animations] = selectionSortAnimated(array);
			var frameEnd = animations.length;
			if(index === frameEnd) {
				return
			}
			var swap = false;
			var action = animations[index][0];

		    if(this.state.stop === true) {
	        	return;
	        }

	        if(action === 'target') {
	        	if(b2HTML !== -1) {
	        		var min = document.getElementsByClassName('bar')[b2HTML];
					min.style.backgroundColor = '#357edd';
					b2HTML = -1;
				}
	        	var target = document.getElementsByClassName('bar')[animations[index][1]];
	        	target.style.backgroundColor = 'orange';
	        	targetHTML = animations[index][1];
	        	this.setState({stepsMessage: `Target min ${target.innerText}`})
        		this.setState({messageColor: 'orange'})
	        }else if(action === 'compare') {
        		var check = document.getElementsByClassName('bar')[animations[index][1]];
        		check.style.backgroundColor = 'red';
        		b1HTML = animations[index][1];  	
        	}else if(action === 'min') {
        		min = document.getElementsByClassName('bar')[animations[index][1]];
        		min.style.backgroundColor = 'orange';
        		if(b2HTML !== -1) {
	        		var temp = document.getElementsByClassName('bar')[b2HTML];
					temp.style.backgroundColor = '#357edd';
				}
        		b2HTML = animations[index][1];  
        		this.setState({stepsMessage: `New min ${min.innerText}`})
        		this.setState({messageColor: 'orange'})	
        	}else if(action === 'swap') {	
	        	swap = true;
	        	target = document.getElementsByClassName('bar')[animations[index][1]];
	        	min = document.getElementsByClassName('bar')[animations[index][2]];
	        	target.style.backgroundColor = 'purple';
	        	min.style.backgroundColor = 'purple';
	        	this.setState({stepsMessage: `Swapping ${min.innerText} and ${target.innerText}`})
        		this.setState({messageColor: 'purple'})	
	        }else if(action === 'keep') {	
	        	min = document.getElementsByClassName('bar')[animations[index][1]];
	        	min.style.backgroundColor = '#357edd';
	        	this.setState({stepsMessage: `No swapping`})
        		this.setState({messageColor: 'purple'})	
	        } else if(action === 'sorted') {
        		this.setState({stepsMessage: 'Sorted!'})
        		this.setState({messageColor: 'green'})
        		this.setState({buttonDisable: 'enabled'})
        		return;
        	}

	        setTimeout(() => {
				if(check) {
					check.style.backgroundColor = '#357edd';
				}
				if(target && swap) {
					target.style.backgroundColor = '#357edd';
				}
				if(min && swap) {
					min.style.backgroundColor = '#357edd';
				}

			    if(swap) {
			        const self = this
			        const newArray = self.state.array.slice()
			        var temp = newArray[targetHTML];
			        newArray[targetHTML] = newArray[b2HTML]
			        newArray[b2HTML] = temp   
			        	
			        self.setState({array: newArray})
			    }
			}, this.state.speed)

	        this.selectionSort(array,++index,targetHTML,b1HTML,b2HTML)
		}, this.state.speed);

	}

	insertionSort(array, index, b1HTML, b2HTML) {
		setTimeout(() => {
			const [animations] = insertionSortAnimated(array);
			var frameEnd = animations.length;
			if(index === frameEnd) {
				return
			}
			var swap = false;
			var action = animations[index][0];

		    if(this.state.stop === true) {
	        	return;
	        }

	        if(action === 'target') {
	        	var target = document.getElementsByClassName('bar')[animations[index][1]];
	        	target.style.backgroundColor = 'orange';
	        	b1HTML = animations[index][1];
	        	this.setState({stepsMessage: `Target ${target.innerText}`})
        		this.setState({messageColor: 'orange'})
	        }else if(action === 'swap') {
	        	target = document.getElementsByClassName('bar')[animations[index][2]+1];
	        	var check = document.getElementsByClassName('bar')[animations[index][2]];
	        	target.style.backgroundColor = 'purple';
	        	check.style.backgroundColor = 'purple';
	        	b2HTML = animations[index][2];  	
	        	swap = true;
	        	this.setState({stepsMessage: `Target ${target.innerText} less than ${check.innerText}`})
        		this.setState({messageColor: 'purple'})
	        } else if(action === 'sorted') {
        		this.setState({stepsMessage: 'Sorted!'})
        		this.setState({messageColor: 'green'})
        		this.setState({buttonDisable: 'enabled'})
        		return;
        	}

	        setTimeout(() => {
				if(target) {
			        target.style.backgroundColor = '#357edd';
				}
				if(check)
					check.style.backgroundColor = '#357edd';

			    if(swap) {
			        const self = this
			        const newArray = self.state.array.slice()
			        var temp = newArray[b1HTML];
			        newArray[b1HTML] = newArray[b2HTML]
			        newArray[b2HTML] = temp   
			        	
			        self.setState({array: newArray})
			    }
			}, this.state.speed)

	        this.insertionSort(array,++index,b1HTML,b2HTML)
		}, this.state.speed);

	}

	bubbleSort(array, index, b1HTML, b2HTML) {
		setTimeout(() => {
			const [animations] = bubbleSortAnimated(array);
			var frameEnd = animations.length;
			if(index === frameEnd) {
				return
			}

			var swap = false;
        	var action = animations[index][0];
	        var bar1 = document.getElementsByClassName('bar')[animations[index][1]];
	        var bar2 = document.getElementsByClassName('bar')[animations[index][1] + 1];
	   
	   		if(this.state.stop === true) {
        		return;
        	}

        	if(action === 'compare') {
        		if(bar1 && bar2) {
        		this.setState({stepsMessage: `Comparing ${bar1.innerText} and ${bar2.innerText}`})
        		this.setState({messageColor: 'red'})

	        	bar1.style.backgroundColor = 'red';
	        	bar2.style.backgroundColor = 'red';
        		}
	        	b1HTML = animations[index][1];
	        	b2HTML = animations[index][2];
        	}else if(action === 'swap'){
        		swap = true;
        		if(bar1 && bar2) {
					bar1.style.backgroundColor = 'purple';
			        bar2.style.backgroundColor = 'purple';
				}
        		this.setState({stepsMessage: `Swapping ${bar1.innerText} with ${bar2.innerText}`})
        		this.setState({messageColor: 'purple'})
    
        	} else if(action === 'sorted') {
        		this.setState({stepsMessage: 'Sorted!'})
        		this.setState({messageColor: 'green'})
        		this.setState({buttonDisable: 'enabled'})
        		return;
        	}

			setTimeout(() => {
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
		        	self.setState({array: newArray})
		        }
			}, this.state.speed)

        	this.bubbleSort(array, ++index, b1HTML, b2HTML);  
		}, this.state.speed);

	}

	resetBars() {
  		var bars = document.getElementsByClassName('bar');
		for(let i=0; i < bars.length; i++) {
			bars[i].style.backgroundColor = '#357edd'
		}
  	}

	onGenerateArray = () => {
		this.setState({stop: true})
		this.setState({stepsMessage: ''})
		this.setState({buttonDisable: 'enabled'})
		this.resetBars();
	    const ARRAY_LENGTH = 6;
	    const min = 1;
	    const max = 80;
	    this.setState({array: Array.from(Array(ARRAY_LENGTH)).map(x=>Math.floor(Math.random() * (max-min) + min))})
	    //this.setState({array: [6,31,52,18,55,27]})
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
		if(this.state.speed !== value) {
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
		this.setState({buttonDisable: 'enabled'})
		this.setState({stop: true})
		this.setState({stepsMessage: 'Stopped'})
		this.setState({messageColor: 'red'})
		this.resetBars();
  	}

  	onReset = () => {
  		this.setState({buttonDisable: 'enabled'})
  		this.setState({stop: true})
  		this.setState({stepsMessage: 'Reset'})
		this.setState({messageColor: 'red'})
		this.resetBars();
		if(this.state.reset.length)
			this.setState({array: this.state.reset})
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
			  			<p>Steps: <span style={{color: this.state.messageColor}}>{this.state.stepsMessage}</span></p>

		  				<Button onClick={() => this.onGenerateArray()} variant="contained" color="primary" style={{float: 'left', marginRight: '10px', textTransform: 'none'}}>
  							Randomize
						</Button>
		  
		  				
						{this.state.buttonDisable === 'enabled' 
						? 
						(<Button onClick={() => this.sortStart()} variant="contained" color="primary" style={{float: 'left', marginRight: '10px', textTransform: 'none'}}>
  							Sort
						</Button>) 
						: 
						(<Button onClick={() => this.sortStart()} variant="contained" disabled color="primary" style={{float: 'left', marginRight: '10px', textTransform: 'none'}}>
  							Sort
						</Button>)
						}

						<Button color="secondary" onClick={() => this.onStop()} style={{float: 'left'}}>Stop</Button>
						<Button color="secondary" onClick={() => this.onReset()} style={{float: 'left'}}>Reset</Button>

						{this.state.buttonDisable === 'enabled'
						?
			  			(<FormControl style={{float: 'right', bottom: '13px'}}>
					       <InputLabel id="demo-simple-select-label"></InputLabel>
					       <Select
					         labelId="demo-simple-select-label"
					         id="demo-simple-select"
					         value={this.state.algorithm}
					         onChange={this.handleAlgorithmChange}>

					         <MenuItem value={'bubble'}>Bubble Sort</MenuItem>
					         <MenuItem value={'insertion'}>Insertion Sort</MenuItem>
					         <MenuItem value={'selection'}>Selection Sort</MenuItem>
					       </Select>
						</FormControl>)
						:
						(<FormControl disabled style={{float: 'right', bottom: '13px'}}>
					       <InputLabel id="demo-simple-select-label"></InputLabel>
					       <Select
					         labelId="demo-simple-select-label"
					         id="demo-simple-select"
					         value={this.state.algorithm}
					         onChange={this.handleAlgorithmChange}>

					         <MenuItem value={'bubble'}>Bubble Sort</MenuItem>
					         <MenuItem value={'insertion'}>Insertion Sort</MenuItem>
					         <MenuItem value={'selection'}>Selection Sort</MenuItem>
					       </Select>
						</FormControl>)
						}
			  			
		  				<Typography id="discrete-slider-restrict" style={{marginTop: '100px'}}>
							  Change Speed
						</Typography>
						<Slider
						 	style={{width: '90%', marginTop: '50px'}}
							defaultValue={1100}
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