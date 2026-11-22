if (!customElements.get('ct-card')) {
  customElements.define(
    'ct-card',
    class CtCard extends HTMLElement {
      connectedCallback() {
        this.form = this.querySelector('form');
        if (!this.form) return;
        this.idInput = this.form.querySelector('[name=id]');
        this.aviso = this.querySelector('.ct-card__aviso');
        this.botao = this.querySelector('[data-precisa-tamanho]');
        this.form.querySelectorAll('[data-variante]').forEach((radio) => {
          radio.addEventListener('change', () => {
            this.idInput.value = radio.value;
            if (this.aviso) this.aviso.hidden = true;
          });
        });
        // Roda antes do envio do Dawn: sem tamanho escolhido, nada vai para a sacola.
        this.addEventListener(
          'submit',
          (evento) => {
            if (!this.botao) return;
            if (this.form.querySelector('[data-variante]:checked')) return;
            evento.preventDefault();
            evento.stopImmediatePropagation();
            if (this.aviso) this.aviso.hidden = false;
            const primeiro = this.form.querySelector('[data-variante]:not(:disabled)');
            if (primeiro) primeiro.focus();
          },
          true
        );
      }
    }
  );
}
