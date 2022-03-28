**This project is discontinued. No further development.**

**A new version, more modern, more performance friendly and more maintainable is coming soon and has been renamed to ***SmartDOM***.**

# SmartVars

This script is designed to integrate reactive DOM elements easily in a classic HTML file.

## Installation

Simply copy the `SmartVars.js` file located in the `src` folder in your project directory and add the following at the end of your `body` element :

```html
<script type="text/javascript" src="SmartVars.js"></script>
```

## Initialisation

The reactive variables initialisation is made in the HTML using specifics tags.

For example :

```html
<SmartVar id="example">Test</SmartVar>
```

This will create a reactive variable named "example" with the value `Test`.

You can also create `SmartObjects` :

```html
<SmartObj id="list">
	<SmartObjField id="elem1">Elem1</SmartObjField>
	<SmartObjField id="elem2">Elem2</SmartObjField>
	<SmartObj id="elem3">
		<SmartObjField id="elem3-1">Elem3-1</SmartObjField>
		<SmartObjField id="elem3-2">Elem3-2</SmartObjField>
	</SmartObj>
</SmartObj>
```

(Nested objects are possible)

## Listening for changes

You can listen for `SmartVars` and `SmartObjs` changes using the following :

```javascript
/*
	Val is the new value (passed in .set())
	The return value is optional. If it's provided, the returned content will be used for the render. If not, val will be.
*/
SmartVars.example.value.registerListener(function(val) {
  return "Test2";
});
```

It also works for `SmartObjs`. In this case, val is the whole object.

## Modifying values

To change a `SmartVar` value, you will use the `.set()` function, like so :

```javascript
SmartVars.example.value.set(/* new value*/);
```

For `SmartObjs` there's two ways of modifying the values :

```javascript
SmartObjs.list.value.set(/* new value*/, /* field name */); // Update a single field
SmartObjs.list.value.set({/* Your new object */}); // Update the whole object
```

The field name allow dot notation to make deep modifications.

## Style

You can change style of SmartVars by using :

```javascript
SmartVars.example.value.setStyle(/* css property */, /* property value */);
```

You can also change classes directly by using the following method :

```javascript
SmartVars.example.value.addClass(/* class name */); // add the class to the associated html node
SmartVars.example.value.removeClass(/* class name*/); // Remove the class for the associated html node
```
