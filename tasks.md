# TODO 

## Runtime library (Ivan +)

[x] Add apps to app switcher\
[x] Integrate app switcher into apps (the production version) like from CDN !\
	[x] Render application menus in the app header\
	[x] Render a basic logo in the app header\
[ ] in-element render as alternative to app-header in framework lifecycle
[ ] dialog component

## React app (Pepe +)

[ ] Render all products from local storage\
[ ] Add to cart\
[ ] Read feature flags from local storage\
[ ] Extend the react layout\
[ ] Render two search controls based on feature flags\
[ ] Render two side panels based on feature flags\

## Ember app (Cristina + Alberto)

[x] Render all products from local storage\
[x] Add to cart\
[x] Read feature flags from local storage\
[x] Extend the ember layout\
[x] Render two search controls based on feature flags\
[x] Render two side panels based on feature flags\
[ ] Explore lazy loading of components based on feature flags !\
[ ] Render dialog from runtime library using in-element
[ ] Adding a product to the cart shows a dialog saying "added to cart" and two buttons: "proceed to checkout" and "buy now"

## Checkout app (Denisa)

[x] Render selected products from local storage\
[x] Remove from cart\
[x] Checkout confirmation clears cart\

# Commands

`brew install nginx`

1. Edit this file: `/usr/local/etc/nginx/nginx.conf`.
1. Paste the contents from the repo and edit according to your folder structure.
1. To start nginx: `nginx`
1. if you edit nginx.conf you need to restart nginx `nginx -s restart`.
