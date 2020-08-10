import React from 'react';

const Navigation = ({ onGenerateArray, onBubbleChange, onSort }) => {

	return (
		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			 <button 
			 onClick={() => onGenerateArray()}
			 className='mr15 f6 link dim ph3 pv2 mb2 dib white bg-blue center'>Generate Array</button>

			 <button 
			 onClick={() => onBubbleChange()}
			 className='f6 link dim ph3 pv2 mb2 dib white bg-blue center'>Bubble Sort</button>

			 <button
			 onClick={() => onSort()} 
			 className='f6 link dim ph3 pv2 mb2 dib white bg-blue center'>Sort!</button>
		</nav>
	);		
}

export default Navigation;