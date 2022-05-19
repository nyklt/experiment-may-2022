import Component from '@glimmer/component';

const cartKey = 'products_ember';

export default class ModalDialog extends Component {

    get cartData(){
        let retrieveCartData;
        let retriveCartItems = localStorage.getItem(cartKey);
        return retrieveCartData = JSON.parse(retriveCartItems);
    }

    get appDialogModal() {
        return document.querySelector('app-dialog');
    }
}