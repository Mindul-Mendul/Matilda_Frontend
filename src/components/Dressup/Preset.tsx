import React from 'react';
import item_img1 from '../../assets/images/Explore/item_img.png';

export const Preset = () => {
	const presetCard = (n: number) => {
		return (
			<div className='card'>
				<img alt="" className="card-img" src={item_img1}></img>
				Preset {n}
			</div>
		)
	}
	
	return (
		<div className="col-1 d-flex align-content-between flex-wrap text-center">
			{presetCard(1)}
			{presetCard(2)}
			{presetCard(3)}
			{presetCard(4)}
			{presetCard(5)}
		</div>
	);
};
