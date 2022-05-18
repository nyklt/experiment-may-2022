import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'dummy-ember-app/config/environment';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
});

loadInitializers(App, config.modulePrefix);
