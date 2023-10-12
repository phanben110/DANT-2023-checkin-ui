export function isLoggedIn() {
	return !!localStorage.getItem('access')
}