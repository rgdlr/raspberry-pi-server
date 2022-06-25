const baseUrl = 'https://img.icons8.com/ios/50/000000';

const symbols = {
	information: 'info--v1.png',
	warning: 'box-important--v1.png',
	danger: 'circled-x.png',
	success: 'ok--v1.png'
};

export function useSymbol(symbol) {
	return `${baseUrl}/${symbols[symbol]}`;
}
