import { useState } from 'react';
import { Autocomplete } from './Autocomplete';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, userEvent, waitFor } from '../../utils/test-utils';
import { wait } from '@testing-library/user-event/dist/utils';

const AutocompleteMock = (props: any) => {
	const { fetchResults } = props;
	const [value, setValue] = useState({});

	return <Autocomplete value={value} onChange={setValue} fetchResults={fetchResults} />;
};

describe('Autocomplete', () => {
	it('should render', () => {
		render(<AutocompleteMock />);
		expect(screen.getByTestId('autocomplete-wrapper')).toBeInTheDocument();
	});
	it('should render loader', async () => {
		render(<AutocompleteMock />);
		const input = screen.getByRole('textbox');
		expect(input).toBeInTheDocument();
		input.focus();
		expect(screen.getByTestId('loader')).toBeInTheDocument();
	});
});
