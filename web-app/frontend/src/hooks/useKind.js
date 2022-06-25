const styles = ['regular', 'outline', 'link'];

export function useKind(style) {
	return styles?.includes(style) ? style : 'regular';
}
