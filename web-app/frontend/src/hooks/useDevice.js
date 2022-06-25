export function useDevice() {
	const mobile = /Android | webOS | iPhone | iPad | iPod | BlackBerry | IEMobile | Opera Mini | Windows Phone/i;
	const isMobile = mobile.test(navigator.userAgent);

	return {
		device: isMobile ? 'Mobile' : 'Desktop',
		isMobile: isMobile,
		isDesktop: !isMobile
	};
}
