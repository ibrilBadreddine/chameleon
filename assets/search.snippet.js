if (!customElements.get("ui-search")) {
  class CartDrawer extends HTMLElement {
    constructor() {
      super();

      this.ESC_KEY = "Escape";
      this.trigger = this.firstElementChild;
      this.content = this.lastElementChild;
      this.searchInput = this.content.querySelector("input[name='search']");
      this.closeEvent = this.querySelector("[aria-label='close']");
    }

    connectedCallback() {
      this._render();
    }

    _render() {
      this.trigger.addEventListener("click", () => this.toggle());
      this.closeEvent.addEventListener("click", () => this.close());
      this.addEventListener("keydown", (e) => e.key === this.ESC_KEY && this.close());
    }

    get getState() {
      return this.content.getAttribute("data-state");
    }

    setState(state) {
      this.content.setAttribute("data-state", state ? "open" : "closed");

      setTimeout(() => {
        if (state) {
          this.searchInput.focus();
        } else {
          this.searchInput.value = "";
          this.trigger.focus();
        }
      }, 300);
    }

    close() {
      this.setState(false);
    }

    toggle() {
      this.setState(this.getState !== "open");
    }
  }

  customElements.define("ui-search", CartDrawer);
}
