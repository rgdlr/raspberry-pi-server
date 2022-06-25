const themes = ['primary', 'secondary', 'information', 'warning', 'danger', 'success'];

export function useTheme(theme) {
	return themes?.includes(theme) ? theme : 'primary';
}
