fetch("http://localhost:3000")
  .then((response) => response.json())
  .then((data) => calculatePayment(data));

function calculatePayment(data) {
  const select_fees = document.getElementById("fees");
  let fee_type = null;

  select_fees.options.add(new Option("Select fees type", "Select fees type"));
  Object.keys(data).forEach(function (key) {
    let option;
    option = document.createElement("option");
    option.text = key;
    option.value = key;
    select_fees.add(option);
  });

  select_fees.addEventListener("change", function handleChange(event) {
    fee_type = event.target.value;
    document.getElementById("nationality").removeAttribute("hidden");
    document.getElementById("nationality_label").removeAttribute("hidden");

    dropdown = document.getElementById("nationality");
    document
      .getElementById("nationality")
      .options.add(new Option("Select nationality", "Select nationality"));

    Object.keys(data[fee_type]).forEach(function (key) {
      let option;
      option = document.createElement("option");
      option.text = key;
      option.value = key;
      dropdown.add(option);
    });
    document.getElementById("fees").setAttribute("disabled", "");
  });

  const select_natioanlity = document.getElementById("nationality");
  let nationality_type = null;

  select_natioanlity.addEventListener("change", function handleChange(event) {
    nationality_type = event.target.value;
    document.getElementById("course").removeAttribute("hidden");
    document.getElementById("course_label").removeAttribute("hidden");

    dropdown = document.getElementById("course");
    document
      .getElementById("course")
      .options.add(new Option("Select course", "Select course"));

    var all_courses_keys = ["Medical", "Dental", "Ayurveda"];

    Object.keys(data[fee_type][nationality_type]).forEach(function (key) {
      if (key == "ALL_COURSES") {
        all_courses_keys.forEach(function (data) {
          let option;
          option = document.createElement("option");
          option.text = data;
          option.value = key;
          dropdown.add(option);
        });
      } else {
        let option;
        option = document.createElement("option");
        option.text = key;
        option.value = key;
        dropdown.add(option);
      }
    });
    document.getElementById("nationality").setAttribute("disabled", "");
  });

  const select_course = document.getElementById("course");
  let course_type = null;

  select_course.addEventListener("change", function handleChange(event) {
    course_type = event.target.value;
    document.getElementById("level").removeAttribute("hidden");
    document.getElementById("level_label").removeAttribute("hidden");

    dropdown = document.getElementById("level");
    document
      .getElementById("level")
      .options.add(new Option("Select level", "Select level"));

    var all_level_keys = ["UG", "PG", "Diploma", "Ph.D"];

    Object.keys(data[fee_type][nationality_type][course_type]).forEach(
      function (key) {
        if (key == "ALL_LEVEL") {
          all_level_keys.forEach(function (data) {
            let option;
            option = document.createElement("option");
            option.text = data;
            option.value = key;
            dropdown.add(option);
          });
        } else {
          let option;
          option = document.createElement("option");
          option.text = key;
          option.value = key;
          dropdown.add(option);
        }
      }
    );
    document.getElementById("course").setAttribute("disabled", "");
  });

  const select_level = document.getElementById("level");
  let level_type = null;
  select_level.addEventListener("change", function handleChange(event) {
    let level_type = event.target.value;
    var ans = document.getElementById("answer");
    ans.removeAttribute("hidden");
    let fee_amount_net =
      data[fee_type][nationality_type][course_type][level_type]["amount"];
    ans.innerHTML = "Fees Amount: " + fee_amount_net + " Rupees";
  });
}
