/* GoogleWebfontの遅延読み込み */
import loadWebFont from "@js/modules/loadWebFont";

/* スモールデバイス用対策モジュール */
import switchViewport from "@js/modules/fixViewport";

/* メニューボタンの発火モジュール */
// import MenuButton from "@js/modules/MenuButton"; 

/* スムーススクロール */
import SmoothScroll from "smooth-scroll";

import ScrollObserver from "@js/modules/ScrollObserver"; // スクロール時の固定フッター設定用インスタンス

// Googleフォントの指定 (Array)
const WebFont: string[] = ['Righteous'];
 
// 最小ウインドウ幅
const minWindowWidth: number = 375; 

/* メニュー周りのエレメント定義 */
// const menuButton: HTMLElement | null = document.getElementById('menu-button');
// // const overlay = document.getElementById('overlay');
// const menuElement: HTMLElement | null = document.getElementById('nav');
// const navMenu: MenuButton | null = menuElement ? new MenuButton('hidden', 'menu-button', menuElement) : null;

// if (navMenu && menuButton) {
// 	const menuLinkElements: NodeListOf<HTMLAnchorElement> | null | undefined = menuElement?.querySelectorAll('a');
// 	navMenu.toggle(menuButton);
// 	menuLinkElements?.forEach(elem => { navMenu.addCloseEvent(elem);});
// }

/* スムーススクロール */
new SmoothScroll('a[href*="#"]',{ // eslint-disable-line
  header: 'header',
	speed: 200,
	updateURL: false, 
	speedAsDuration: false,
	easing: 'easeInOutQuint'
});

// イベント **********************************************************

// ぺージロード時に処理
document.addEventListener("DOMContentLoaded", () => {
	loadWebFont( WebFont );
	switchViewport(minWindowWidth);
	const observedElement = document.getElementById('scroll-observer') as Element;
	new ScrollObserver(observedElement);
	const footerlement = document.getElementById('footer') as Element;
	new ScrollObserver(footerlement, 'is-main');
}, false);

// DOMだけだと要素の高さが確定しないためonloadで対応する
window.onload = () => {
	setHeightVariable('header');
	setHeightVariable('footer');
}

// リサイズ時に処理
window.addEventListener('resize', () => {
	switchViewport(minWindowWidth);
	setHeightVariable('header');
	setHeightVariable('footer');
}, false);

// 関数 **********************************************************

/**
 * 指定された要素の高さを取得し、CSS変数に設定します。
 * @param id - 要素のID
 */
const setHeightVariable = (id: string) => {
	const element = document.getElementById(id);
	const elementHeight = element?.clientHeight;

	if (element && elementHeight) {
		document.documentElement.style.setProperty(`--${id}-height`, `${elementHeight}px`);
	}
}