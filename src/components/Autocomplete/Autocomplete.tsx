import { useEffect, useRef, useState } from 'react';
import './Autocomplete.scss';
import { useClickOutside } from '../../hooks';

export interface Option {
	name?: string;
}

const AutocompleteLoading = () => <div className="loader" />;

interface Result {
	option: Option;
	searchTerm: string;
	onSelect: Function;
}
const AutocompleteResult = (props: Result) => {
	const { option, searchTerm, onSelect } = props;
	// Split on highlight term and include term into parts, ignore case
	const parts = option.name?.split(new RegExp(`(${searchTerm})`, 'gi'));
	// Create new option with highlighted common part
	const newOption = (
		<span>
			{parts?.map((part: string, i: number) => (
				<span key={i} className={part.toLowerCase() === searchTerm.toLowerCase() ? 'result--highlight' : ''}>
					{part}
				</span>
			))}
		</span>
	);
	return (
		<div className="result" onClick={() => onSelect()}>
			<div>{newOption}</div>
		</div>
	);
};

const AutocompleteNoData = () => <h5 className="results__no-data">No results</h5>;

const AutocompleteError = () => <h5 className="results__error">Error</h5>;

interface Autocomplete {
	value: Option;
	onChange: Function;
	fetchResults: Function;
}

export const Autocomplete = (props: Autocomplete) => {
	const { value, onChange, fetchResults }=props;
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [results, setResults] = useState<Array<Option>>([]);
	const refWrapper = useRef() as React.MutableRefObject<HTMLInputElement>;

	useEffect(() => {
		setIsLoading(true);
		setIsError(false);
		const fetchData = async () => {
			try {
				const results = await fetchResults(searchTerm);
				setResults(results.data.results);
			} catch (error) {
				setIsError(true);
			} finally {
				setIsLoading(false);
			}
		};
		// Calling fetch and set delay of one sec
		let timer = setTimeout(() => fetchData(), 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [searchTerm]);

	// Close results on blur
	useClickOutside(refWrapper, () => {
		setSearchTerm('');
		setIsOpen(false);
	});

	const handleFocus = () => {
		setIsOpen(true);
		setSearchTerm(value.name ? value.name : '');
	};

	const handleSelectValue = (option: Option) => {
		setIsOpen(false);
		setSearchTerm(option.name ? option.name : '');
		onChange(option);
	};

	const handleClearValue = () => {
		setIsOpen(false);
		setSearchTerm('');
		onChange({});
	};

	return (
		<div className="autocomplete__wrapper" ref={refWrapper}>
			<input
				className="autocomplete__input"
				autoComplete="off"
				id="searchBar"
				type="text"
				placeholder={isOpen ? '' : value.name}
				onChange={(e) => setSearchTerm(e.target.value)}
				value={searchTerm}
				onFocus={handleFocus}
			/>
			<div className="autocomplete__clear-btn" onClick={handleClearValue}>
				×
			</div>
			{isOpen ? (
				<div className="results">
					{isLoading ? (
						<AutocompleteLoading />
					) : isError ? (
						<AutocompleteError />
					) : results.length > 0 ? (
						<>
							{results.map((option, index) => {
								return (
									<AutocompleteResult
										key={index}
										option={option}
										searchTerm={searchTerm}
										onSelect={() => handleSelectValue(option)}
									/>
								);
							})}
						</>
					) : (
						<AutocompleteNoData />
					)}
				</div>
			) : null}
		</div>
	);
};
