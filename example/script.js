var btn = document.getElementById("change");

SmartVars.test.value.registerListener(function(val) {
  console.log("test :", val);
  return "bonjour2";
});

SmartObjs.person.value.registerListener(function(val) {
  console.log("person :", val);
  // NOT WORKING YET : Does nothing
  return {n: "test", age:12, person_adress: {street: "test 1", city: "test 2", country: "test 3"}};
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
  // SmartObjs.x.value.set(value, fieldname)
  SmartObjs["person"].value.set(names[Math.ceil(Math.random() * names.length - 1)], "n");
  SmartObjs["person"].value.set(Math.floor(Math.random() * 100), "age");
  SmartObjs["person"].value.set("6 rue Marc Sangnier", "person_adress.street");
  SmartObjs["person"].value.set("Vanves", "person_adress.city");
  SmartObjs["person"].value.set("France", "person_adress.country");
  // NOT WORKING YET : Crash
  //SmartObjs["person"].value.set({"n": "Titouan", "age": "24"});
  SmartVars["test"].value.set("ok");
});