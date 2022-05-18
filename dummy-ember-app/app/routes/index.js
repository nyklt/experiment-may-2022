import Route from '@ember/routing/route';

const productsKey = 'products_ember';
const featureFlagsKey = 'feature-flags';

export default class IndexRoute extends Route {
  async model() {
    const model = {};
    model.products = JSON.parse(localStorage.getItem(productsKey));
    model.featureFlags = JSON.parse(localStorage.getItem(featureFlagsKey));

    return model;
  }
}
