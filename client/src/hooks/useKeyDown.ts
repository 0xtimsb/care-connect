import { useEffect } from 'react';

const useKeyDown = (ref: any, callback: (arg0: string) => void) => {
	const handleKeyDown = (e: any) => {
		if (ref.current) {
			if (e.key === 'ArrowUp') {
				callback('ArrowUp');
			} else if (e.key === 'ArrowDown') {
				callback('ArrowDown');
			} else if (e.key === 'Enter') {
				callback('Enter');
			}
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});
};

export default useKeyDown;
