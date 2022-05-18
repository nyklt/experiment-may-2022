function seed() {
	localStorage.setItem("cart", '');
	localStorage.setItem("feature-flags", '{"isSearch1": true, "isSearch2": true, "isSide1": true, "isSide2": true}');
	localStorage.setItem("products_ember", '[{"name":"Product1"},{"name":"Product2"},{"name":"Product3"}]');
	localStorage.setItem("products_react", "");

	// add seeds here
}