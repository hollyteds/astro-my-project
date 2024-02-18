/**
 * Global interface declaration for the window object.
 */
declare global {
	interface Window {
		/**
		 * Configuration object for WebFont.
		 */
		WebFontConfig: {
			google?: {
				families: string[];
			};
			active?: () => void;
			inactive?: () => void;
			fontactive?: (familyName: string, fvd: string) => void;
			fontinactive?: (familyName: string, fvd: string) => void;
		};
	}
}

/**
 * Loads web fonts dynamically using the WebFontConfig object.
 * @param fontFamilies - An array of font families to load.
 */

export default (fontFamilies: string[]): void => {
	if (!Array.isArray(fontFamilies)) {
		console.log('Font data type must be array.');
		return;
	}
	
	window.WebFontConfig = {
		google: { families: fontFamilies },
		active: (): void => {
			sessionStorage.fonts = true;
		}
	};

	const wf: HTMLScriptElement = document.createElement('script');
	wf.src = '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
	wf.type = 'text/javascript';
	wf.async = true;
	const s: HTMLScriptElement = document.getElementsByTagName('script')[0];
	if (s.parentNode) s.parentNode.insertBefore(wf, s);
	
};