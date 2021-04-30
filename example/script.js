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
  var request_data = {
    n: names[Math.ceil(Math.random() * names.length - 1)],
    age: Math.floor(Math.random() * 100),
    person_adress: {
      street: "test 1",
      city: "test 2",
      country: "test 3"
    }
  };
  // Simulate example request reponse after 1 second using the data above
  setTimeout(function(/* request_data */) {
    SmartObjs.person.value.set(request_data);
  }, 1000);
});