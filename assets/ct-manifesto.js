if (!customElements.get('ct-manifesto')) {
  customElements.define(
    'ct-manifesto',
    class CtManifesto extends HTMLElement {
      connectedCallback() {
        this.palco = this.querySelector('.ct-manifesto__palco');
        this.tempos = Array.from(this.querySelectorAll('[data-tempo]'));
        this.batidas = Array.from(this.querySelectorAll('[data-batida]'));
        this.progresso = this.querySelector('[data-progresso]');
        this.botaoTocar = this.querySelector('[data-tocar]');
        this.atual = 0;
        this.timer = null;

        this.batidas.forEach((b) => b.addEventListener('click', () => this.ir(Number(b.dataset.batida))));
        const anterior = this.querySelector('[data-anterior]');
        const proximo = this.querySelector('[data-proximo]');
        if (anterior) anterior.addEventListener('click', () => this.ir(this.atual - 1));
        if (proximo) proximo.addEventListener('click', () => this.ir(this.atual + 1));
        if (this.botaoTocar) this.botaoTocar.addEventListener('click', () => this.alternar());

        this.ir(0);
      }

      disconnectedCallback() {
        this.parar();
      }

      ir(n) {
        const total = this.tempos.length;
        if (!total) return;
        this.atual = (n + total) % total;
        const t = this.tempos[this.atual];
        this.tempos.forEach((el, i) => (el.hidden = i !== this.atual));
        this.batidas.forEach((b, i) => {
          b.classList.toggle('is-visto', i <= this.atual);
          if (i === this.atual) b.setAttribute('aria-current', 'step');
          else b.removeAttribute('aria-current');
        });
        if (this.palco) {
          const escuro = t.dataset.fg === '#02070A';
          this.palco.style.setProperty('--ct-m-bg', t.dataset.bg);
          this.palco.style.setProperty('--ct-m-fg', t.dataset.fg);
          this.palco.style.setProperty('--ct-m-ac', t.dataset.ac);
          this.palco.style.setProperty('--ct-m-linha', escuro ? 'rgba(2,7,10,0.25)' : 'rgba(238,232,218,0.3)');
        }
        if (this.progresso) this.progresso.textContent = 'Tempo ' + (this.atual + 1) + ' de ' + total;
      }

      alternar() {
        if (this.timer) {
          this.parar();
        } else {
          this.timer = setInterval(() => this.ir(this.atual + 1), 3200);
          this.botaoTocar.setAttribute('aria-pressed', 'true');
          this.botaoTocar.textContent = 'Pausar';
        }
      }

      parar() {
        if (this.timer) clearInterval(this.timer);
        this.timer = null;
        if (this.botaoTocar) {
          this.botaoTocar.setAttribute('aria-pressed', 'false');
          this.botaoTocar.textContent = 'Tocar o compasso';
        }
      }
    }
  );
}
