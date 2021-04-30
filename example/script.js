var btn = document.getElementById("change");

SmartVars.test.value.registerListener(function(val) {
  return "bonjour " + val;
});

SmartObjs.person.value.registerListener(function(val) {
  // this is called when a change is made to person SmartObj
  SmartVars["test"].value.set(val.n);
});

var names = [
  "Jean",
  "Pierre",
  "Arthur",
  "Arnaud",
  "Cédric",
  "Nicolas",
  "Romain",
  "Stéphane",
  "Lucas",
  "Corentin",
  "Bastien",
  "Kevin",
  "Théo",
  "Alexandre",
  "Phillipe",
  "Samuel",
  "Simon"
]

btn.addEventListener('click', function() {
  // Updating SmartVars
  SmartVars["test"].value.set("ok");
  
  // Updating SmartObjs

  // You can update specific fields independently
  SmartObjs["person"].value.set(names[Math.ceil(Math.random() * names.length - 1)], "n");
  SmartObjs["person"].value.set(Math.floor(Math.random() * 100), "age");
  SmartObjs["person"].value.set("6 rue Marc Sangnier", "person_adress.street");
  SmartObjs["person"].value.set("Vanves", "person_adress.city");
  SmartObjs["person"].value.set("France", "person_adress.country");
  
  // Or update the whole object
  SmartObjs["person"].value.set({n: names[Math.ceil(Math.random() * names.length - 1)], age: Math.floor(Math.random() * 100), person_adress: {street: "test 1", city: "test 2", country: "test 3"}});
});