const SessionInfo={
  city: undefined,
  createdAt: undefined,
  sessionResults: undefined
}

const tableRow = (group,result)=>{
  $("#total-positron")[0].textContent = Number($("#total-positron")[0].textContent) + Number(result.positron);
  $("#total-electron")[0].textContent = Number($("#total-electron")[0].textContent) + Number(result.electron);
  $("#total-antimuon")[0].textContent = Number($("#total-antimuon")[0].textContent) + Number(result.antimuon);
  $("#total-muon")[0].textContent = Number($("#total-muon")[0].textContent) + Number(result.muon);
  $("#total-background")[0].textContent = Number($("#total-background")[0].textContent) + Number(result.background);
  $("#total-ww")[0].textContent = Number($("#total-ww")[0].textContent) + Number(result["WW"]);
  return `
  <tr>  
      <td scope="row" class="table-row-group">${group}</td>
      <td scope="row" class="table-row-positron">${result.positron}</td>
      <td scope="row" class="table-row-electron">${result.electron}</td>
      <td scope="row" class="table-row-antimuon">${result.antimuon}</td>
      <td scope="row" class="table-row-muon">${result.muon}</td>
      <td scope="row" class="table-row-background">${result.background}</td>
      <td scope="row" class="table-row-ww">${result["WW"]}</td>
      <td scope="row" class="table-row-angles">${result.angles}</td>
  </tr>
`
}

fetchData(localStorage["sessionID"]).then((data) => {
  const {city , createdAt, sessionResults} = data.session;
  SessionInfo.city = city;
  SessionInfo.sessionResults = sessionResults;
  const sessionDate = new Date(createdAt);
  SessionInfo.createdAt = sessionDate.toLocaleDateString();
  $(".header-text")[0].innerHTML = city + " " + sessionDate.toLocaleDateString();
  $(".table-body")[0].innerHTML = Object.entries(sessionResults).map(([key,value]) => tableRow(key,value)).join("");

})

const searchFunction = function () {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("results-table-id");
  
  // Target only tbody rows to keep footer row unaffected
  const tbodyRows = table.querySelector("tbody").getElementsByTagName("tr");

  for (i = 0; i < tbodyRows.length; i++) {
    td = tbodyRows[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      tbodyRows[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
    }
  }
};

// Attach event listener to search input
document.getElementById("searchInput").addEventListener("keyup", searchFunction);


$(".download-txt-btn")[0].addEventListener("click", (_) =>
  exportTableToExcel("results-table-id")
);

const resTable = $(".table-body")[0];
let wwEventsObj = {};
let allWWNum = 0;
let anglesArr = [];
for (let i = 1; i < resTable.rows.length; i++) {
  allWWNum += Number(resTable.rows[i].cells[6].textContent);
  let arr = resTable.rows[i].cells[7].textContent.split(";");
  arr.pop();
  anglesArr = anglesArr.concat(arr);
}
let anglesMap = new Map();
anglesArr.forEach(function (el) {
  let angle = Number(el);
  if (anglesMap.has(angle)) {
    anglesMap.set(angle, anglesMap.get(angle) + 1);
  } else {
    anglesMap.set(angle, 1);
  }
});


///////////////////// create plot

const xArray = [...anglesMap.keys()];
const yArray = [...anglesMap.values()];
const data = [
  {
    x: xArray,
    y: yArray,
    type: "bar",
  },
];
const layout = {
  xaxis: { range: [0, 180], title: "phi angle" },
  yaxis: { range: [0, 20], title: "WW number" },
  title: "WW events angle distribution",
};
Plotly.newPlot("myPlot", data, layout);

const exportTableToExcel = function (tableID) {
  var downloadLink;
  var dataType = "application/vnd.ms-excel";
  var tableSelect = document.getElementById(tableID);
  var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

  // Specify file name
  try {
    filename =
      SessionInfo.city +
     SessionInfo.createdAt +
      ".xls";
  } catch (err) {
    console.log(err);
    filename = "excel_data.xls";
  }

  // filename = filename ? filename + ".xls" : "excel_data.xls";

  // Create download link element
  downloadLink = document.createElement("a");

  document.body.appendChild(downloadLink);

  if (navigator.msSaveOrOpenBlob) {
    var blob = new Blob(["\ufeff", tableHTML], {
      type: dataType,
    });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    // Create a link to the file
    downloadLink.href = "data:" + dataType + ", " + tableHTML;

    // Setting the file name
    downloadLink.download = filename;

    //triggering the function
    downloadLink.click();
  }
};
