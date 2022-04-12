import { useEffect } from 'react';

export const useClickOutside = (ref: React.MutableRefObject<HTMLInputElement>, onClick: Function) => {
	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (ref.current && !ref.current.contains(event.target)) {
				onClick();
			}
		};
		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref]);
};
