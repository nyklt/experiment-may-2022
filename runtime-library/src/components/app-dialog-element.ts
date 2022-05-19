import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * Dialog element.
 */
@customElement('app-dialog')
export class AppDialog extends LitElement {
  static styles = css`
    dialog#app-dialog {
      background: transparent;
      padding: 100px;
    }
  `;

  @property({ type: Boolean })
  isOpen!: boolean;

  @query('#app-dialog')
  dialog: any;

  handleClick({ target: dialog }: { target: any }) {
    if (dialog.nodeName === 'DIALOG') {
      dialog.close('dismiss');
    }
  }

  showModal() {
    this.dialog.showModal();
  }

  close() {
    this.dialog.close();
  }

  render() {
    return html` <link rel="stylesheet" href="http://localhost:8080/cdnassets/rup-styles.css" />
      <dialog id="app-dialog" open=${ifDefined(this.isOpen ? this.isOpen : undefined)} @click=${this.handleClick}>
        <slot name="dialog"></slot>
      </dialog>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-dialog': AppDialog;
  }
}
