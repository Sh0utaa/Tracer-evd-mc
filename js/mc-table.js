// if (!localStorage["mc-problem"]) {
//    window.location.replace("../../index.php");
// }

let mc_problem = window.sessionStorage.getItem("mc-problem") || "W";
// amocanis saxelis minicheba cxrilis header-stvis
$("#mc-table-header")[0].innerHTML = mc_problem + " path Table";
// archeuli cxrilis shesabamisi konteineri
let selected_table = $("#mc-table-" + mc_problem)[0];
// archeuli cxrilis konteineris gaaqtiureba
selected_table.style.display = "inline-table";

//user-is jgufis saxeli
let selected_group = window.sessionStorage.getItem("group");

//cvladi romelic sheicavs informacias cxrilis striqonebze
let mc_table_row =
  '<tr class="mc-table-rows">\
    <td class="eventIndex">01</td>';
for (i = 1; i < selected_table.querySelectorAll("th").length - 2; i++) {
  mc_table_row +=
    '<td><input type="radio" class="mc-radio-inputs" name="radio"></td>';
}
if (mc_problem == "W")
  mc_table_row +=
    '<td><input "type="number" min="0" max="360" class="table-angle" disabled></td>';
else
  mc_table_row +=
    '<td><input type="radio" class="mc-radio-inputs" name="radio"></td>';
mc_table_row +=
  '<td><button title="Edit" class="mc-edit-button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>\
   </button></td></tr>';

//cxrilshi pirveli striqonis damateba
$("#" + mc_problem + "-table-rows-body").append(mc_table_row);

// localStorage.clear();

//funqcia romelic submit gilakze dacherisas yvela aqtiur radio buttons xdis disabled
let submit_if_checked = function () {
  // edit-is shemtxvevashi gaaqtiurdes shesabamisi radio buttonebi
  if ($(".mc-table-rows:last-child input")[0].disabled) {
    $(".mc-table-rows:last-child input").each(function () {
      this.disabled = false;
    });
    changeEvent(
      selected_group,
      $(".mc-table-rows:last-child .eventIndex")[0].textContent
    );
  }
  // bolo eventis radio buttonebi gaxdes disabled
  if ($(".mc-radio-inputs:not(:disabled):checked")[0]) {
    $(".mc-radio-inputs:not(:disabled):checked")[0]
      .closest("tr")
      .querySelectorAll("input")
      .forEach((element) => {
        element.disabled = true;
      });
  }
};
let changeEvent = function (group, number) {
  $("#archive").val(group).change();
  $("#XMLFiles").val(number).change();
  //load event
  EVENT = new Event("Event", 0); //EVENT klasis globaluri obieqti, romelsac enicheba saxeli indeqsi
  EVENT.initExtras();
};
////// event listeners///////
$(document).on("change", ".mc-radio-inputs", function (event) {
  if (mc_problem != "W") return;
  let selectedRadio = event.target.closest("td");
  let angleInput = selectedRadio
    .closest("tr")
    .querySelectorAll(".table-angle")[0];
  if (
    selected_table.querySelectorAll("th")[selectedRadio.cellIndex]
      .textContent == "WW"
  ) {
    angleInput.disabled = false;
  } else {
    angleInput.disabled = true;
    angleInput.value = "";
  }
});
// submit gilakze dacheris funqcia
$("#mc-table-next-button").click(function () {
  submit_if_checked();

  if (!$(".mc-radio-inputs:last")[0].disabled) {
    selected_table.rows.length - 1 >= eventMaxNumber &&
      $("#mc-table-next-button")[0].setAttribute("disabled", true);
    return;
  }
  $(".mc-table-rows:last-child")[0]
    .querySelectorAll(".mc-radio-inputs")
    .forEach((element) => {
      element.name += selected_table.rows.length - 1;
    });
  $(".mc-edit-button")[selected_table.rows.length - 2].style.display = "flex";
  $("#" + mc_problem + "-table-rows-body").append(mc_table_row);
  selected_table
    .querySelectorAll(".mc-table-rows:last-child")[0]
    .querySelectorAll("td")[0].innerHTML = String(
    selected_table.rows.length - 1
  ).padStart(2, "0");
  loadNextEvent();
  selected_table.rows.length - 1 >= eventMaxNumber &&
    $("#mc-table-next-button")[0].setAttribute("disabled", true);
});
//edit gilakze dacheris funqcia
$(document).on("click", ".mc-edit-button", function () {
  // next gilakis gaaqtiureba tu gauqmebuli iyo
  $("#mc-table-next-button")[0].getAttribute("disabled") &&
    $("#mc-table-next-button")[0].removeAttribute("disabled");
  //yvelaze bolos chatvirtuli striqonis gauqmeba
  $(".mc-table-rows:last input").each(function () {
    this.disabled = true;
  });

  if ($(".mc-radio-inputs:not(:disabled):checked").length > 0) {
    alert("Check answer and press Next to continue!");
    return;
  }
  //archeuli striqonze disabled parametris moxsna
  this.closest("tr")
    .querySelectorAll("input")
    .forEach((element) => {
      element.disabled = false;
    });

  //archeuli striqonis shesabamisi event chatvirtva
  let currentEventNumber =
    this.closest("tr").querySelectorAll(".eventIndex")[0].textContent;
  changeEvent(selected_group, currentEventNumber);
});

//////
setFormValues = function () {
  $("#ww_form input[name=ww_angle]")[0].setAttribute("value", "");
  $("#ww_form input[name='group_name']").val(selected_group);
  $(".mc-radio-inputs:checked").each(function () {
    let cellIndex = this.closest("td").cellIndex;
    let eventType = selected_table
      .querySelectorAll("th")
      [cellIndex].getAttribute("name");
    $("#ww_form input[name=" + eventType + "]")[0].setAttribute(
      "value",
      Number($("#ww_form input[name=" + eventType + "]")[0].value) + 1
    );
    if (eventType.toLowerCase() == "ww") {
      $("#ww_form input[name=ww_angle]")[0].setAttribute(
        "value",
        $("#ww_form input[name=ww_angle]")[0].value +
          this.closest("tr").querySelectorAll(".table-angle")[0].value +
          "; "
      );
    }
  });
};

$(".table-angle").keyup(function () {
  if (
    !Number(this.value) ||
    Number(this.value) < 0 ||
    Number(this.value) > 360
  ) {
    this.value = this.value.toString().slice(0, -1);
  }
});

$("#ww_form").submit(function (event) {
  // if (localStorage.getItem("sessionID")==="guest") {
  //   event.preventDefault();
  //   window.alert("You cannot submit results in guest mode.");
  // }  
  event.preventDefault();

  const isConfirmed = window.confirm(
    "Are you sure you want to end the session and submit the results?"
  );

  if (!isConfirmed) {
    return; // Stop submission if the user cancels
  }

  const formData = {
    positron: $("#positron").val(),
    electron: $("#electron").val(),
    muon: $("#muon").val(),
    antimuon: $("#antimuon").val(),
    background: $("#background").val(),
    WW: $("#ww").val(),
    angles: $("#ww_angle").val().split("; ").map((angle) => Number(angle)).slice(0, -1),
  };

  const reqBody = {
    id : localStorage.getItem("sessionID"),
    newResult: {[selected_group] : formData},
  }

  addResultToDB(reqBody).then(data => {
    console.log(data);
    window.location.replace("https://tracer-mc.up.railway.app/results/" + localStorage.getItem("sessionID"));
  });

  
  document.getElementById("sessionID").value =
    localStorage.getItem("sessionID");
  

});
