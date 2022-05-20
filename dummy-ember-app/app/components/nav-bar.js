import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class NavBar extends Component {
  @action
  openModal(){
      const appDialog = document.querySelector('app-dialog'); 
      appDialog.showModal();
  }

  get appHeaderContainer() {
    return document.querySelector('app-header');
  }
}
