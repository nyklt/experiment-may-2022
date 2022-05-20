import Component from '@glimmer/component';
import { action } from '@ember/object';

const cartKey = 'cart';

export default class ModalDialog extends Component {

    @action
    closeModal(){
        const appDialog = document.querySelector('app-dialog'); 
        appDialog.close();
    }

    get cartData(){
        let retrieveCartData;
        let retriveCartItems = localStorage.getItem(cartKey);
        return retrieveCartData = JSON.parse(retriveCartItems);
    }

    get appDialogModal() {
        return document.querySelector('app-dialog');
    }
}