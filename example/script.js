var btn = document.getElementById("change");

// This function will be called whenever test value changes
// Here, the value displayed will be "Hello" + val;
SmartVars.test.value.registerListener(function(val) {
  return "Hello " + val;
});

// This function will be called whenever a person's object value is modified
// Here, we are using the person's n field to assign test value and we sets its text color to red
SmartObjs.person.value.registerListener(function(val) {
  // this is called when a change is made to person SmartObj
  SmartVars["test"].value.set(val.n);
  SmartVars["test"].value.setStyle("color", "red");
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