if (!customElements.get("ui-media")) {
  class Media extends HTMLElement {
    constructor() {
      super();
      this.index = 0;
    }

    connectedCallback() {
      this._render();
    }

    _render() {
      this.imgWrapper = this.querySelector("[ui-media-images]");
      this.images = this.imgWrapper.querySelectorAll("img");
      this.pagination = [
        this.querySelectorAll("[ui-media-pagination='dots'] button"),
        this.querySelectorAll("[ui-media-pagination='images'] button"),
      ];

      this.pagination.forEach((pages, index) => {
        pages.forEach((page, i) => page.addEventListener("click", () => this.move(i, index === 0 ? "left" : "top")));
      });

      this.addEventListener("scroll", () => this.onScroll("top"));
      this.imgWrapper.addEventListener("scroll", () => this.onScroll("left"));
    }

    move(i, dir) {
      if (this.index === i) return;

      this.setIndex(i);
      this.setPosition(dir);
      this.setState();
    }

    setPosition(dir) {
      (this.isDirectionTop(dir) ? this : this.imgWrapper).scrollTo({
        [dir]: this.isDirectionTop(dir) ? window.innerHeight * 0.85 * this.index : window.innerWidth * this.index,
      });
    }

    setState() {
      for (const pages of this.pagination) {
        pages.forEach((page, i) => page.setAttribute("aria-selected", i === this.index));
      }
    }

    setIndex(index) {
      this.index = index;
    }

    isDirectionTop(dir) {
      return dir === "top";
    }

    onScroll(dir) {
      const element = this.isDirectionTop(dir) ? this : this.imgWrapper;
      const newIndex = Math.round((this.isDirectionTop(dir) ? element.scrollTop : element.scrollLeft) / element.offsetWidth);

      if (newIndex !== this.index) {
        this.index = newIndex;
        this.setState();
      }
    }
  }

  customElements.define("ui-media", Media);
}
