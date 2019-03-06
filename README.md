# \<d2l-activity-alignments\>



## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```
The demo can be viewed at http://127.0.0.1:8081/components/d2l-activity-alignments/demo/

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.

### Test with LMS API

1. Comment out request-mock.js in the demo/index.html
	* `<script type="module" src="./request-mock.js"></script>`

2. Import the required module
	* For example: `<script type="module" src="../d2l-alignment-list.js"></script>`

3. Get href and token from quad site for the module you want to test, by insepcting element using F12(chrome)

4. Have fun testing

### Display d2l-activity-alignments

```html
<script type="module" src="../d2l-alignment-alignments.js"></script>

<demo-snippet>
	<template>
		<d2l-activity-alignments href="<copy from quad site>" token="<copy from quad site>"></d2l-activity-alignments>
	</template>
</demo-snippet>
```

### Display outcome alignments in tag view

#### Read-Only View

```html
<d2l-activity-alignment-tags
	href="<activity usage URL>"
	token="<auth token>"
	read-only
></d2l-activity-alignment-tags>
```

#### Editable View

```html
<d2l-activity-alignment-tags
	id="my-alignments"
	href="<activity usage URL>"
	token="<auth token>"
></d2l-activity-alignment-tags>

<script>
document.getElementById( 'my-alignments' ).addEventListener( 'd2l-activity-alignment-tags-update', function( event ) {
	var sirenAction = event.sirenAction;
	// Event fired when the Add button is clicked
	// ...
});
</script>
```