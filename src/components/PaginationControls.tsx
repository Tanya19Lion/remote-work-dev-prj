import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import React from "react";
import { DEFAULT_PAGE_SIZE } from "../lib/constants";

type PaginationControlsProps = {
	currentPage: number;	
	onSetCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	totalNumberOfResults: number;
};

export default function PaginationControls({ currentPage, onSetCurrentPage, totalNumberOfResults }: PaginationControlsProps) {
  	return (
		<section className="pagination">
			{
				currentPage > 1 && (
					<PaginationButton onClick={() => onSetCurrentPage((prev) => prev - 1)} direction="previous">
						<ArrowLeftIcon />
						Page {currentPage - 1}
					</PaginationButton>
				)
			}
			{
				totalNumberOfResults > currentPage * DEFAULT_PAGE_SIZE && (
					<PaginationButton onClick={() => onSetCurrentPage((next) => next + 1)} direction="next">
						Page {currentPage + 1}
						<ArrowRightIcon />
					</PaginationButton>	
				)
			}					
		</section>
	);
}

type PaginationButtonProps = {
	direction: "previous" | "next";
	children: React.ReactNode;	
	onClick: () => void;
};

const PaginationButton = ({ direction, children, onClick }: PaginationButtonProps) => {
	return (
		<button className={`pagination__button pagination__button--${direction}`} onClick={onClick}>
			{children}
		</button>
	);
};
