
export default function ResultsCount({ totalNumberOfResults }: { totalNumberOfResults: number }) {
  	return <p className="count"><b>{totalNumberOfResults}</b> results</p>;
}
