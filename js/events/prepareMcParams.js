async function fetchData(id) {
  // const url = `http://localhost:3000/api/mc-table?id=${id}`;
  const url = `https://tracer-mc.up.railway.app/api/mc-table?id=${id}`;


  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); 
   

    return data;      
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


function initialize(){
    const params = new URLSearchParams(window.location.search);
    let eventId, group;
    if (params.has('eventId') && params.has('group')) {
      eventId = params.get('eventId');
      group = params.get('group');

      $("#eventIdWarning").hide();                 
      $("#overlay").hide();     



      fetchData(eventId).then(data => {
        window.sessionStorage.setItem('eventData', JSON.stringify(data.session));
        window.sessionStorage.setItem('group', group);
        window.sessionStorage.setItem('mc-problem', "W");
        window.localStorage.setItem('sessionID', eventId);
        $("#mc-city-name")[0].textContent += data.session.city;
        $("#mc-group-name")[0].textContent += group;
        $("#mc-date")[0].textContent += new Date(data.session.createdAt).toLocaleDateString();


        const script = document.createElement('script');
        script.src = './js/mc-table.js';
        script.defer = true; // Optional, ensures it's non-blocking
        document.body.appendChild(script);  
        setTimeout(function () {
            core.snapLoad = true;
            $("#SCT,#LAR,#Beam").trigger("click");
            core.snapLoad = false;
            $("#archive").val(group).change();
            $("#XMLFiles").val("01").change();
            //load event
            EVENT = new Event("Event", 0); //EVENT klasis globaluri obieqti, romelsac enicheba saxeli indeqsi
            new Promise((resolved, reject) => {
              //event-is daxatvis inicializacia
              EVENT.initExtras();
              setTimeout(() => resolved(), 500); //we need to use setTimeout()
            }).then(() => {
              $("#jet-btn").click(); //disable jets in default scene
              $("#cell-check").click(); // disable cells in default scene
            });
            //trigger filter click
            $("#trackFilter").trigger("click");
          }, 10);
      })
     
    }
    else{
      $("#eventIdWarning").css("display", "flex"); 
      $("#overlay").show();      
    }
  }



  async function loadXML(group, index) {
    const url = `https://tracer-mc.up.railway.app/masterclass-xml/${group}/?index=${index}`;
    // const url = `http://localhost:8081/masterclass-xml/${group}/?index=${index}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const xmlText = await response.text(); 

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "application/xml");
      const sessionNode = xmlDoc.querySelector("session");
    if (sessionNode) {
        window.sessionStorage.setItem('eventData', xmlText); // Store XML as a string if needed
        window.sessionStorage.setItem('group', group);
    }

      return xmlDoc;
    } catch (error) {
      console.error("Error fetching XML data:", error);
    }
  }


  async function addResultToDB(reqBody){
    const url = `https://tracer-mc.up.railway.app/api/mc-table`;
    // const url = `http://localhost:3000/api/mc-table`;
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      });
     
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }


      return data
    } catch (error) {
      console.error("Error adding result to DB:", error);
    }

  }


