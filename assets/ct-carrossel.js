if (!customElements.get('ct-carrossel')) {
  customElements.define(
    'ct-carrossel',
    class CtCarrossel extends HTMLElement {
      connectedCallback() {
        this.slides = Array.from(this.querySelectorAll('[data-slide]'));
        this.pontos = Array.from(this.querySelectorAll('[data-ir]'));
        this.tocar = this.querySelector('[data-tocar]');
        this.atual = 0;
        this.timer = null;
        this.pontos.forEach((p) => p.addEventListener('click', () => this.ir(Number(p.dataset.ir))));
        const a = this.querySelector('[data-anterior]');
        const n = this.querySelector('[data-proximo]');
        if (a) a.addEventListener('click', () => this.ir(this.atual - 1));
        if (n) n.addEventListener('click', () => this.ir(this.atual + 1));
        if (this.tocar) this.tocar.addEventListener('click', () => (this.timer ? this.parar() : this.iniciar()));
        const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (this.dataset.autoplay === 'true' && !reduzir && this.slides.length > 1) this.iniciar();
        document.addEventListener('shopify:block:select', (e) => {
          const i = this.slides.indexOf(e.target);
          if (i > -1) { this.parar(); this.ir(i); }
        });
      }
      disconnectedCallback() { this.parar(); }
      ir(n) {
        const total = this.slides.length;
        if (!total) return;
        this.atual = (n + total) % total;
        this.slides.forEach((s, i) => (s.hidden = i !== this.atual));
        this.pontos.forEach((p, i) => (i === this.atual ? p.setAttribute('aria-current', 'true') : p.removeAttribute('aria-current')));
      }
      iniciar() {
        this.timer = setInterval(() => this.ir(this.atual + 1), 5000);
        if (this.tocar) { this.tocar.setAttribute('aria-pressed', 'true'); this.tocar.textContent = 'Pausar'; }
      }
      parar() {
        if (this.timer) clearInterval(this.timer);
        this.timer = null;
        if (this.tocar) { this.tocar.setAttribute('aria-pressed', 'false'); this.tocar.textContent = 'Tocar'; }
      }
    }
  );
}
