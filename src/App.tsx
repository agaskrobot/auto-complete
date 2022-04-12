import { useState } from 'react';
import { getSearchResults } from './api';
import './App.scss';
import { Autocomplete, Option } from './components';

function App() {
	const [value, setValue] = useState<Option>({});

	return (
		<div className="app__container">
			<Autocomplete value={value} onChange={setValue} fetchResults={getSearchResults}/>
		</div>
	);
}

export default App;
