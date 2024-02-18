/**
 * メニューボタンの設定用クラス
 * 一応標準でWAI-ARIA に対応しているのでmicromodalを利用する
 */
import MicroModal from "micromodal";

export default class MenuButton {
	private className: string;
	private buttonId: string;
	private targetClassListElement :HTMLElement;

	/**
	 * MenuButtonクラスのコンストラクターです。
	 * @param {string} className - トグルさせるクラス名
	 * @param {string} id - ボタンのID
	 * @param {HTMLElement} element - クラス名をトグルさせる対象の要素
	*/
	constructor(className: string, id: string, element:HTMLElement ) {
		this.className = className;
		this.buttonId = id;
		this.targetClassListElement = element;
		this.init();
	}

	/**
	 * 初期化メソッドです。
	 */
	private init(): void {
		MicroModal.init({
			disableScroll: true,
			openTrigger: this.buttonId,
			awaitOpenAnimation: true,
			awaitCloseAnimation: true
		});
	}

	/**
	 * メニューボタンの状態を切り替えます。
	 * 
	 * @param {HTMLElement} elem - 切り替えを行う要素
	 * @returns {void}
	 */
	public toggle(elem: HTMLElement): void {
		elem.addEventListener("click", (e: MouseEvent) => {
			e.stopPropagation();
			if (this.hasClassName()) {
				this.open();
			} else {
				this.close();
			}	
			this.changeButton();
		});
	}

	/**
	 * ボタンの表示を切り替えるメソッドです。
	 * @returns {void}
	 */
	public changeButton(): void {
		const targetElement: HTMLElement | null = document.getElementById(this.buttonId);
		
		if (!targetElement) return;

		const targetElements: HTMLCollection = targetElement.children;
		
		for (let i = 0; i < targetElements.length; i++) {
			const attr = targetElements[i].getAttribute("aria-hidden");
			targetElements[i].setAttribute("aria-hidden", (attr == "true" ? "false" : "true"));
		}
	}

	/**
	 * メニューを開くメソットです。
	 * @returns {void}
	 */
	public open(): void {

		this.removeClassName(this.className);

		MicroModal.show(this.buttonId, {
			disableScroll: true, // ページスクロールを無効に
			awaitOpenAnimation: true, // 開閉時のアニメーションを可能に
		});
	}

	/**
	 * メニューを閉じるメソッドです。
	 * 
	 * @returns {void}
	 */
	public close(): void {
		// ルート要素で展開時のクラスを持たないなら処理しない
		// if (!this.hasClassName()) return;

		this.addClassName(this.className);
		MicroModal.close(this.buttonId);
	}

	/**
	 * 指定されたクラス名が要素のクラスリストに含まれているかどうかを判定します。
	 * 
	 * @returns クラス名が含まれている場合は true、含まれていない場合は false を返します。
	 */
	private hasClassName(): boolean {
		return this.targetClassListElement.classList.contains(this.className);
	}

	/**
	 * 指定されたクラス名を要素に追加します。
	 * 
	 * @param className - 追加するクラス名
	 * @returns なし
	 */
	private addClassName(className: string): void {
		this.targetClassListElement.classList.add(className);
	}

	/**
	 * 指定されたクラス名を削除します。
	 * 
	 * @param className 削除するクラス名
	 * @returns なし
	 */
	private removeClassName(className: string): void {
		this.targetClassListElement.classList.remove(className);
	}

	/**
	 * クリックイベントを追加します。
	 * @param elem - イベントを追加する要素
	 * @returns なし
	 */
	public addCloseEvent(elem: HTMLElement): void {
		elem.addEventListener("click", () => {
			this.close();
			this.changeButton();
		});
	}
}
