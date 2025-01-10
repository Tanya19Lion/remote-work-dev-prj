type SearchFormProps = {
	searchText: string;
	setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchForm({ searchText, setSearchText }: SearchFormProps) {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();	
		setSearchText("");
	};	

	return (
		<form action="#" className="search" onSubmit={handleSubmit}>
			<button type="submit">
				<i className="fa-solid fa-magnifying-glass"></i>
			</button>

			<input
				spellCheck="false"
				type="text"
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
				required
				placeholder="Find remote developer jobs..."
			/>
		</form>
	);
}
