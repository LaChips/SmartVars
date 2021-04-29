# SmartVars

This script is designed to integrate reactive DOM elements easily.

## Initialisation

The reactive variables initialisation is made in the HTML using specifics tags.

For example :

```html
<SmartVar id="example">Test</SmartVar>
```

This will create a reactive variable with the value `Test`.

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
SmartVars.example.value.registerListener(function(val) {
  // Val is the new value
  return "Test2"; // What you return will replace the variable DOM innerText without changing the original value. If no return is provided, the innerText will be val;
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
SmartObjs.list.value.set(/* new value*/, /* field name */);
```

The field name allow dot notation to allow deep modifications.

For now, modifying objects requires to change each field individually. However, I am working on a way to allow an object to be passed in `.set()`
