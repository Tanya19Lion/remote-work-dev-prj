import React from "react";
import { SortByValue } from "../lib/types";

type SortingProps = {
	sortBy: SortByValue;
	handleSortByChange: (newSortBy: SortByValue) => void;
};

type SortingButtonProps = {
	children: React.ReactNode;
	onClick: () => void;
	isActive: boolean;
};

export default function Sorting({ sortBy, handleSortByChange}: SortingProps) {
	return (
		<section className="sorting">
			<i className="fa-solid fa-arrow-down-short-wide"></i>

			<SortingButton onClick={() => handleSortByChange('relevant')} isActive={sortBy === 'relevant'}>
				Relevant
			</SortingButton>

			<SortingButton onClick={() => handleSortByChange('recent')} isActive={sortBy === 'recent'}>
				Recent
			</SortingButton>			
		</section>
	);
}

const SortingButton = ({ children, onClick, isActive }: SortingButtonProps) => {
	return (
		<button 
			className={`sorting__button ${isActive ? 'sorting__button--active' : ''}`} 
			onClick={onClick}
		>
			{children}
		</button>
	);
};