import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

/**
 * Header element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('app-header')
export class AppHeader extends LitElement {
  @state()
  private showAppSwitcher = false;

  showHideAppSwitcher() {
    this.showAppSwitcher = !this.showAppSwitcher;
  }

  render() {
    return html`
      <style>
        /* 
        We are importing it just for demo purposes, there are few options we may take for that
          1) Create a specific css file (only with needed css classes)
          2) We may crete our own css classes following rup-style but not importing them
        */
        @import 'styles.css';
      </style>
      <!-- To future investigation: spread attrs operator -> https://github.com/lit/lit/pull/1960 -->
      <header class="rup-global-header">
        <div>
          <slot name="logo"><!-- You may provide here a logo img wrapped by an anchor --></slot>
          <slot name="search-control"><!-- You may provide here your custom search bar --></slot>
          <slot name="app-menu"><!-- You may provide here your custom app menu --></slot>
          <!-- Header controls -->
          <div
            class="rup-global-header__controls"
            role="navigation"
            aria-label="The application's global header controls">
            <slot name="local-controls"><!-- You may provide here your local controls --></slot>
            <!-- Global controls -->
            <div class="rup-global-header__global-controls">
              <!-- TODO: review i18n -->
              <!-- Help icon -->
              <a
                href="https://www.copyright.com/rightfind-resource-center/?filter-product=rightfind-suite-gateway"
                target="_blank"
                title="Help"
                rel="noopener noreferrer"
                class="rup-global-header__global-controls-link">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon-help">
                  <path
                    class="primary"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4 12a8 8 0 1116 0 8 8 0 01-16 0zm8-10C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 8a1 1 0 111 1 1 1 0 00-1 1v1a1 1 0 102 0v-.17A3.001 3.001 0 109 10a1 1 0 102 0zm2 5.75a1 1 0 10-2 0V16a1 1 0 102 0v-.25z"></path>
                </svg>
              </a>
              <!-- App switcher -->
              <div class="rup-global-header__app-switcher">
                <button
                  class="rup-global-header__app-switcher-trigger"
                  aria-expanded="false"
                  id="rup-switcher-app"
                  title="App switcher"
                  type="button"
                  @click=${this.showHideAppSwitcher}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon-apps" role="img">
                    <path
                      class="primary"
                      d="M7 5a2 2 0 11-4 0 2 2 0 014 0zM21 5a2 2 0 11-4 0 2 2 0 014 0zM12 7a2 2 0 100-4 2 2 0 000 4zM7 12a2 2 0 11-4 0 2 2 0 014 0zM19 14a2 2 0 100-4 2 2 0 000 4zM14 12a2 2 0 11-4 0 2 2 0 014 0zM5 21a2 2 0 100-4 2 2 0 000 4zM21 19a2 2 0 11-4 0 2 2 0 014 0zM12 21a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
                </button>
                <nav
                  class="rup-global-header__app-switcher-options ${this.showAppSwitcher ? '' : 'visuallyhidden'}"
                  aria-labelledby="rup-switcher-app"
                  aria-describedby="rup-gc-switcher-desc"
                  aria-label="CCC Applications">
                  <p class="rup-visually-hidden" id="rup-gc-switcher-desc">
                    This shows the CCC Applications that you have access to. They will open in a new Tab.
                  </p>
                  <div>
                    <span class="rup-global-header__app-switcher-options-label"> RightFind Suite </span>
                    <ul>
                      <li>
                        <a
                          href="https://rightfind-navigate.aws-p-dev.copyright.com/"
                          title="Open RightFind Navigate in a new tab"
                          target="_blank"
                          rel="noopener noreferrer">
                          <svg
                            class="rightfind-navigate"
                            width="88"
                            height="40"
                            viewBox="0 0 88 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img">
                            <path
                              d="M0 .99v13.861h2.494V9.188h.886l4.023 5.663h3.098l-4.365-5.9c1.65-.456 3.218-1.644 3.218-3.882C9.354 2.12 6.578.99 4.345.99H0zm3.883 6.1H2.494v-4h1.79c1.45 0 2.435.811 2.435 2.039 0 1.386-1.207 1.96-2.836 1.96zm8.489-2.437v10.198h2.434V4.653h-2.434zm0-3.9V2.99h2.434V.752h-2.434zM22.38 19.327c1.93 0 3.701-.654 4.626-2.317.403-.713.624-1.604.624-2.693V4.653h-2.233l-.12 1.169c-.785-.97-2.093-1.406-3.2-1.406-2.976 0-5.008 2.416-5.008 5.188 0 2.95 2.132 5.248 4.948 5.248 1.107 0 2.415-.416 3.159-1.426v1.148c0 1.862-1.267 2.654-2.857 2.654-1.146 0-2.635-.456-3.721-1.268l-.906 1.98c1.368.931 3.098 1.387 4.688 1.387zm.1-6.575c-1.79 0-2.937-1.445-2.937-3.089 0-1.544.966-3.148 2.998-3.148.945 0 1.93.396 2.635 1.287v3.386c-.584 1.09-1.71 1.564-2.696 1.564zM30.524 0v14.851h2.434V8.08c.604-.95 1.61-1.564 2.575-1.564.744 0 1.267.257 1.57.772.381.634.402 1.584.402 2.436v5.128h2.434V9.546c0-1.486-.161-2.832-.926-3.822-.643-.812-1.609-1.307-2.856-1.307a3.933 3.933 0 00-3.199 1.624V0h-2.434zM46.14 15.07c.765 0 1.65-.199 2.253-.535l-.724-1.822a2.39 2.39 0 01-1.146.277c-.745 0-1.006-.396-1.107-1.188-.04-.317-.04-.614-.04-.91v-4.22h2.736v-2.02h-2.736V2.317h-2.193l-.261 2.336h-1.288v2.02h1.288v4.575c0 .673.06 1.346.261 1.88.423 1.169 1.408 1.941 2.957 1.941zM50.547.99v13.861h2.495V9.11h5.029v-2.1h-5.03V3.09h5.03V.99h-7.524zm9.857 3.663v10.198h2.435V4.653h-2.434zm0-3.9V2.99h2.435V.752h-2.434zm5.462 3.9v10.198H68.3V8.08c.603-.95 1.61-1.564 2.575-1.564.744 0 1.267.257 1.57.772.381.634.401 1.584.401 2.436v5.128h2.434V9.546c0-1.486-.16-2.812-.925-3.822-.623-.832-1.61-1.307-2.856-1.307-1.248 0-2.475.574-3.3 1.742l-.12-1.505h-2.213zM82.407 15.09c1.147 0 2.495-.437 3.24-1.545l.12 1.306H88V0h-2.454v5.703c-.805-.871-2.032-1.287-3.098-1.287-2.977 0-5.01 2.515-5.01 5.307 0 2.97 2.113 5.366 4.97 5.366zm.463-2.1c-1.83 0-2.957-1.545-2.957-3.208 0-1.564.966-3.267 2.998-3.267.945 0 1.93.396 2.635 1.287v3.604c-.584 1.109-1.71 1.584-2.676 1.584zM11.286 35.644V21.782H9.877v11.149L1.47 21.782H.362v13.862H1.77v-11.13l8.389 11.13h1.127zm9.897 0h1.227v-5.901c0-2.495-.905-4-3.822-4-1.287 0-2.816.435-3.721.851l.462 1.208c.765-.416 2.052-.832 3.199-.832 1.71 0 2.515.891 2.515 2.495V30c-.886-.218-1.57-.297-2.233-.297-2.092 0-4.346.93-4.346 3.307 0 1.822 1.59 2.871 3.4 2.871 1.127 0 2.273-.356 3.219-1.366l.1 1.129zm-.14-4.555v2.238c-.926.871-2.012 1.445-3.139 1.445-1.146 0-2.072-.752-2.072-1.92 0-1.505 1.57-2.04 2.917-2.04.704 0 1.449.08 2.294.277zm6.762 4.555h1.69l3.662-9.664h-1.469l-2.957 8.178-2.776-8.178h-1.489l3.34 9.664zm8.79 0V25.98h-1.368v9.664h1.368zm0-11.822V21.96h-1.368v1.862h1.368zm12.311 2.158h-1.368v.95c-.845-.772-2.031-1.187-3.138-1.187-2.877 0-5.05 2.356-5.05 4.99 0 2.633 2.153 4.91 5.03 4.91 1.207 0 2.414-.514 3.158-1.485v1.347c0 2.376-1.75 3.267-3.6 3.267-1.409 0-2.857-.594-3.722-1.267l-.563 1.129C40.88 39.446 42.449 40 43.958 40c2.615 0 4.948-1.505 4.948-4.91v-9.11zm-1.368 6.614c-.563 1.129-1.91 1.822-3.118 1.822-2.152 0-3.661-1.802-3.661-3.762 0-1.941 1.529-3.684 3.661-3.684 1.127 0 2.394.594 3.118 1.525v4.1zm10.892 3.05h1.228v-5.901c0-2.495-.905-4-3.822-4-1.288 0-2.816.435-3.722.851l.463 1.208c.764-.416 2.052-.832 3.199-.832 1.71 0 2.514.891 2.514 2.495V30c-.885-.218-1.57-.297-2.233-.297-2.092 0-4.345.93-4.345 3.307 0 1.822 1.59 2.871 3.4 2.871 1.126 0 2.273-.356 3.218-1.366l.1 1.129zm-.14-4.555v2.238c-.925.871-2.012 1.445-3.138 1.445-1.147 0-2.072-.752-2.072-1.92 0-1.505 1.569-2.04 2.917-2.04.704 0 1.448.08 2.293.277zm9.318-3.881V25.98H64.75v-2.416h-1.368v2.416h-1.388v1.228h1.388v5.485c0 2 .946 3.129 2.857 3.129a3.35 3.35 0 001.569-.416l-.342-1.07c-.443.159-.845.258-1.207.258-.905 0-1.509-.317-1.509-2.06v-5.326h2.857zm10.559 3.94c.02-.178.06-.574.06-.89 0-2.397-1.83-4.515-4.365-4.515-2.675 0-4.808 2.158-4.808 5.01 0 2.831 1.75 5.128 4.97 5.128 1.488 0 3.198-.752 3.982-2.198l-.965-.614c-.704 1.307-1.81 1.664-3.118 1.664-2.133 0-3.38-1.723-3.5-3.584h7.744zM76.88 30h-6.417c.281-1.802 1.508-3.109 3.4-3.109 1.669 0 2.936 1.485 3.017 3.109z"
                              fill="#00326E"></path>
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
            <slot name="user-menu"><!-- You may provide here your user menu --></slot>
          </div>
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-header': AppHeader;
  }
}
