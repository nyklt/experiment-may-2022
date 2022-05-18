import Component from '@glimmer/component';
import { action } from '@ember/object';

const cartKey = 'cart';

export default class ProductItemComponent extends Component {

    @action addToCart(item) {
        const ls = localStorage.getItem(cartKey);
        let cart = ls ? JSON.parse(ls) : [];
        
        if (cart?.some(x => x.name === item.name)) return;

        cart.push(item);
        localStorage.setItem(cartKey, JSON.stringify(cart));
    }
}