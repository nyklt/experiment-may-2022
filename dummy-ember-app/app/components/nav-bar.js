import Component from '@glimmer/component';
export default class NavBar extends Component {
  get appHeaderContainer() {
    return document.querySelector('app-header');
  }
}
