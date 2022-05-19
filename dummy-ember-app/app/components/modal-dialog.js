import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

const cartKey = 'cart';

export default class ModalDialog extends Component {
    @tracked retrieveCartData;

    get appDialogModal() {
        let retriveCartItems = localStorage.getItem(cartKey);;
        this.retrieveCartData = JSON.parse(retriveCartItems);
        return document.querySelector('app-dialog');
    }
}