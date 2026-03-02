//////////////////////////////////////////////////////////////////////////////////
///   Nuclear Engineering Center at Georgian Technical University
///   TRACER Framework
///////////////////////////////////////////////////////   Creation History
///   Name:     eventDisplay.js
///   Subsystems: EVD
///   Path: \tracer-tmp\subsystem\evd\r3.0\js\events\eventDisplay.js
///   Description: Eventebis shekmnistvis sachiro faili

/// Functions:
// saveUserLoadedEvent()
// getUserLoadedEvent()
// getUserLoadedXML()
// change_line_precision()
// createListOfArchives()
// createListOfXMLFiles()
// EVENT.createURL()
// EVENT.setEventParameters()
// EVENT.createEventParameterDivs()
// EVENT.showEventParameters()
// EVENT.readXMLFile()
// EVENT.readEventParametersByName()
// EVENT.readEventAttribute()
// EVENT.readTagText()
// EVENT.convertToNums()
// EVENT.removeClusterGeometry()
// EVENT.readCommonParams()
// EVENT.filterByParams()
// EVENT.getIntersectedObject()
// EVENT.addTracksToCheckboxes()
// EVENT.allTrackFilter()
// EVENT.allJetFilter()
// EVENT.trackFilterReset()
// EVENT.jetFilterReset()
// EVENT.init()
// EVENT.createClusterButtons()
// EVENT.createHitsButtons()
// EVENT.createAlgButtons()
// EVENT.createJetAlgButtons()
// EVENT.initExtras()
// Jet.jetCone()
// Jet.jetCenterCoord()
// Jet.garbageCollectorForJets()
// Jet.jetFilter()
// Track.setTrackColor()
// Track.track_incident_point()
// Track.trackDrawAlg1()
// Track.trackDrawAlg2()
// Track.drawTracks()
// Track.araySum()
// Track.filterByCharge()
// Track.changeTrackMesh()
// MET.drawMET()
// Tile.drawTileCal()
// Tile.findCellCenter()
// Tile.calcWidth()
// Tile.createGeo()
// Tile.cellGeoNCenter()
// Tile.findCellZCoord()
// Tile.getCellColor()
// Tile.showEnergyColors()
// Tile.loadSelectedCells()
// Tile.hideCells()
// Tile.tileFilter()
// Tile.resetTileFilter()
// Cluster.drawCluster()
// Hits.drawHits()
// Vertex.drawVertex()
// Vertex.create_vertexCenter()
// resetColors()
// getEventObject()
// changeEventObject()
// changeCursor()
// getCursorCoord()
// getTrackInfo()
// getJetInfo()
// getMETInfo()
// getClusterInfo()
// getVertexInfo()
// getHitsInfo()
// getCellInfo()
// vertex_tracks()
// select_multiple_tracks()
// addDeltaPTile()
// writeTrackInfoInList()
// removeTrackFromList()
// addAngleBetweenTracks()
// initJSON()

///   Author: <Nino Zurashvili>
///   Date: <მაისი 2021>
///////////////////////////////////////////////////////   Change History
///   Name: <პროგრამისტის სახელი>
///   Date:  <მოდიფიკაციის თარიღი>
///   Description: <მოდიფიკაციის აღწერა>
//////////////////////////////////////////////////////////////////////////////////

//first edit
///XML arqivi
let XMLArchive
//XML failis ID
let XMLFIleID
//XML-is URL-i
let XMLURL
//event-is globaluri obieqti
let EVENT
//core-is scenis agwera
let scene = core.scene // gadaarkvi saxeli
//obieqti, romelic moicavs event-is geometriebs
let eventGeoObject = new THREE.Object3D()
//event-is geometriebis obieqtze saxelis minicheba
eventGeoObject.name = 'EGO'
scene.add(eventGeoObject) //scenashi event-is geometriis jgufis chamateba
//MET-is geometriis obieqti
let misET = new THREE.Object3D()
//MET-ebis geometriebis globalur obieqtze saxelis minicheba
misET.name = 'MET'
scene.getObjectByName('EGO').add(misET) //MET-ebis geometriebis globaluri obieqtis scenashi chamateba
//cvladi, romelic amowmebs MET-ebis geometriis gaaqtiurebas
let METActivated = false
//jet-is globaluri obieqti
let jetGeoObject = new THREE.Object3D()
//jet-ebis geometriebis globalur obieqtze saxelis minicheba
jetGeoObject.name = 'JET'
scene.getObjectByName('EGO').add(jetGeoObject) //jet-ebis geometriebis globaluri obieqtis scenashi chamateba
let trackGeoObject = new THREE.Object3D()
//track-ebis geometriebis globalur obieqtze saxelis minicheba
trackGeoObject.name = 'TRACK'
scene.getObjectByName('EGO').add(trackGeoObject) //track-ebis geometriebis globaluri obieqtis scenashi chamateba
//track-ebis informaciis shemcveli globaluri obieqti
let TRACK
//vertex informaciis shemcveli globaluri obieqti
let vertexObject = new THREE.Object3D()
vertexObject.name = 'VERTEX'
// vertex obieqtis scenashi chagdeba
scene.getObjectByName('EGO').add(vertexObject) //vertex-ebis geometriebis globaluri obieqtis scenashi chamateba
//tile kalorimetris geometriebis globaluri obieqti
let tileCal = new THREE.Object3D()
//MET-ebis geometriebis globalur obieqtze saxelis minicheba
tileCal.name = 'TILE'
let colorScheme1 = [
  '#5d5a6f',
  '#437898',
  '#3f859f',
  '#3a858b',
  '#44774c',
  '#a0963f',
  '#ba9b40',
  '#b78641',
  '#b84645',
]
let colorScheme2 = [
  '#30336b',
  '#4652b0',
  '#4385bb',
  '#75b670',
  '#badc58',
  '#f8c44e',
  '#f4a13b',
  '#f07c3f',
  '#eb4d4b',
]
let colorScheme3 = [
  '#341f97',
  '#3d49aa',
  '#3f6fbd',
  '#3696d0',
  '#0abde3',
  '#feae4f',
  '#fb914d',
  '#f5744f',
  '#ee5253',
]
const globalTraclColor =0xffe342
const xmlPath = './resources/xml/'

scene.getObjectByName('EGO').add(tileCal) //tile kalorimetris cell-ebis geometriebis globaluri obieqtis scenashi chamateba
//tile kalorimetris cell-ebis informaciis shemcveli globaluri obieqti
let TILE
let LarObject
let SEGMENT
//cvladi, romelic amowmebs tile kalorimetris cell-ebis geometriis gaaqtiurebas
let TILEActivated = false
// cell-is edge-ebis shesabamisi cvladi
let tileEdges = new THREE.Object3D()
tileEdges.name = 'edges'
scene.getObjectByName('EGO').add(tileEdges)
let modules = new THREE.Object3D()
modules.name = 'TileCalModules'
scene.add(modules)
//tilecal cell-is feri archevis shemdeg
let TILE_SELECT_COLOR = 0x4269f5
let tileFilterOn = false
//canvas tag-is ageba html-idan
let canvas = document.getElementsByTagName('canvas')[0]
//canvas-is poziciis migeba
let canvasPosition = $(canvas).position()
//canvasshi geometriuli obieqtebis monishvnis funqciis gaaqtiureba
canvas.addEventListener('pointerdown', getCursorCoord)
//canvasshi geometriuli obieqtebis monishvnis funqciis gaaqtiureba
canvas.addEventListener('pointerup', getEventObject)
//geometriaze kursoris gadatarebisas funqciis amoqmedeba
canvas.addEventListener('mousemove', changeEventObject)
//kursoris cvlileba geometriaze mitanisas
canvas.addEventListener('mousemove', changeCursor)
//mausisi moshoreba
//kursoris poziciis obieqtis sheqmna
let mousePosition = new THREE.Vector2()
let hoveredObj
//obieqtebis gadamkveti sxivis obieqtis sheqmna
let rayCaster = new THREE.Raycaster()
rayCaster.params.Line.threshold = 0.01
//jet-is originali feri
let colorOfOriginalJet = 0xaa00c7
// archeuli jet-is feri
let colorOfSelectedJet = 0xe040fb

//kameris koordinatis global cvladi desctop-istvis
let checkCameraPositionDesctop
//kameris koordinatis global cvladi mobilurebistvis
let checkCameraPositionMobile
//tree-shi eventebis parametrebis gamotanistvis sachiro cvladebi
let notFirst = false
let currentEventDivId = $('#event-tree-1-li').attr('id')
let loadedEventsCounter = 0
let eventArchive = []
let LOCAL_FILE_ON_TREE = []
//var trackColours = [0x30336B, 0x4144A3, 0x4862B8, 0x4385BB, 0x47A99D, 0x8EC35E, 0xF8CF5C, 0xF7B944, 0xF4A13B, 0xF2893C, 0xEE6E42, 0xEB4D4B];
// electron-is feri
let electronColor = 0x34eb8c
// muon-is feri
let muonColor = 0x3483eb
let chosenJetAlg = 0
//eventebis algoritmit filtris masivi
let eventFilterBySGK = new Object()
//ctrl gilakis shesabamisi cvladi
let ctrlPressed = false
//lokaluri xml-is shesabamisi cvladi
let LOCAL_XML_FILE_UPLOAD = undefined
let userLoadedEvents = []

// clipPlanes aris masivi sadac aris chayrili THREE.Plane( vecotr, constant )
// clip_Planes
let clip_planes = []
let clipGeometry = new THREE.PlaneGeometry(7, 10, 10)
for (let i = 0; i < clipGeometry.attributes.position.array.length; i += 3) {
  let plane = new THREE.Plane(
    new THREE.Vector3(
      clipGeometry.attributes.position.array[i],
      clipGeometry.attributes.position.array[i + 1],
      clipGeometry.attributes.position.array[i + 2],
    ),
    0,
  )
  clip_planes.push(plane)
}
//event infos shecvlistvis sachiro klasi
class UploadedEventObj {
  constructor(xmlContent, name, date, time, fulltime, lumiBlock, runNumber) {
    this.content = xmlContent
    this.name = name
    this.date = date
    this.time = time
    this.fulltime = fulltime
    this.lumiBlock = lumiBlock
    this.runNumber = runNumber
  }
}
var saveUserLoadedEvent = function (
  xmlContent,
  name,
  date,
  time,
  fulltime,
  lumiBlock,
  runNumber,
) {
  userLoadedEvents.push(
    new UploadedEventObj(
      xmlContent,
      name,
      date,
      time,
      fulltime,
      lumiBlock,
      runNumber,
    ),
  )
}
var getUserLoadedEvent = function (id = -1) {
  if (id == -1) id = userLoadedEvents.length - 1
  else if (id < -1) {
    id = userLoadedEvents.length - id
  }

  var sel = userLoadedEvents[id]
  if (sel == undefined || sel == null) {
    return userLoadedEvents[userLoadedEvents.length - 1]
  }
  return userLoadedEvents[id]
}
// user-is mier atvirtuli xml-is migeba
var getUserLoadedXML = function (id = -1) {
  if (id == -1) id = userLoadedEvents.length - 1
  else if (id < -1) {
    id = userLoadedEvents.length - id
  }

  var xml = getUserLoadedEvent(id)
  if (xml == undefined || xml == null) {
    return getUserLoadedEvent(userLoadedEvents.length - 1)
  }
  return xml.content //parser.parseFromString(xml.content,"text/xml");
}
// lokaluri xml-is atvirtva
$('#uploadXML').click(function () {
  var ccc = 0
  // $("#uploadXML").click();
  $('#uploadXML').change(function () {
    var file = this.files[0]

    var reader = new FileReader()

    reader.onloadend = function (evt) {
      if (evt.target.readyState == FileReader.DONE) {
        ccc++
        if (ccc > 1) return
        try {
          //console.log( evt.target.result );
        } catch (err) {
          console.log(err)
        }
        var parser = new DOMParser()
        LOCAL_XML_FILE_UPLOAD = parser.parseFromString(
          evt.target.result,
          'text/xml',
        )
        // event info-s shevseba
        var lumiBlock = LOCAL_XML_FILE_UPLOAD.getElementsByTagName(
          'Event',
        )[0].getAttribute('lumiBlock')
        var date = LOCAL_XML_FILE_UPLOAD.getElementsByTagName('Event')[0]
          .getAttribute('dateTime')
          .split(' ')[0]
        var time = LOCAL_XML_FILE_UPLOAD.getElementsByTagName('Event')[0]
          .getAttribute('dateTime')
          .split(' ')[1]
        var fulltime = LOCAL_XML_FILE_UPLOAD.getElementsByTagName(
          'Event',
        )[0].getAttribute('dateTime')
        var runNumber = LOCAL_XML_FILE_UPLOAD.getElementsByTagName(
          'Event',
        )[0].getAttribute('runNumber')
        saveUserLoadedEvent(
          LOCAL_XML_FILE_UPLOAD,
          file.name,
          date,
          time,
          fulltime,
          lumiBlock,
          runNumber,
        )
        //eventebis xeshi lokaluri event-is damateba
        LOCAL_FILE_ON_TREE.push(getUserLoadedEvent())
      }
      // event klasis obieqtis agwera
      EVENT = new Event('Event', 0)
      // event-is obieqtebis agwera
      EVENT.initExtras(undefined, undefined, undefined, LOCAL_XML_FILE_UPLOAD)
    }
    reader.readAsBinaryString(file.slice(0, file.size))
  })
})

// raycasteris line-ebze moqmedebis radiusis shemcireba
let change_line_precision = function (obj) {
  obj.params.Line.threshold =
    core.camera.position.distanceTo(new THREE.Vector3(0, 0, 0)) / 150
}

//XML-ebis failebis chamonatvalis index.html-shi arsebul tag-shi chamateba
let createListOfXMLFiles = function () {
  //cvladi romelic sheicavs index.html-shi chasamatebel html-is teqtur variants
  var ListOfXMLfiles = ''
  //cikli romelshic iqmneba XML-ebis failebis chamonatvalis shesabamisi html teqsti
  for (i = 0; i < 50; i++) {
    var tr = ''
    if (i < 9) tr = '0'
    ListOfXMLfiles +=
      '<option value="' +
      tr +
      (i + 1) +
      '" class = "XMLFiles">Event #' +
      tr +
      (i + 1) +
      '</option>'
  }
  //XML-ebis failebis chamonatvalis index.html-shi arsebul tag-shi chamateba
  $('#XMLFiles').html(ListOfXMLfiles)
}
//add archive and XML list in HTML
$('document').ready(function () {
  createListOfXMLFiles()
})
//gilakze dacheraze archeuli XML-is shesabamisi event-is vizualizacia
$('#load-event-btn').click(function () {
  if (TILE) TILE.hideCells() //calorimetris cell-ebis gaqroba sxva eventis chatvirtvisas
  //	$('.cell-scheme').css({'display': 'none'}); //energiebis skalis fanjris gaqroba\
  LOCAL_XML_FILE_UPLOAD = undefined
  EVENT = new Event('Event', 0) //EVENT klasis globaluri obieqti, romelsac enicheba saxeli indeqsi
  EVENT.initExtras()
})

//event-is obieqtis mshobeli klasi, romelic moicavs yvela zogad funqcias
class Event {
  //EVENT klasis konstruqtori
  constructor(tagName, index) {
    //EVENT klasis  obieqtze saxelis minicheba, romelic sinamdvileshi aris XML-is tag-is saxels
    this.tagName = tagName
    //EVENT klasis obieqtze indeqsis minicheba, romelic sinamdvileshi aris tag-is shesabamisi indeqsi XML-dan
    this.index = index
  }
  //archeuli XML-is URL-is shedgena
  createURL(i, archiveName, fileID) {
    //archeuli XML folderisa da failis ID-s migeba chamonatvalidan
    XMLArchive = $('#mc-group-name')[0].textContent.replace('Group : ', '')
    XMLFIleID = $('#XMLFiles option:selected').attr('value') || "A"
    XMLURL = '' //XML-is URL-is shemcveli XMLURL globaluri cvladi ganuleba, wakitxvis shemdeg
    switch (i) {
      case 0:
        var ID = parseInt(XMLFIleID) - 1 //wina event-is ID
        if (ID <= 0) ID = 50 //XML-is ID shemowmeba, radgan is ar unda iyos 0-is toli and 0-ze naklebi
        if (ID <= 9) {
          //tu ID 9ze naklebia mashi sachiroa XML-is URL-shi failis saxels miematos kidev erti 0
          $('#XMLFiles').val('0' + ID)
          this.XMLURL = xmlPath + XMLArchive + '/event00' + ID + '.xml' //XML-is URL-is sheqmna
        } else {
          $('#XMLFiles').val(ID)
          this.XMLURL = xmlPath + XMLArchive + '/event0' + ID + '.xml' //XML-is URL-is sheqmna
        }
        break
      case 1:
        var ID = parseInt(XMLFIleID) + 1 //shemdgomi event-is ID
        if (ID > 50) ID = 1 //XML-is ID shemowmeba, radgan is ar unda iyos 50-ze meti
        if (ID <= 9) {
          //tu ID 9ze naklebia mashi sachiroa XML-is URL-shi failis saxels miematos kidev erti 0
          $('#XMLFiles').val('0' + ID)
          this.XMLURL = xmlPath + XMLArchive + '/event00' + ID + '.xml' //XML-is URL-is sheqmna
        } else {
          $('#XMLFiles').val(ID)
          this.XMLURL = xmlPath + XMLArchive + '/event0' + ID + '.xml' //XML-is URL-is sheqmna
        }
        break
      case 2:
        $('#archive').val(archiveName)
        $('#XMLFiles').val(fileID)
        this.XMLURL = xmlPath + archiveName + '/event0' + fileID + '.xml' //XML-is URL-is sheqmna
        break
      default:
        this.XMLURL = xmlPath + XMLArchive + '/event0' + XMLFIleID + '.xml' //XML-is URL-is sheqmna
    }
  }
  //XML-sa da event tag-is atributebis wakitxvachawera
  async setEventParameters() {
 
    await this.readXMLFile() //XML failis wakitxva

    this.eventTag = this.readEventParametersByName(
      this.XML,
      this.tagName,
      this.index,
    ) //event tag-is sruli informaciis wakitxva-chawera
    //event tag-idan atributebis amokitxva shesabamisi saxelebit
    this.runNumber = this.readEventAttribute(this.eventTag, 'runNumber')
    this.eventNumber = this.readEventAttribute(this.eventTag, 'eventNumber')
    this.lumiBlock = this.readEventAttribute(this.eventTag, 'lumiBlock')
    this.dateTime = this.readEventAttribute(this.eventTag, 'dateTime')
    this.eventProperty = this.readEventAttribute(this.eventTag, 'eventProperty')
    this.date = this.dateTime.split(' ')[0]
    this.time = this.dateTime.split(' ')[1]
  }
  //xeshi event-elementis clone-s aketebs, id-ebs cvlis klasebs shlis da anichebs shesabamiss (Udzo)
  createEventParameterDivs() {
    var XMLGrp = window.sessionStorage.getItem('group')
    var XMLId = $('#XMLFiles option:selected').attr('value')
    var XMLGrpId = XMLGrp + XMLId

    if (eventArchive.indexOf(XMLGrp + XMLId) === -1) {
      //event-is saxelis chawera event-ebis menu-shi
      $('.selected-event-title').text('GROUP ' + XMLGrp + ' ' + XMLId + '/50')
      eventArchive.push(XMLGrp + XMLId)
      /*tu es ar aris pirveli chatvirtuli iventi, mashin gaaketos event-ebis xis default shtoebis kloni, mianichos xml-is id da daamatos xeshi es klonirebuli shto*/
      if (notFirst) {
        var clone = $('#event-tree-1-li-default').clone(true)
        clone.attr('id', XMLGrpId)
        currentEventDivId = clone.attr('id')
        clone.insertAfter('.event-tree-1-li:last')
        clone.addClass('tree-events-target')
      }
      /*axali event-is chatvirtvisas xeshi dzvel event-s artmevs aqtiur klass da xuravs shtos*/
      $('.activeEventParamDiv').removeClass('activeEventParamDiv')
      $('.tree-events-target .plus-minus-circle')
        .find('svg')
        .replaceWith(feather.icons['plus-circle'].toSvg())
      /*xeze axali chatvirtuli eventis shtos xsnis, uwers event-is saxels da anichebs aqtiur klass */
      $('.tree-events-target:last .plus-minus-circle')
        .find('svg')
        .replaceWith(feather.icons['minus-circle'].toSvg())
      $('.tree-events-target:last')
        .find('.Eevent')
        .addClass('activeEventParamDiv')
      $('.tree-events-target:last')
        .find('.Eevent')
        .html('Event ' + XMLGrp + ' ' + XMLId + '/50')
      $('.tree-events-target:last').find('.Eevent').attr('id', XMLId)
      $('.tree-events-target:last').find('.Eevent').attr('name', XMLGrp)
      $('.tree-events-target:last').find('.Eevent').attr('title', XMLGrpId)
      notFirst = true
      loadedEventsCounter++
      $('.loaded-events').text('Loaded Events(' + loadedEventsCounter + ')')
      return
    } else {
      if (LOCAL_XML_FILE_UPLOAD) {
        if (LOCAL_XML_FILE_UPLOAD.inTree) return
        if (notFirst) {
          var clone = $('#event-tree-1-li-default').clone(true)
          clone.attr('id', 'loc' + String(LOCAL_FILE_ON_TREE.length - 1))
          currentEventDivId = clone.attr('id')
          clone.insertAfter('.event-tree-1-li:last')
          clone.addClass('tree-events-target')
        }
        //event-is saxelis chawera event-ebis menu-shi
        $('.selected-event-title').text(
          LOCAL_FILE_ON_TREE[LOCAL_FILE_ON_TREE.length - 1].name.substring(
            0,
            LOCAL_FILE_ON_TREE[LOCAL_FILE_ON_TREE.length - 1].name.length - 4,
          ),
        )

        $('.activeEventParamDiv').removeClass('activeEventParamDiv')
        $('.tree-events-target .plus-minus-circle')
          .find('svg')
          .replaceWith(feather.icons['plus-circle'].toSvg())
        $('.tree-events-target:last .plus-minus-circle')
          .find('svg')
          .replaceWith(feather.icons['minus-circle'].toSvg())
        $('.tree-events-target:last')
          .find('.Eevent')
          .addClass('activeEventParamDiv')
        $('.tree-events-target:last')
          .find('.Eevent')
          .html(LOCAL_FILE_ON_TREE[LOCAL_FILE_ON_TREE.length - 1].name)
        $('.tree-events-target:last')
          .find('.Eevent')
          .attr(
            'name',
            LOCAL_FILE_ON_TREE.length -
              1 +
              LOCAL_FILE_ON_TREE[LOCAL_FILE_ON_TREE.length - 1].name,
          )
        notFirst = true
        loadedEventsCounter++
        $('.loaded-events').text('Loaded Events(' + loadedEventsCounter + ')')
        LOCAL_XML_FILE_UPLOAD.inTree = true
        return
      } else {
        //event-is saxelis chawera event-ebis menu-shi
        $('.selected-event-title').text('GROUP ' + XMLGrp + ' ' + XMLId + '/50')
        $('.tree-events-target')
          .find('.Eevent')
          .removeClass('activeEventParamDiv')
        $('.Eevent[title=' + XMLGrpId + ']').addClass('activeEventParamDiv')
        return
      }
    }
  }
  //xeshi event-ebis parametrebis chawera (Udzo)
  showEventParameters() {
    $('#' + currentEventDivId)
      .find('.eventNumber')
      .html('Num: ' + this.eventNumber)
    $('#' + currentEventDivId)
      .find('.lumiBlock')
      .html('LumiB: ' + this.lumiBlock)
    $('#' + currentEventDivId)
      .find('.runNumber')
      .html('RunN: ' + this.runNumber)
    $('#' + currentEventDivId)
      .find('.Edate')
      .html('Date: ' + this.date)
    $('#' + currentEventDivId)
      .find('.Etime')
      .html('Time: ' + this.time)
  }
  //XML failis wakitxva URL-dan
  async readXMLFile() {
    const XMLGroup = window.sessionStorage.getItem('group')
    if (LOCAL_XML_FILE_UPLOAD) return
    try {
      this.XML = await loadXML(XMLGroup, $('#XMLFiles option:selected').attr('value'));
    } catch (error) {
      console.error("Error loading XML:", error);
    }
  }
  //tag-is shigtavsis amokitxva XML-dan
  readEventParametersByName(XML, tagName, index) {
    if (XML.getElementsByTagName(tagName)[index] != undefined)
      return XML.getElementsByTagName(tagName)[index]
    //XML-shi arsebuli, shesabamisi indeqsis mqone, tag-is shigtavsis dabruneba
    else return undefined //statusis dabruneba im shemtxvevashi tu msgavsi tag-i XML-shi ar arsebobs
  }
  //tag-is atributebis wakitxva
  readEventAttribute(tag, attrName) {
    return tag.getAttribute(attrName) //tag-shi arsebuli, atributis shigtavsis dabruneba
  }
  //tag-ebidan migebuli teqstis dayofa, masivshi chawera da am masivis dabuneba
  readTagText(parentTag, childTagName, index) {
    try {
      //droebiti cvladi, romelic sheicavs tag-shi arsebul teqstur informacias
      var content = parentTag
        .getElementsByTagName(childTagName)
        [index].childNodes[0].textContent.slice(
          1,
          parentTag.getElementsByTagName(childTagName)[index].childNodes[0]
            .textContent.length - 2,
        )
        .split(/\s+/)
      //masivi, tomelic moicavs dashorebebad dayofil teqsts

      return content
    } catch (err) {
      //alert(childTagName, ' tag wasn\'t found in loaded XML!');
      return undefined
    }
  }
  //tag-is teqstis ricxvebshi gadaxvana
  convertToNums(array) {
    if (array != undefined) {
      //droebiti masivi
      var tempArray = new Array()
      //romelsac funqciis mier migebuli masivi gadayavs ricxvebshi
      for (var i = 0; i < array.length; i++) {
        tempArray.push(parseFloat(array[i])) //droebit masivis wevrebze migebuli masivis wevris ricxobrivi mnishvnelobis minicheba
      }
      return tempArray //droebiti masivis mnishvnelobis dabruneba
    }
  }
  //track-ebisa da jet-ebis saerto parametrebis amokitxva XML-dan
  readCommonParams(XML, tagName, index) {
    this.tag = this.readEventParametersByName(XML, tagName, index) //tag-is wakitxva mititebuli XML-sa da saxelis mixedvit da classis cvladze minicheba
    this.numberOfEventParams = parseInt(
      this.readEventAttribute(this.tag, 'count'),
    ) //track-ebis, jet-ebisa da msgavsi event-is nawilebis raodenoba agebuli XML-idan
    this.SGK = this.readEventAttribute(this.tag, 'storeGateKey') //XML-shi arsebuli jet-ebis track-ebisa da sxva event-is paremetrebis shedgenisas gamoyenebuli algoritmis saxeli
  }
  //filtraciis funqcia, romelic igebs parametrebs filtridan track-is anda jet-is parametrebs da geometriebis jgufis dasaxelebas
  filterByParams(filterParam, param, numberOfParameters, name) {
    if (!isNaN(filterParam)) {
      //filtridan migebuli parametris sehmowmeba tu is carielia mashin araferi ketdeba
      for (var i = 0; i < numberOfParameters; i++) {
        //filtridan migebuli pirobis shemowmeba mocemuli event-is yvela wevristvis
        if (
          param[i] < filterParam &&
          scene
            .getObjectByName('EGO')
            .getObjectByName(name)
            .getObjectByName(i) != null
        )
          scene
            .getObjectByName('EGO')
            .getObjectByName(name)
            .getObjectByName(i).visible = false //geometriis oibieqtis scenidan gaqroba;
      }
    }
  }
  //raycasterit gadakvetili obieqtis migeba
  getIntersectedObject(e) {
    e.preventDefault();
  
    // Get canvas position and size
    var canvasPosition = canvas.getBoundingClientRect();
  
    // Normalize mouse coordinates to canvas space
    mousePosition.x = ((e.clientX - canvasPosition.left) / canvasPosition.width) * 2 - 1;
    mousePosition.y = -((e.clientY - canvasPosition.top) / canvasPosition.height) * 2 + 1;
  
    // Update raycaster with camera and mouse position
    rayCaster.setFromCamera(mousePosition, core.camera);
  
    // Call change_line_precision if necessary
    change_line_precision(rayCaster);
  
    var intersectsArray = [];
  
    // Loop through scene objects
    for (var i = 0; i < scene.getObjectByName('EGO').children.length; i++) {
      switch (scene.getObjectByName('EGO').children[i].name) {
        case 'JET':
        case 'TRACK':
          for (var j = 0; j < scene.getObjectByName('EGO').children[i].children.length; j++) {
            for (var k = 0; k < scene.getObjectByName('EGO').children[i].children[j].children.length; k++) {
              if (
                scene.getObjectByName('EGO').children[i].visible &&
                scene.getObjectByName('EGO').children[i].children[j].visible &&
                scene.getObjectByName('EGO').children[i].children[j].children[k].visible
              ) {
                intersectsArray.push(scene.getObjectByName('EGO').children[i].children[j].children[k]);
              }
            }
          }
          break;
        case 'TILE':
        case 'LAR':
        case 'MET':
        case 'VERTEX':
          scene.getObjectByName('EGO').children[i].children.forEach(function (obj) {
            if (obj.name !== 'vCenter' && obj.visible) {
              intersectsArray.push(obj);
            }
          });
          break;
      }
    }
  
    // Check intersections
    var intersects1 = rayCaster.intersectObjects(intersectsArray, true);
  
    // If intersections are found, return the first intersected object
    if (intersects1.length > 0) {
      return intersects1[0]; // Return the first intersected object
    }
  
    // No intersection found
    return null;
  }
  //track-ebis inicializeba da checkbox-ebze damateba
  addTracksToCheckboxes(objName) {
    // wina event-is trackebis scenidan washla
    while (
      scene.getObjectByName('EGO').getObjectByName(objName.toUpperCase())
        .children.length
    ) {
      scene
        .getObjectByName('EGO')
        .getObjectByName(objName.toUpperCase())
        .remove(
          scene.getObjectByName('EGO').getObjectByName(objName.toUpperCase())
            .children[0],
        )
    }
    if (eventFilterBySGK.TRACK == undefined) eventFilterBySGK.TRACK = {}
    if (eventFilterBySGK.TRACK[EVENT.XMLURL] == undefined) {
      eventFilterBySGK.TRACK[EVENT.XMLURL] = new Array(
        EVENT.XML.getElementsByTagName(objName).length,
      ).fill(false)
      eventFilterBySGK.TRACK[EVENT.XMLURL][0] = true // tavidan xmolod pirveli algoritmis track-ebis gamochena
    }
    for (var i = 0; i < EVENT.XML.getElementsByTagName(objName).length; i++) {
      if (
        EVENT.XML.getElementsByTagName(objName)[i].getElementsByTagName(
          'numPolyline',
        )[0] == undefined
      )
        continue
      let TRACK = new Track(EVENT.XML, objName, i)
      TRACK.name = i
      TRACK.visibility = Boolean(eventFilterBySGK.TRACK[EVENT.XMLURL][i]) // trackebis algoritmit filtris mixedvit gamochena/gaqroba
      TRACK.drawTracks()
    }
  }
  // track-ebis gafiltvra parametrebis mixedvit
  allTrackFilter() {
    for (
      var i = 0;
      i < scene.getObjectByName('EGO').getObjectByName('TRACK').children.length;
      i++
    ) {
      //filtridan migebuli pirobis shemowmeba mocemuli event-is yvela wevristvis
      for (
        var j = 0;
        j <
        scene.getObjectByName('EGO').getObjectByName('TRACK').children[i]
          .children.length;
        j++
      ) {
        var obj = scene.getObjectByName('EGO').getObjectByName('TRACK')
          .children[i]
        if (
          !isNaN(obj.TRACK.phi[j]) &&
          !isNaN(parseFloat($('#trackPhiFilter').val())) &&
          obj.TRACK.phi[j] < parseFloat($('#trackPhiFilter').val())
        )
          obj.children[j].visible = false //geometriis oibieqtis scenidan gaqroba;
        if (
          !isNaN(obj.TRACK.eta[j]) &&
          !isNaN(parseFloat($('#trackEtaFilter').val())) &&
          obj.TRACK.eta[j] < parseFloat($('#trackEtaFilter').val())
        )
          obj.children[j].visible = false //geometriis oibieqtis scenidan gaqroba;
        if (
          !isNaN(obj.TRACK.theta[j]) &&
          !isNaN(parseFloat($('#trackThetaFilter').val())) &&
          obj.TRACK.theta[j] < parseFloat($('#trackThetaFilter').val())
        )
          obj.children[j].visible = false //geometriis oibieqtis scenidan gaqroba;
        if (
          !isNaN(obj.TRACK.pt[j]) &&
          !isNaN(parseFloat($('#trackPTFilter').val())) &&
          Math.abs(obj.TRACK.pt[j]) <
            Math.abs(parseFloat($('#trackPTFilter').val()))
        )
          obj.children[j].visible = false //geometriis oibieqtis scenidan gaqroba;
      }
    }
  }
  //jet-ebis gafiltvra parametrebis mixedvit
  // allJetFilter() {
  //   for (
  //     var i = 0;
  //     i < scene.getObjectByName("EGO").getObjectByName("JET").children.length;
  //     i++
  //   ) {
  //     //filtridan migebuli pirobis shemowmeba mocemuli event-is yvela wevristvis
  //     for (
  //       var j = 0;
  //       j <
  //       scene.getObjectByName("EGO").getObjectByName("JET").children[i].children
  //         .length;
  //       j++
  //     ) {
  //       var obj = scene.getObjectByName("EGO").getObjectByName("JET").children[
  //         i
  //       ];
  //       if (
  //         !isNaN(obj.JET.phi[j]) &&
  //         !isNaN(parseFloat($("#jetPhiFilter").val())) &&
  //         obj.JET.phi[j] < parseFloat($("#jetPhiFilter").val())
  //       )
  //         obj.children[j].visible = false; //geometriis oibieqtis scenidan gaqroba;
  //       if (
  //         !isNaN(obj.JET.eta[j]) &&
  //         !isNaN(parseFloat($("#jetEtaFilter").val())) &&
  //         obj.JET.eta[j] < parseFloat($("#jetEtaFilter").val())
  //       )
  //         obj.children[j].visible = false; //geometriis oibieqtis scenidan gaqroba;
  //       if (
  //         !isNaN(obj.JET.theta[j]) &&
  //         !isNaN(parseFloat($("#jetThetaFilter").val())) &&
  //         obj.JET.theta[j] < parseFloat($("#jetThetaFilter").val())
  //       )
  //         obj.children[j].visible = false; //geometriis oibieqtis scenidan gaqroba;
  //       if (
  //         !isNaN(obj.JET.et[j]) &&
  //         !isNaN(parseFloat($("#jetETFilter").val())) &&
  //         obj.JET.et[j] < parseFloat($("#jetETFilter").val())
  //       )
  //         obj.children[j].visible = false; //geometriis oibieqtis scenidan gaqroba;
  //     }
  //   }
  // }
  // track-ebis filtris moshoreba, yvela track-is gamochena
  trackFilterReset() {
    for (
      var i = 0;
      i < scene.getObjectByName('EGO').getObjectByName('TRACK').children.length;
      i++
    ) {
      for (
        var j = 0;
        j <
        scene.getObjectByName('EGO').getObjectByName('TRACK').children[i]
          .children.length;
        j++
      ) {
        scene.getObjectByName('EGO').getObjectByName('TRACK').children[
          i
        ].children[j].visible = true
      }
    }
    // tu electron-is checkbox iyo archeuli, es filtri darcheba
    if ($('#electron-check')[0].checked) {
      $('#electron-check')[0].checked = false
      $('#electron-check').click()
    }
    // tu muon-is checkbox iyo archeuli, es filtri darcheba
    if ($('#muon-check')[0].checked) {
      $('#muon-check')[0].checked = false
      $('#muon-check').click()
    }
  }
  // jet-ebis filtris moshoreba
  // jetFilterReset() {
  //   for (
  //     var i = 0;
  //     i < scene.getObjectByName("EGO").getObjectByName("JET").children.length;
  //     i++
  //   ) {
  //     for (
  //       var j = 0;
  //       j <
  //       scene.getObjectByName("EGO").getObjectByName("JET").children[i].children
  //         .length;
  //       j++
  //     ) {
  //       scene.getObjectByName("EGO").getObjectByName("JET").children[
  //         i
  //       ].children[j].visible = true;
  //     }
  //   }
  // }
  //event-ebis gaaqtiurebis inicializacia
  init(evtParam) {
    //	EVENT.createEventParameterDivs();
    resetColors()
    switch (evtParam) {
      case 'Jet':
        // wina event-is jetebis washla
        while (
          scene.getObjectByName('EGO').getObjectByName('JET').children.length
        ) {
          scene
            .getObjectByName('EGO')
            .getObjectByName('JET')
            .remove(
              scene.getObjectByName('EGO').getObjectByName('JET').children[0],
            )
        }
        if (eventFilterBySGK.JET == undefined) eventFilterBySGK.JET = {}
        if (eventFilterBySGK.JET[EVENT.XMLURL] == undefined) {
          eventFilterBySGK.JET[EVENT.XMLURL] = new Array(
            EVENT.XML.getElementsByTagName('Jet').length,
          ).fill(false)
          eventFilterBySGK.JET[EVENT.XMLURL][0] = true
        }
        for (var i = 0; i < EVENT.XML.getElementsByTagName('Jet').length; i++) {
          var JET = new Jet(EVENT.XML, 'Jet', i)
          JET.name = i
          JET.visibility = Boolean(eventFilterBySGK.JET[EVENT.XMLURL][i])
          JET.jetCone() // jet obieqtis daxatva
        }
        // EVENT.allJetFilter(); //jet-ebis gafiltvra parametrebit
        // $("#jet-btn").prop("checked", true);
        break
      case 'Track':
        scene.getObjectByName('TRACK').visible = true
        EVENT.addTracksToCheckboxes('Track') //track-ebis sheqmna
        EVENT.allTrackFilter() //track-ebis gafiltrvra
        $('#track-btn').prop('checked', true)
        $('#trackAlgos')[0].disabled = false
        break
      case 'ETMis':
        try {
          scene
            .getObjectByName('MET')
            .remove(scene.getObjectByName('MET').children[0])
          $('#met-btn').prop('checked', false)
        } catch {}
        let MET = new missingET(EVENT.XML) //MET-is obieqtis sheqmna tu is arsebobs
        $('#met-btn').prop('checked', true)
        METActivated = true
        MET.drawMET() //MET-is geometriis scenashi chamateba tu MET arsebobs
        break
      case 'TILE':
        if (TILEActivated) TILE.hideCells() //LA this removes cells
        TILE = new Tile(EVENT.XML, evtParam, 0) //cell-is obieqtis sheqmna
        TILE.showEnergyColors() //cell-ebis geometriebis sheqmnis funqciis gamoyeneba
        TILEActivated = true
        // $("#cell-check").prop("checked", true);
        TILE.drawTileCal()
        break
      case 'Vertex':
        //wina eventis vertex obieqtis washla scenidan
        if (scene.getObjectByName('VERTEX').children[0]) {
          for (
            var i = scene.getObjectByName('VERTEX').children.length - 1;
            i >= 0;
            i--
          )
            scene
              .getObjectByName('VERTEX')
              .remove(scene.getObjectByName('VERTEX').children[i])
        }
        $('#vertex-check').prop('checked', true)
        let rvx = new Vertex(EVENT.XML)
        scene.getObjectByName('VERTEX').VERTEX = rvx
        for (var i = 0; i < rvx.count; i++) {
          if (rvx.primVxCand[i] == 1) rvx.drawVertex(i)
        }
        break
      case 'LAR':
        LarObject = new LAr(EVENT.XML)
        break
      case 'Segment':
        SEGMENT = new Segment(EVENT.XML)
        break
      default:
        //cluster-ebis washla scenidan axali event-is chatvirtvisas
        this.init('Jet')
        this.init('Track')
        this.init('ETMis')
        this.init('TILE')
        this.init('Vertex')
        this.init('LAR')
        this.init('Segment')
    }
  }
  // track-ebis shesabamisi checkbox-ebis sheqmna
  createAlgButtons() {
    var buttons = ''
    for (
      var i = this.XML.getElementsByTagName('Track').length - 1;
      i >= 0;
      i--
    ) {
      if (
        this.XML.getElementsByTagName('Track')[i].getElementsByTagName(
          'polylineX',
        )[0] !== undefined
      )
        buttons +=
          '<div class="form-check"><input class="form-check-input trackAlg" type="checkbox" id="' +
          this.XML.getElementsByTagName('Track')[i].getAttribute(
            'storeGateKey',
          ) +
          '" index="' +
          i +
          '" name="track-alg-buttons"><label class="form-check-label" for="' +
          this.XML.getElementsByTagName('Track')[i].getAttribute(
            'storeGateKey',
          ) +
          '">' +
          this.XML.getElementsByTagName('Track')[i].getAttribute(
            'storeGateKey',
          ) +
          '</label></div>' //buttonis indeqsshi damateba
    }
    $('#trackAlgos').html(buttons)
    $('#Tracks').attr('checked', 'checked')
  }
  // jet-ebis shesabamisi checkbox-ebis sheqmna
  createJetAlgButtons() {
    var buttons = ''
    for (var i = this.XML.getElementsByTagName('Jet').length - 1; i >= 0; i--) {
      if (
        this.XML.getElementsByTagName('Jet')[i].getElementsByTagName(
          'px',
        )[0] !== undefined
      )
        buttons +=
          '<div class="form-check"><input class="form-check-input jetAlg" type="checkbox" id="' +
          this.XML.getElementsByTagName('Jet')[i].getAttribute('storeGateKey') +
          '" index="' +
          i +
          '" name="jet-alg-buttons"><label class="form-check-label" for="' +
          this.XML.getElementsByTagName('Jet')[i].getAttribute('storeGateKey') +
          '">' +
          this.XML.getElementsByTagName('Jet')[i].getAttribute('storeGateKey') +
          '</label></div>'
    }

    $('#jetAlgos').html(buttons)
    $('#AntiKt4TopoEMJets').attr('checked', 'checked')
    $('#AntiKt6GhostTowerJets_AOD').attr('checked', 'checked')
  }
  //nikas da levanis funqciebis inicializacia
  async initExtras(index, eventName, eventID, XML, localXMLClick) {
    core.renderer.localClippingEnabled = true // rodesac geometriebis chra clip-slidershia da shemdeg icvleba chra core.renderer.locaClipping xdeba false rac nishnavs imas rom animaciis dros trekebi agar daixateba shesabamisad unda gavuwerot tavidan true rom daixatos sworad.
    particleAnimation.stop()
    drawEvent(true) // darestartdes eventis clipping planebi
    particleAnimation.loadParticles() // amatebs scenashi particle-animaciistvis gankutvnil particlebs da particle "BURST" -stvis gankutvnili nawilakebs
    particleAnimation.launch() // iwyebs animacias
    if (XML) EVENT.XML = XML
    else EVENT.createURL(index, eventName, eventID) //XML-is URL-is sheqmna
    await EVENT.setEventParameters() //XML-is shesabamisi URL-idan amokitxva, EVENT obieqtis setEventParameters funqciis gamoyenebit
    EVENT.createAlgButtons() //XML-shi arsebuli track-ebis algoritmebis gilakebis sheqmna
    // EVENT.createJetAlgButtons(); //XML-shi arsebuli jet-ebis algoritmebis gilakebis sheqmna
    EVENT.init(
      undefined,
      index,
      eventName,
      eventID,
      $('#' + chosenJetAlg).attr('index'),
    )
    if (!localXMLClick) {
      EVENT.createEventParameterDivs()
      //funqciis gamodzaxeba romelic event-ebis parametrebs wers xeshi
      EVENT.showEventParameters()
    }
    LOCAL_XML_FILE_UPLOAD = undefined
    hoveredObj = undefined
    // tu electron-is checkbox iyo archeuli, es filtri darcheba axali event-stvis
    if ($('#electron-check')[0].checked) {
      $('#electron-check')[0].checked = false
      $('#electron-check').click()
    }
    // tu muon-is checkbox iyo archeuli, es filtri darcheba axali event-stvis
    if ($('#muon-check')[0].checked) {
      $('#muon-check')[0].checked = false
      $('#muon-check').click()
    }
  }
}
//EVENT klasis shvilobi Jet klasi, romelic moicavs yvela jet-tan dakavshirebul funqcias
class Jet extends Event {
  //konstruqtori, romelic anichebs mnishvnelobas Jet klasis obieqtis cvladebs
  constructor(XML, tagName, index) {
    super(tagName, index) //mshobeli EVENT klasis konstruqtoris gamodzxeba saxelisa da indeqsis misanicheblad
    this.readCommonParams(XML, tagName, index)
    this.SGK = this.readEventAttribute(this.tag, 'storeGateKey') // Jet-is algoritmi
    if (this.SGK == 'AntiKt6GhostTowerJets_AOD')
      eventFilterBySGK.JET[EVENT.XMLURL][index] = true
    $('#' + this.SGK).prop('checked', eventFilterBySGK.JET[EVENT.XMLURL][index])
    //jet-is parametrebis jet tag-idan amokitxva mati saxelebis mixedvit
    this.X = this.convertToNums(this.readTagText(this.tag, 'px', 0))
    this.Y = this.convertToNums(this.readTagText(this.tag, 'py', 0))
    this.Z = this.convertToNums(this.readTagText(this.tag, 'pz', 0))
    //koordinatebi masshtabirebistvis iyofa 100-ze
    for (var i = 0; i < this.numberOfEventParams; i++) {
      this.X[i] /= 100
      this.Y[i] /= 100
      this.Z[i] /= 100
    }
    this.numPol = this.convertToNums(
      this.readTagText(this.tag, 'numPolyline', 0),
    )
    this.eta = this.convertToNums(this.readTagText(this.tag, 'eta', 0))
    this.theta = new Array()
    for (var i = 0; i < this.numberOfEventParams; i++) {
      this.theta.push(2 * Math.atan(Math.pow(Math.E, -this.eta[i]))) //theta-s gamotvla formulis gamoyenebit
    }
    this.phi = this.convertToNums(this.readTagText(this.tag, 'phi', 0))
    this.et = this.convertToNums(this.readTagText(this.tag, 'et', 0))
    this.SGK = this.readEventAttribute(this.tag, 'storeGateKey')
    this.h = new Array()
    this.radius = new Array()
    this.radialSegments = new Array()
    this.geo = new Array()
    this.mat = new Array()
    this.mesh = new Array()
  }
  //jet-is konusis sheqmna
  jetCone() {
    //if (jetActivated) this.removeGeometry("EGO", "JET", jetActivated);//jet-ebis washla scenidan tu isini scenashi ukve arseboben
    //titoeuli jet-is konusis sheqmna da scenashi chamateba
    var group = new THREE.Group()
    group.name = 'jet'
    for (var i = 0; i < this.numberOfEventParams; i++) {
      this.h[i] = Math.sqrt(
        Math.pow(this.X[i], 2) +
          Math.pow(this.Y[i], 2) +
          Math.pow(this.Z[i], 2),
      ) //jet-is konusis simagle
      //	this.h[i] = 0.1*this.et[i];
      this.radius[i] = this.h[i] * Math.tan(0.2) //jet-is konusis radiusi
      this.radialSegments[i] = 32 //konisis aproqsimacia
      this.geo[i] = new THREE.ConeBufferGeometry(
        this.radius[i],
        this.h[i],
        this.radialSegments[i],
      ) //jet-is konusis geometriis sheqmna
      this.geo[i].applyMatrix4(
        new THREE.Matrix4().makeTranslation(0, -(this.h[i] / 2), 0),
      ) //konusis wveros sakoordinato centrshi gadatana
      this.mat[i] = new THREE.MeshToonMaterial({
        color: colorOfOriginalJet,
        transparent: true,
        opacity: 0.7,
        clippingPlanes: clip_planes,
      }) //konusis materialis sheqmna: ferisa da gamchirvalobis minicheba
      this.mesh[i] = new THREE.Mesh(this.geo[i], this.mat[i]) //konusis geometriis mshis sheqmna

      //konusis geometriis shemobruneba kutxeebis mixedvit
      const quaternion = new THREE.Quaternion()
      var vector = new THREE.Vector3(
        Math.sin(this.theta[i]) * Math.cos(this.phi[i]),
        Math.sin(this.theta[i]) * Math.sin(this.phi[i]),
        Math.cos(this.theta[i]),
      )
      quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), vector)
      this.mesh[i].quaternion.copy(quaternion)
      this.mesh[i].name = i //jet-ebis mesh-ze saxelis minicheba
      group.add(this.mesh[i])
      //scene.getObjectByName('EGO').getObjectByName("JET").add(this.mesh[i]);//jet-ebis mesh-ebis scenashi chamateba
    }
    group.JET = this
    group.visible = this.visibility
    scene.getObjectByName('EGO').getObjectByName('JET').add(group)
  }
  //konusis shua wertilis modzebnis funqcia
  jetCenterCoord(i) {
    var coords = [] //konusis shua wertilis koordinatebis shemcveli masici
    coords.push(this.h[i] * Math.sin(this.theta[i]) * Math.cos(this.phi[i])) //konusis shua wertilis X koordinati
    coords.push(this.h[i] * Math.sin(this.theta[i]) * Math.sin(this.phi[i])) //konusis shua wertilis Y koordinati
    coords.push(this.h[i] * Math.cos(this.theta[i])) //konusis shua wertilis Z koordinati
    return coords
  }
  //klasis cvladebis washla tu es sachiro iqneba
  garbageCollectorForJets() {
    delete this.tag
    delete this.numberOfEventParams
    delete this.X
    delete this.Y
    delete this.Z
    delete this.eta
    delete this.et
    delete this.theta
    delete this.phi
    delete this.SGK
    delete this.h
    delete this.radius
    delete this.radialSegments
    delete this.geo
    delete this.mat
    delete this.mesh
  }
  //jet-ebis filtri
  // jetFilter() {
  //   JET.filterByParams(
  //     parseFloat($("#jetPhiFilter").val()),
  //     this.phi,
  //     this.numberOfEventParams,
  //     "JET"
  //   );
  //   JET.filterByParams(
  //     parseFloat($("#jetEtaFilter").val()),
  //     this.eta,
  //     this.numberOfEventParams,
  //     "JET"
  //   );
  //   JET.filterByParams(
  //     parseFloat($("#jetThetaFilter").val()),
  //     this.theta,
  //     this.numberOfEventParams,
  //     "JET"
  //   );
  //   JET.filterByParams(
  //     parseFloat($("#jetETFilter").val()),
  //     this.et,
  //     this.numberOfEventParams,
  //     "JET"
  //   );
  // }
}
//track-ebis informaciis shemcveli klasi
class Track extends Event {
  //track-is obieqtis parametrebi
  constructor(XML, tagName, index) {
    super(tagName, index) //track-is klasis obieqtis cvladze saxelisa da indeqsis mshobeli klasis konstruqtoris daxmarebit
    this.readCommonParams(XML, tagName, index)
    $('#' + this.SGK).prop(
      'checked',
      eventFilterBySGK.TRACK[EVENT.XMLURL][index],
    )
    //track-ebis parametrebis amogeba tag-idan koordinatebi masshtabirebis miznit iyofa 100-ze
    this.X = this.convertToNums(this.readTagText(this.tag, 'polylineX', 0))
    this.phi = this.convertToNums(this.readTagText(this.tag, 'phi0', 0))
    this.cotTheta = this.convertToNums(
      this.readTagText(this.tag, 'cotTheta', 0),
    )
    this.numPol = this.convertToNums(
      this.readTagText(this.tag, 'numPolyline', 0),
    )
    this.numberOfEventParams = this.readEventAttribute(this.tag, 'count')
    this.SGK = this.readEventAttribute(this.tag, 'storeGateKey') // track-is algoritmi
    this.pt = this.convertToNums(this.readTagText(this.tag, 'pt', 0))
    this.theta = []
    this.eta = []
    this.electron = this.readEventParametersByName(EVENT.XML, 'Electron', 0) //eleqtronebisa da muonebis damatebis shemdeg es unda sheicvalos
    this.muon = this.readEventParametersByName(EVENT.XML, 'Muon', 0) //eleqtronebisa da muonebis damatebis shemdeg es unda sheicvalos
    this.numTrackPoints = this.convertToNums(
      this.readTagText(this.tag, 'numPolyline', 0),
    )
    if (this.electron)
      this.electronTracks = this.convertToNums(
        this.readTagText(this.electron, 'trackIndex', 0),
      ) //eleqtronebisa da muonebis damatebis shemdeg es unda sheicvalos
    if (this.muon)
      this.muonTracks = this.convertToNums(
        this.readTagText(this.muon, 'trackIndex', 0),
      ) //eleqtronebisa da muonebis damatebis shemdeg es unda sheicvalos
    this.trackColor = []
    this.totalTrackPoints = this.arraySum(
      this.numTrackPoints,
      this.numTrackPoints.length,
    )
    if (this.X != undefined) {
      this.Y = this.convertToNums(this.readTagText(this.tag, 'polylineY', 0))
      this.Z = this.convertToNums(this.readTagText(this.tag, 'polylineZ', 0))
      for (var i = 0; i < this.totalTrackPoints; i++) {
        this.X[i] = Number((this.X[i] / 100).toFixed(7))
        this.Y[i] = Number((this.Y[i] / 100).toFixed(7))
        this.Z[i] = Number((this.Z[i] / 100).toFixed(7))
        //	this.eta.push(Math.asinh(this.cotTheta[i]));
        //	this.theta.push(2 * Math.atan( Math.pow( Math.E, -this.eta[i] ) ));//theta-s gamotvla cotTheta-dan
        this.theta.push(Math.PI / 2 - Math.atan(this.cotTheta[i]))
        this.eta.push(-1 * Math.log(Math.tan(this.theta[i] / 2)))
        //this.theta.push(Math.atan(1/this.cotTheta));//theta-s gamotvla cotTheta-dan
      }
    }
    this.maxPt = Math.max(...this.pt)
    this.minPt = Math.min(...this.pt)

    this.setTrackColor()
  }
  //track-ebis ferebis archeva
  setTrackColor() {
    for (var i = 0; i < this.numberOfEventParams; i++) {
      this.trackColor[i] = { original: 0xffe342, selected: 0xff6e40 }
    }
    if (this.muonTracks != undefined) {
      for (var j = this.muonTracks.length - 1; j >= 0; j--) {
        this.trackColor[this.muonTracks[j]] = {
          original: 0x3483eb,
          selected: 0xff6e40,
        }
      }
    }
    if (this.electronTracks != undefined) {
      for (var j = this.electronTracks.length - 1; j >= 0; j--) {
        this.trackColor[this.electronTracks[j]] = {
          original: 0x34eb8c,
          selected: 0xff6e40,
        }
      }
    }
  }
  // track-ebis dagrdzeleba da dajaxebis centrtan uaxloesi wertilis povna
  track_incident_point(point1, point2) {
    var direc_vect = new THREE.Vector3(
      new algebra.Fraction(
        parseInt((point2.x - point1.x).toFixed(3) * 1000),
        1000,
      ),
      new algebra.Fraction(
        parseInt((point2.y - point1.y).toFixed(3) * 1000),
        1000,
      ),
      new algebra.Fraction(
        parseInt((point2.z - point1.z).toFixed(3) * 1000),
        1000,
      ),
    )
    var vect = new THREE.Vector3(
      new algebra.Expression('t'),
      new algebra.Expression('t'),
      new algebra.Expression('t'),
    )
    vect.x = vect.x.multiply(direc_vect.x)
    vect.x = vect.x.add(
      new algebra.Fraction(parseInt((point1.x * 1000).toFixed(0)), 1000),
    )
    vect.y = vect.y.multiply(direc_vect.y)
    vect.y = vect.y.add(
      new algebra.Fraction(parseInt((point1.y * 1000).toFixed(0)), 1000),
    )
    vect.z = vect.z.multiply(direc_vect.z)
    vect.z = vect.z.add(
      new algebra.Fraction(parseInt((point1.z * 1000).toFixed(0)), 1000),
    )

    var expr = vect.x.multiply(direc_vect.x).add(vect.y.multiply(direc_vect.y))
    expr = expr.add(vect.z.multiply(direc_vect.z))
    var eq = new algebra.Equation(expr, 0)
    var sol = eq.solveFor('t')
    var incident_point = new THREE.Vector3(
      eval(
        vect.x
          .eval({ t: new algebra.Fraction(sol.numer, sol.denom) })
          .toString(),
      ),
      eval(
        vect.y
          .eval({ t: new algebra.Fraction(sol.numer, sol.denom) })
          .toString(),
      ),
      eval(
        vect.z
          .eval({ t: new algebra.Fraction(sol.numer, sol.denom) })
          .toString(),
      ),
    )
    return incident_point
  }
  //track-ebis xatva gamrudebis gareshe (wertilebis raodenoba>2)
  trackDrawAlg1(i, index) {
    let trackPath = []
    for (var j = 0; j < this.numPol[i]; j++) {
      trackPath.push(
        new THREE.Vector3(
          Number(this.X[index + j]),
          Number(this.Y[index + j]),
          Number(this.Z[index + j]),
        ),
      )
    }
    try {
      var incident_point = this.track_incident_point(trackPath[0], trackPath[1])
      trackPath.unshift(incident_point)
    } catch {
      var incident_point = this.track_incident_point(trackPath[0], trackPath[2])
      trackPath.unshift(incident_point)
    }
    this.trackVector.push(new THREE.CatmullRomCurve3(trackPath, false))
    let points = this.trackVector[this.trackVector.length - 1].getPoints(100)
    let geo = new THREE.BufferGeometry().setFromPoints(points)
    let mat = new THREE.LineBasicMaterial({
      color: globalTraclColor,
      clippingPlanes: clip_planes,
    })

    let line = new THREE.Line(geo, mat)
    line.name = i
    line.incident_point = incident_point
    line.second_point = trackPath[trackPath.length - 1]
    return line
  }
  // track-ebis gamrudebit xatva
  trackDrawAlg2(i, index) {
    let l = Math.sqrt(
      Math.pow(this.X[index] - this.X[index + 1], 2) +
        Math.pow(this.Y[index] - this.Y[index + 1], 2) +
        Math.pow(this.Z[index] - this.Z[index + 1], 2),
    ) //track-is sigrdzis gamotvla
    let curvatureValue = l / 4 //track-is simrudis koeficienti
    //nawilakis sawyisi wertilidan sivrceshi gafantvis mimtitebelis koordinatebi
    let pointer1X =
      this.X[index] +
      curvatureValue * Math.sin(this.theta[i]) * Math.cos(this.phi[i])
    let pointer1Y =
      this.Y[index] +
      curvatureValue * Math.sin(this.theta[i]) * Math.sin(this.phi[i])
    let pointer1Z = this.Z[index] + curvatureValue * Math.cos(this.theta[i])
    //nawilakis sivrceshi gabnevis theta kutxe saboloo wertiltan
    if (this.theta[i] < Math.PI / 2)
      var theta0 = Math.asin(
        Math.sqrt(
          Math.pow(this.X[index] - this.X[index + 1], 2) +
            Math.pow(this.Y[index] - this.Y[index + 1], 2),
        ) / l,
      )
    else
      var theta0 =
        Math.PI -
        Math.asin(
          Math.sqrt(
            Math.pow(this.X[index] - this.X[index + 1], 2) +
              Math.pow(this.Y[index] - this.Y[index + 1], 2),
          ) / l,
        )
    let lengthFromPointer1ToPointer2 =
      l - 2 * curvatureValue * Math.cos(this.theta[i] - theta0) //mandzili sivrceshi gabnevis 1-lsa da me-2 mimtitebel shoris
    //track-ebis saboloo wertilis mimartulebis mimtitebeli
    let pointer2X =
      pointer1X +
      lengthFromPointer1ToPointer2 * ((this.X[index + 1] - this.X[index]) / l)
    let pointer2Y =
      pointer1Y +
      lengthFromPointer1ToPointer2 * ((this.Y[index + 1] - this.Y[index]) / l)
    let pointer2Z =
      pointer1Z +
      lengthFromPointer1ToPointer2 * ((this.Z[index + 1] - this.Z[index]) / l)
    //track-is asagebad sachiro veqtorebis sheqmna
    try {
      var incident_point = this.track_incident_point(
        new THREE.Vector3(this.X[index], this.Y[index], this.Z[index]),
        new THREE.Vector3(
          this.X[index + 1],
          this.Y[index + 1],
          this.Z[index + 1],
        ),
      )
    } catch {
      var incident_point = new THREE.Vector3(
        this.X[index],
        this.Y[index],
        this.Z[index],
      )
    }
    this.trackVector.push(
      new THREE.CubicBezierCurve3(
        //	new THREE.Vector3( this.X[index], this.Y[index], this.Z[index] ),//sawyisi wertilis koordinatebi
        incident_point,
        new THREE.Vector3(pointer1X, pointer1Y, pointer1Z), //sivrceshi gafantvis mimartuleba
        new THREE.Vector3(pointer2X, pointer2Y, pointer2Z), //sivrceshi gafantvis mimartuleba saboloo wertiltan
        new THREE.Vector3(
          this.X[index + 1],
          this.Y[index + 1],
          this.Z[index + 1],
        ), //saboloo wertili koordinatebi
      ),
    )
    let points = this.trackVector[this.trackVector.length - 1].getPoints(100)
    let geo = new THREE.BufferGeometry().setFromPoints(points)
    let mat = new THREE.LineBasicMaterial({
      color: globalTraclColor,
      clippingPlanes: clip_planes,
    })

    let line = new THREE.Line(geo, mat)
    line.name = i
    line.incident_point = incident_point
    line.second_point = points[points.length - 1]
    return line
  }
  //track-ebis geometriis ageba, pozicionireba da scenashi chamateba
  drawTracks() {
    this.geometry = new Array() //track-ebis geometriebis shemcveli masivi
    this.mesh = new Array() //scenashi chasamatebeli track-ebis obieqtebis masivi
    this.mat = []
    this.trackVector = [] //track-ebis veqtori
    var group = new THREE.Group() //titoeuli algoritmis shesabamisi trakc-ebis jgufi
    group.name = 'track'
    var index = 0
    for (var i = 0; i < this.numberOfEventParams; i++) {
      switch (this.numPol[i]) {
        case 0:
          break
        case 2:
          group.add(this.trackDrawAlg2(i, index))
          break
        default:
          group.add(this.trackDrawAlg1(i, index))
      }
      index += this.numPol[i] //koordinatebis (x,y,z) indexi;
    }
    if (group.children.length > 0) {
      group.TRACK = this
      group.visible = this.visibility
      scene.getObjectByName('EGO').getObjectByName('TRACK').add(group)
    }
  }
  arraySum(array, index) {
    var temp = 0
    var sum = 0
    while (temp < index) {
      sum += array[temp]
      temp++
    }
    return sum
  }
  //track-ebis muxtis mixedvit gafiltvra
  filterByCharge(positive, negative) {
    if (!(positive && negative)) {
      if (positive) {
        for (var i = 0; i < this.numberOfEventParams; i++) {
          if (
            Math.sign(this.pt[i]) === Math.sign(1) &&
            scene.getObjectByName('TRACK').getObjectByName(i) != null
          )
            scene.getObjectByName('TRACK').getObjectByName(i).visible = false
        }
      }
      if (negative) {
        for (var i = 0; i < this.numberOfEventParams; i++) {
          if (
            Math.sign(this.pt[i]) === Math.sign(-1) &&
            scene.getObjectByName('TRACK').getObjectByName(i)
          )
            scene.getObjectByName('TRACK').getObjectByName(i).visible = false
        }
      }
    }
  }
  changeTrackMesh(i, size) {
    try {
      scene
        .getObjectByName('TRACK')
        .getObjectByName(parseFloat(i))
        .geometry.dispose()
      scene
        .getObjectByName('TRACK')
        .getObjectByName(parseFloat(i))
        .material.dispose()
      scene
        .getObjectByName('TRACK')
        .remove(scene.getObjectByName('TRACK').getObjectByName(parseFloat(i)))
      this.geometry[i] = new THREE.TubeBufferGeometry(
        this.trackVector[i],
        100,
        size,
        5,
        false,
      ) //geometriebis cahwera track-is geometriebis masivshi
      this.mesh[i] = new THREE.Mesh(this.geometry[i], this.mat[i]) //scenashi chasamatebeli track-is obieqtze mnishvnelobis minicheba
      this.mesh[i].name = i
      scene.getObjectByName('EGO').getObjectByName('TRACK').add(this.mesh[i])
    } catch {}
  }
}
//Event klasis shvilobili klasi, romelic sheicavs informacias dakarguli transversuli impulsis shesaxeb
class missingET extends Event {
  //missingET-is klasis konstruqtori, romelic klasis obieqtis parametrebs anichebs mnishvnelobas
  constructor(XML) {
    var tagName = 'ETMis'
    var index = 0
    super(tagName, index)
    this.readCommonParams(XML, tagName, index)
    this.Ex = this.convertToNums(this.readTagText(this.tag, 'etx', 0))[0]
    this.Ey = this.convertToNums(this.readTagText(this.tag, 'ety', 0))[0]
    this.Et = Math.sqrt(Math.pow(this.Ex, 2) + Math.pow(this.Ey, 2))
    this.phi = (Math.atan(this.Ey / this.Ex) * 180) / Math.PI
    this.originalMETcolor = 0xdd2c00
    this.selectedMETcolor = 0xed937d
  }
  //missingET-is agebis funqcia
  drawMET() {
    //MET-is geometriis sheqmna
    this.geometry = new THREE.BufferGeometry()
    //MET-is wertilebis chasma geometriashi
    let vec1 = new THREE.Vector3(0, 0, 0)
    let vec2 = new THREE.Vector3(this.Ex * 5, this.Ey * 5, 0)
    let vertices = new Float32Array([
      vec1.x,
      vec1.y,
      vec1.z,
      vec2.x,
      vec2.y,
      vec2.z,
    ])
    this.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(vertices, 3),
    )
    //MET-is materialis sheqmna
    this.material = new THREE.LineDashedMaterial({
      color: this.originalMETcolor,
      dashSize: 0.5,
      gapSize: 0.1,
      clippingPlanes: clip_planes,
    })
    //MET-is mesh-is sheqmna
    this.mesh = new THREE.Line(this.geometry, this.material)
    //wyvetil xazebs shoris arsebuli mandzilis gamotvla
    this.mesh.computeLineDistances()
    //MET-is mesh-ze saxelis minicheba
    this.mesh.name = 0
    scene.getObjectByName('EGO').getObjectByName('MET').MET = this
    //MET-is meshh-is scenashi chamateba
    scene.getObjectByName('EGO').getObjectByName('MET').add(this.mesh)
  }
}
class Tile extends Event {
  constructor(XML, tagName, index) {
    super(tagName, index)
    this.readCommonParams(XML, tagName, index)

    this.energy = this.convertToNums(this.readTagText(this.tag, 'energy', 0))
    this.eta = this.convertToNums(this.readTagText(this.tag, 'eta', 0))
    this.phi = this.convertToNums(this.readTagText(this.tag, 'phi', 0))
    this.ID = this.convertToNums(this.readTagText(this.tag, 'id', 0))
    this.idBin = []
    for (var i = 0; i < this.numberOfEventParams; i++)
      this.idBin.push(this.ID[i].toString(2))
    this.section = []
    for (var i = 0; i < this.numberOfEventParams; i++)
      this.section.push(parseInt(this.idBin[i].slice(2, 5), 2))
    this.module = []
    for (var i = 0; i < this.numberOfEventParams; i++)
      this.module.push(
        parseInt(this.idBin[i].slice(8, 17), 2) * Math.sign(this.phi[i]),
      )
    this.tower = []
    for (var i = 0; i < this.numberOfEventParams; i++)
      this.tower.push(parseInt(this.idBin[i].slice(17, 23), 2))
    this.sampling = []
    for (var i = 0; i < this.numberOfEventParams; i++)
      this.sampling.push(parseInt(this.idBin[i].slice(23, 27), 2))
    this.pmt = []
    for (var i = 0; i < this.numberOfEventParams; i++)
      this.pmt.push(parseInt(this.idBin[i].slice(27, 30), 2))
    this.phi = this.convertToNums(this.readTagText(this.tag, 'phi', 0))
    this.name = []
    this.cellProps = {
      A: { r: 2.45, h: 0.3 },
      BLB: { r: 2.795, h: 0.39 },
      C: { r: 3.215, h: 0.45 },
      DLBD4: { r: 3.63, h: 0.38 },
      BEB: { r: 2.87, h: 0.54 },
      DEB: { r: 3.48, h: 0.68 },
      E1: { r: 2.8025, h: 0.313 },
      E2: { r: 2.24755, h: 0.341 },
      E3: { r: 2.066, h: 0.478 },
      E4: { r: 1.646, h: 0.362 },
    }
    this.cellProps.A.d = [
      0.24648,
      0.24648,
      0.2556,
      0.25561,
      0.27386,
      0.283,
      0.29212,
      0.31951,
      0.33776,
      0.29212,
      0,
      0.16428,
      0.45634,
      0.5111,
      0.54758,
      0.87617,
    ]
    this.cellProps.B = {}
    this.cellProps.B.d = [
      0.28299,
      0.283,
      0.28299,
      0.30125,
      0.30125,
      0.32864,
      0.33776,
      0.36516,
      0.31954,
      0,
      0.29206,
      0.49284,
      0.54761,
      0.58412,
      0.63887,
    ]
    this.cellProps.C.d = [
      0.31951,
      0.32864,
      0.32863,
      0.3469,
      0.34689,
      0.37428,
      0.39254,
      0.36515,
      0,
      0.0947,
    ]
    this.cellProps.D = {}
    this.cellProps.D.d = [
      0.7303,
      0.73944,
      0.78507,
      0.91288,
      0.309,
      1.18648,
      1.36902,
    ]
    this.cellProps.E = {}
    this.cellProps.E.d = [0.015, 0.008]
    this.cellProps.A.z = []
    this.cellProps.B.z = []
    this.cellProps.C.z = []
    this.cellProps.D.z = []
    this.cellProps.E.z = [3.552, 3.54]
    this.calcWidth(this.cellProps.A)
    this.calcWidth(this.cellProps.BLB)
    this.calcWidth(this.cellProps.C)
    this.calcWidth(this.cellProps.DLBD4)
    this.calcWidth(this.cellProps.BEB)
    this.calcWidth(this.cellProps.DEB)
    this.calcWidth(this.cellProps.E1)
    this.calcWidth(this.cellProps.E2)
    this.calcWidth(this.cellProps.E3)
    this.calcWidth(this.cellProps.E4)
    this.findCellZCoord()
    this.cellColors = [
      '#30336b',
      '#4652b0',
      '#4385bb',
      '#75b670',
      '#badc58',
      '#f8c44e',
      '#f4a13b',
      '#f07c3f',
      '#eb4d4b',
      '#c43837',
    ]
    this.cellOriginalColors = []
    this.maxEnergy = Math.max(...this.energy)
    this.minEnergy = Math.min(...this.energy)
    this.centerCoords = []
    this.theta = []
    for (var i = 0; i < this.numberOfEventParams; i++) {
      switch (this.sampling[i]) {
        case 0:
          this.theta.push(2 * Math.atan(Math.pow(Math.E, -this.eta[i])))
          this.name[i] = 'A' + (this.tower[i] + 1) * Math.sign(this.eta[i])
          break
        case 1:
          this.theta.push(2 * Math.atan(Math.pow(Math.E, -this.eta[i])))
          if (this.tower[i] < 8)
            this.name[i] = 'BC' + (this.tower[i] + 1) * Math.sign(this.eta[i])
          else if (this.tower[i] === 9)
            this.name[i] = 'C' + 10 * Math.sign(this.eta[i])
          else this.name[i] = 'B' + (this.tower[i] + 1) * Math.sign(this.eta[i])
          break
        case 2:
          this.theta.push(2 * Math.atan(Math.pow(Math.E, -this.eta[i])))
          this.name[i] = 'D' + (this.tower[i] / 2) * Math.sign(this.eta[i])
          break
        default:
          this.theta.push(2 * Math.atan(Math.pow(Math.E, -this.eta[i])))
          switch (this.tower[i]) {
            case 13:
              this.name[i] = 'E' + 3 * Math.sign(this.eta[i])
              break
            case 15:
              this.name[i] = 'E' + 4 * Math.sign(this.eta[i])
              break
            default:
              this.name[i] = 'E' + (this.tower[i] % 9) * Math.sign(this.eta[i])
          }
      }
    }
  }
  drawTileCal(section, layer) {
    var scope = this
    //	loadingbar.push();
    TILEActivated = true
    setTimeout(function () {
      switch (section) {
        case 'LBA':
          if (layer + 1) {
            for (var i = 0; i < scope.numberOfEventParams; i++) {
              if (
                (scope.section[i] * Math.sign(scope.eta[i]) == 1 ||
                  scope.eta[i] == 0) &&
                scope.sampling[i] == layer
              ) {
                scope.cellGeoNCenter(i)
              }
            }
          } else {
            for (var i = 0; i < scope.numberOfEventParams; i++) {
              if (
                scope.section[i] * Math.sign(scope.eta[i]) == 1 ||
                scope.eta[i] == 0
              ) {
                scope.cellGeoNCenter(i)
              }
            }
          }
          break
        case 'LBC':
          if (layer + 1) {
            for (var i = 0; i < scope.numberOfEventParams; i++) {
              if (
                scope.section[i] * Math.sign(scope.eta[i]) == -1 &&
                scope.sampling[i] == layer
              ) {
                scope.cellGeoNCenter(i)
              }
            }
          } else {
            for (var i = 0; i < scope.numberOfEventParams; i++) {
              if (scope.section[i] * Math.sign(scope.eta[i]) == -1) {
                scope.cellGeoNCenter(i)
              }
            }
          }
          break
        case 'EBA':
          if (layer + 1) {
            for (var i = 0; i < scope.numberOfEventParams; i++) {
              if (
                (scope.section[i] * Math.sign(scope.eta[i]) == 2 ||
                  scope.section[i] * Math.sign(scope.eta[i]) == 3) &&
                scope.sampling[i] == layer
              ) {
                scope.cellGeoNCenter(i)
              }
            }
          } else {
            for (var i = 0; i < scope.numberOfEventParams; i++) {
              if (
                scope.section[i] * Math.sign(scope.eta[i]) == 2 ||
                scope.section[i] * Math.sign(scope.eta[i]) == 3
              ) {
                scope.cellGeoNCenter(i)
              }
            }
          }
          break
        case 'EBC':
          if (layer + 1) {
            for (var i = 0; i < scope.numberOfEventParams; i++) {
              if (
                (scope.section[i] * Math.sign(scope.eta[i]) == -2 ||
                  scope.section[i] * Math.sign(scope.eta[i]) == -3) &&
                scope.sampling[i] == layer
              ) {
                scope.cellGeoNCenter(i)
              }
            }
          } else {
            for (var i = 0; i < scope.numberOfEventParams; i++) {
              if (
                scope.section[i] * Math.sign(scope.eta[i]) == -2 ||
                scope.section[i] * Math.sign(scope.eta[i]) === -3
              ) {
                scope.cellGeoNCenter(i)
              }
            }
          }
          break
        default:
          for (var i = 0; i < scope.numberOfEventParams; i++) {
            scope.cellGeoNCenter(i)
          }
        //	TILE.tileFilter();
      }
    }, 1)
  }
  findCellCenter(i, radius, cellZ) {
    var l = radius / Math.sin(this.theta[i])
    var x = l * Math.sin(this.theta[i]) * Math.cos(this.phi[i])
    var y = l * Math.sin(this.theta[i]) * Math.sin(this.phi[i])
    var z = cellZ * Math.sign(this.eta[i])
    this.centerCoords[i] = new THREE.Vector3(x, y, z)
  }
  calcWidth(cellType) {
    cellType.w = []
    cellType.w[0] =
      2 * (cellType.r - cellType.h / 2) * Math.atan(Math.PI / 64) - 0.002
    cellType.w[1] =
      2 * (cellType.r + cellType.h / 2) * Math.atan(Math.PI / 64) - 0.002
  }
  createGeo(i, w, h, d, r, inputZ, CinBC) {
    var cellShape = new THREE.Shape()
    cellShape.moveTo(w[1] / 2, -h / 2)
    cellShape.lineTo(-w[1] / 2, -h / 2)
    cellShape.lineTo(-w[0] / 2, h / 2)
    cellShape.lineTo(w[0] / 2, h / 2)

    var extrudeSettings = {
      /*steps: 2,*/
      depth: d,
      bevelEnabled: false,
    }

    var geometry = new THREE.ExtrudeBufferGeometry(cellShape, extrudeSettings)
    var edges = new THREE.EdgesGeometry(geometry)
    var cellEdge = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({
        color: 0x103138,
        transparent: true,
        clippingPlanes: clip_planes,
      }),
    )
    var mesh = new THREE.Mesh(geometry, this.getCellColor(i))
    this.findCellCenter(i, r, inputZ)
    mesh.position.x = this.centerCoords[i].x
    mesh.position.y = this.centerCoords[i].y
    mesh.position.z = this.centerCoords[i].z - d / 2
    mesh.rotation.z = this.phi[i] + Math.PI / 2
    cellEdge.position.x = this.centerCoords[i].x
    cellEdge.position.y = this.centerCoords[i].y
    cellEdge.position.z = this.centerCoords[i].z - d / 2
    cellEdge.rotation.z = this.phi[i] + Math.PI / 2
    if (CinBC) {
      mesh.name =
        (CinBC * Math.sign(this.eta[i])).toString() + i + this.sampling[i]
      cellEdge.name =
        'edge' +
        (CinBC * Math.sign(this.eta[i])).toString() +
        i +
        this.sampling[i]
    } else {
      mesh.name =
        (this.section[i] * Math.sign(this.eta[i])).toString() +
        i +
        this.sampling[i]
      cellEdge.name =
        'edge' +
        (this.section[i] * Math.sign(this.eta[i])).toString() +
        i +
        this.sampling[i]
    }
    var maxInput = ''
    var minInput = '0.3'
    var isMax = !isNaN(maxInput)
    var isMin = !isNaN(minInput)
    if (isMax || isMin) {
      isMax ? (maxInput = parseFloat(maxInput)) : (maxInput = undefined)
      isMin ? (minInput = parseFloat(minInput)) : (minInput = undefined)
      if (this.energy[i] >= minInput) {
        mesh.index = scene.getObjectByName('TILE').children.length
        scene.getObjectByName('TILE').add(mesh)
        scene.getObjectByName('edges').add(cellEdge)
        this.cellOriginalColors.push(mesh.material.color.getHex())
        //	scene.getObjectByName('TILE').getObjectByName(mesh.name).visible = false;
        //	scene.getObjectByName('edges').getObjectByName(cellEdge.name).visible = false;
      }
    }
    //return mesh;
  }
  cellGeoNCenter(i) {
    switch (this.section[i]) {
      case 1:
        switch (this.sampling[i]) {
          case 0:
            this.createGeo(
              i,
              this.cellProps.A.w,
              this.cellProps.A.h,
              this.cellProps.A.d[this.tower[i]],
              this.cellProps.A.r,
              this.cellProps.A.z[this.tower[i]],
            )
            break
          case 1:
            if (this.tower[i] === 8)
              this.createGeo(
                i,
                this.cellProps.BLB.w,
                this.cellProps.BLB.h,
                this.cellProps.B.d[this.tower[i]],
                this.cellProps.BLB.r,
                this.cellProps.B.z[this.tower[i]],
              )
            else {
              this.createGeo(
                i,
                this.cellProps.BLB.w,
                this.cellProps.BLB.h,
                this.cellProps.B.d[this.tower[i]],
                this.cellProps.BLB.r,
                this.cellProps.B.z[this.tower[i]],
              )
              this.createGeo(
                i,
                this.cellProps.C.w,
                this.cellProps.C.h,
                this.cellProps.C.d[this.tower[i]],
                this.cellProps.C.r,
                this.cellProps.C.z[this.tower[i]],
                4,
              )
            }
            break
          default:
            this.createGeo(
              i,
              this.cellProps.DLBD4.w,
              this.cellProps.DLBD4.h,
              this.cellProps.D.d[this.tower[i] / 2],
              this.cellProps.DLBD4.r,
              this.cellProps.D.z[this.tower[i] / 2],
            )
        }
        break
      case 2:
        switch (this.sampling[i]) {
          case 0:
            this.createGeo(
              i,
              this.cellProps.A.w,
              this.cellProps.A.h,
              this.cellProps.A.d[this.tower[i]],
              this.cellProps.A.r,
              this.cellProps.A.z[this.tower[i]],
            )
            break
          case 1:
            this.createGeo(
              i,
              this.cellProps.BEB.w,
              this.cellProps.BEB.h,
              this.cellProps.B.d[this.tower[i]],
              this.cellProps.BEB.r,
              this.cellProps.B.z[this.tower[i]],
            )
            break
          default:
            if (
              (this.module[i] === 14 && this.eta[i] > 0 && this.eta[i] < 1.2) ||
              (this.module[i] === 17 && this.eta[i] < 0 && this.eta[i] > -1.2)
            ) {
              this.createGeo(
                i,
                this.cellProps.DEB.w,
                this.cellProps.DEB.h,
                this.cellProps.D.d[this.tower[i] / 2] +
                  this.cellProps.C.d[this.cellProps.C.d.length - 1] +
                  0.01,
                this.cellProps.DEB.r,
                this.cellProps.D.z[this.tower[i] / 2] -
                  this.cellProps.C.d[this.cellProps.C.d.length - 1] +
                  0.04,
              )
            } else {
              this.createGeo(
                i,
                this.cellProps.DEB.w,
                this.cellProps.DEB.h,
                this.cellProps.D.d[this.tower[i] / 2],
                this.cellProps.DEB.r,
                this.cellProps.D.z[this.tower[i] / 2],
              )
            }
        }
        break
      default:
        switch (this.sampling[i]) {
          case 1:
            if (
              ((this.module[i] === -38 ||
                this.module[i] === -39 ||
                this.module[i] === -40 ||
                this.module[i] === -41) &&
                this.eta[i] > 0) ||
              ((this.module[i] === -54 ||
                this.module[i] === -55 ||
                this.module[i] === -56 ||
                this.module[i] === -57) &&
                this.eta[i] < 0)
            ) {
              this.createGeo(
                i,
                this.cellProps.C.w,
                this.cellProps.C.h,
                this.cellProps.E.d[0],
                this.cellProps.C.r,
                this.cellProps.E.z[0],
              )
            } else {
              this.createGeo(
                i,
                this.cellProps.C.w,
                this.cellProps.C.h,
                this.cellProps.C.d[this.tower[i]],
                this.cellProps.C.r,
                this.cellProps.C.z[9],
              )
            }
            break
          case 2:
            if (
              ((this.module[i] === 13 ||
                this.module[i] === 17 ||
                this.module[i] === 18) &&
                this.eta[i] > 0 &&
                this.eta[i] < 1) ||
              ((this.module[i] === 13 ||
                this.module[i] === 14 ||
                this.module[i] === 18) &&
                this.eta[i] < 0 &&
                this.eta[i] > -1)
            ) {
              this.createGeo(
                i,
                this.cellProps.DLBD4.w,
                this.cellProps.DLBD4.h,
                this.cellProps.C.d[this.cellProps.C.d.length - 1],
                this.cellProps.DLBD4.r,
                this.cellProps.C.z[9],
              )
            } else {
              this.createGeo(
                i,
                this.cellProps.DLBD4.w,
                this.cellProps.DLBD4.h,
                this.cellProps.D.d[this.tower[i] / 2],
                this.cellProps.DLBD4.r,
                this.cellProps.D.z[this.tower[i] / 2],
              )
            }
            break
          default:
            switch (this.tower[i]) {
              case 10:
                this.createGeo(
                  i,
                  this.cellProps.E1.w,
                  this.cellProps.E1.h,
                  this.cellProps.E.d[0],
                  this.cellProps.E1.r,
                  this.cellProps.E.z[0],
                )
                break
              case 11:
                this.createGeo(
                  i,
                  this.cellProps.E2.w,
                  this.cellProps.E2.h,
                  this.cellProps.E.d[0],
                  this.cellProps.E2.r,
                  this.cellProps.E.z[0],
                )
                break
              case 13:
                this.createGeo(
                  i,
                  this.cellProps.E3.w,
                  this.cellProps.E3.h,
                  this.cellProps.E.d[1],
                  this.cellProps.E3.r,
                  Math.sign(this.cellProps.E.z[1]) *
                    (Math.abs(this.cellProps.E.z[1]) - 0.002),
                )
                break
              default:
                this.createGeo(
                  i,
                  this.cellProps.E4.w,
                  this.cellProps.E4.h,
                  this.cellProps.E.d[1],
                  this.cellProps.E4.r,
                  Math.sign(this.cellProps.E.z[1]) *
                    (Math.abs(this.cellProps.E.z[1]) - 0.002),
                )
            }
        }
    }
  }
  findCellZCoord() {
    var lengthSum = 0
    for (var i = 0; i < this.cellProps.A.d.length; i++) {
      if (i === 10) lengthSum = 3.5745
      this.cellProps.A.z.push(lengthSum + this.cellProps.A.d[i] / 2)
      lengthSum += this.cellProps.A.d[i]
    }
    var lengthSum = 0
    for (var i = 0; i < this.cellProps.D.d.length; i++) {
      if (i === 0) {
        this.cellProps.D.z.push(0)
        lengthSum += this.cellProps.D.d[0] / 2
      } else {
        this.cellProps.D.z.push(lengthSum + this.cellProps.D.d[i] / 2)
        if (i === 4) {
          lengthSum = 3.5745 - this.cellProps.D.d[4]
          this.cellProps.D.z[4] = 3.4045
        }
        lengthSum += this.cellProps.D.d[i]
      }
    }
    var lengthSum = 0
    for (var i = 0; i < this.cellProps.B.d.length; i++) {
      if (i === 9) lengthSum = 3.5745
      this.cellProps.B.z.push(lengthSum + this.cellProps.B.d[i] / 2)
      lengthSum += this.cellProps.B.d[i]
    }
    var lengthSum = 0
    for (var i = 0; i < this.cellProps.C.d.length - 1; i++) {
      this.cellProps.C.z.push(lengthSum + this.cellProps.C.d[i] / 2)
      lengthSum += this.cellProps.C.d[i]
    }
    this.cellProps.C.z[9] = 3.511845
  }
  getCellColor(i) {
    var nineth = Math.abs(this.minEnergy - this.maxEnergy) / 9
    //	for (var j = 1; j <10; j++) {
    //		if (this.energy[i] <= (this.minEnergy + j * nineth)) return new THREE.MeshToonMaterial({color: this.cellColors[j-1], transparent: true});//cell-ebis materialis dabruneba
    //		if (this.energy[i] == this.maxEnergy) return new THREE.MeshToonMaterial({color: this.cellColors[this.cellColors.length-1], transparent: true});//cell-ebis materialis dabruneba
    //	}
    for (var j = 1; j < 10; j++) {
      if (this.energy[i] <= this.minEnergy + j * nineth) {
        if (this.energy[i] < this.minEnergy + j * nineth - nineth / 2)
          return new THREE.MeshToonMaterial({
            color: this.cellColors[j - 1],
            transparent: true,
            clippingPlanes: clip_planes,
          })
        else
          return new THREE.MeshToonMaterial({
            color: this.cellColors[j],
            transparent: true,
            clippingPlanes: clip_planes,
          })
      }
    }
  }
  showEnergyColors() {
    //var schemeNumber=2; // shesacvlelia archeuli sqemis mixedvit
    //  this.cellColors = eval("colorScheme" + schemeNumber);//shercheuli ferebis scemis ferebis gadacema cellColors cvladistvis;
    var nineth = Math.abs(this.minEnergy - this.maxEnergy) / 9 //minimaluri da maqsimaluri energiebis absoluturi mnishvnelobebis me-9-dis gamotvla
    $('.cell-scheme').html(
      '<div class="cell-energy-title">Scale of Energies:</div>',
    )
    var temp = 0
    for (var k = 9; k >= 0; k--) {
      $('.cell-scheme').append(
        '<ul class="colorsByEnergies" class="list-inline"><li class="cell-energy-clr list-inline-item" style = "background-color: ' +
          this.cellColors[k] +
          '"><span>' +
          (this.maxEnergy - temp * nineth).toFixed(3) +
          ' GeV</span></li>',
      )
      temp++
    }
  }
  loadSelectedCells(section) {
    TILEActivated = true
    if (selectedTreeComponents[section].length != 0) {
      for (var i = 0; i < selectedTreeComponents[section].length; i++) {
        this.drawTileCal(section, selectedTreeComponents[section][i])
      }
    }
  }
  hideCells() {
    var numberOfEventParamsBackup = this.numberOfEventParams
    var etaBackup = this.eta
    var samplingBackup = this.sampling
    //	loadingbar.push();//LA
    for (
      var i =
        scene.getObjectByName('EGO').getObjectByName('TILE').children.length -
        1;
      i >= 0;
      i--
    ) {
      //	scene.getObjectByName('EGO').getObjectByName('TILE').children[i].visible=false;
      //	scene.getObjectByName('EGO').getObjectByName('edges').children[i].visible=false;
      scene
        .getObjectByName('EGO')
        .getObjectByName('TILE')
        .children[i].geometry.dispose()
      scene
        .getObjectByName('EGO')
        .getObjectByName('TILE')
        .children[i].material.dispose()
      scene
        .getObjectByName('EGO')
        .getObjectByName('TILE')
        .remove(
          scene.getObjectByName('EGO').getObjectByName('TILE').children[i],
        )
      scene
        .getObjectByName('EGO')
        .getObjectByName('edges')
        .children[i].geometry.dispose()
      scene
        .getObjectByName('EGO')
        .getObjectByName('edges')
        .children[i].material.dispose()
      scene
        .getObjectByName('EGO')
        .getObjectByName('edges')
        .remove(
          scene.getObjectByName('EGO').getObjectByName('edges').children[i],
        )
    }
  }
  tileFilter() {
    $('.loading-screen').show()
    //	var maxInput = $('#maxTileCell').val();
    //	var minInput = $('#minTileCell').val();
    var maxInput = ''
    //var minInput = this.minEnergy+(this.maxEnergy-this.minEnergy)*0.16;
    var minInput = ''
    var isMax
    var isMin
    maxInput === '' ? (isMax = false) : !isNaN(maxInput)
    minInput === '' ? (isMin = false) : !isNaN(minInput)
    var isMax = !isNaN(maxInput)
    var isMin = !isNaN(minInput)
    var indxStr
    var indxNmbr
    //	console.log((isMax || isMin));
    if (isMin || isMax) {
      var loadedCells = scene.getObjectByName('TILE')
      isMax ? (maxInput = parseFloat(maxInput)) : (maxInput = undefined)
      isMin ? (minInput = parseFloat(minInput)) : (minInput = undefined)
      for (var i = 0; i < loadedCells.children.length; i++) {
        indxStr = loadedCells.children[i].name
        indxStr[0] === '-'
          ? (indxNmbr = parseFloat(indxStr.slice(2, indxStr.length - 1)))
          : (indxNmbr = parseFloat(indxStr.slice(1, indxStr.length - 1)))
        if (
          TILE.energy[indxNmbr] < minInput ||
          TILE.energy[indxNmbr] > maxInput
        ) {
          loadedCells.getObjectByName(indxStr).visible = false
          scene
            .getObjectByName('edges')
            .getObjectByName('edge' + indxStr).visible = false
        } else {
          loadedCells.getObjectByName(indxStr).visible = true
          scene
            .getObjectByName('edges')
            .getObjectByName('edge' + indxStr).visible = true
        }
      }
    }
    $('.loading-screen').hide()
  }
  resetTileFilter() {
    if (tileFilterOn) {
      var loadedCells = scene.getObjectByName('TILE')
      for (var i = loadedCells.children.length - 1; i >= 0; i--) {
        if (loadedCells.children[i].visible === false) {
          loadedCells.getObjectByName(
            loadedCells.children[i].name,
          ).visible = true
          scene
            .getObjectByName('edges')
            .getObjectByName(
              'edge' + loadedCells.children[i].name,
            ).visible = true
        }
      }
    }
  }
}
class Vertex extends Event {
  constructor(XML) {
    var tagName = 'RVx' //xml-shi RVx tag-is wakitxva
    var index = 0
    super(tagName, index)
    this.readCommonParams(XML, tagName, index)
    try {
      this.count = XML.getElementsByTagName(tagName)[index].getAttribute(
        'count',
      )
      this.x = this.convertToNums(this.readTagText(this.tag, 'x', 0))
      this.y = this.convertToNums(this.readTagText(this.tag, 'y', 0))
      this.z = this.convertToNums(this.readTagText(this.tag, 'z', 0))
      this.chi2 = this.convertToNums(this.readTagText(this.tag, 'chi2', 0))
      this.covMatrix = this.convertToNums(
        this.readTagText(this.tag, 'covMatrix', 0),
      )
      this.numTracks = this.convertToNums(
        this.readTagText(this.tag, 'numTracks', 0),
      )
      this.primVxCand = this.convertToNums(
        this.readTagText(this.tag, 'primVxCand', 0),
      )
      this.tracks = this.convertToNums(this.readTagText(this.tag, 'tracks', 0))
      this.vertexType = this.convertToNums(
        this.readTagText(this.tag, 'vertexType', 0),
      )
      this.phi = []
      this.rho = []
    } catch {
      console.log('Error in reading Vertex')
    }
    this.colorOfOriginalVERTEX = 0xff0000
    this.colorOfSelectedVERTEX = 0xffcccc
  }
  drawVertex(index) {
    var covMat = []

    var k = index * 6
    for (var i = 0; i < 3; i++) {
      covMat[i] = []
      for (var j = 0; j < i + 1; j++) {
        covMat[i][j] = this.covMatrix[k]
        covMat[j][i] = covMat[i][j]
        k++
      }
    }
    //	var invMat=covMat;
    var invMat = math.inv(covMat)
    //	rvx.phi=Math.atan2(rvx.y[0],rvx.x[0]);
    var eigs1 = math.eigs([
      [invMat[0][0], invMat[0][1]],
      [invMat[1][0], invMat[1][1]],
    ])
    var eigs2 = math.eigs([
      [invMat[1][1], invMat[1][2]],
      [invMat[2][1], invMat[2][2]],
    ])

    if (invMat[0][1] == 0) {
      if (invMat[0][0] < invMat[1][1]) this.phi[index] = Math.PI / 2
      else this.phi[index] = 0
    } else
      this.phi[index] = Math.atan2(eigs1.values[0] - invMat[0][0], invMat[0][1])

    if (invMat[1][2] == 0) {
      if (invMat[1][1] < invMat[2][2]) this.rho[index] = Math.PI / 2
      else this.rho[index] = 0
    } else
      this.rho[index] =
        Math.PI / 2 + Math.atan2(eigs2.values[0] - invMat[1][1], invMat[1][2])

    var semiAxis = [
      Math.sqrt(eigs1.values[0]) / 100,
      Math.sqrt(eigs2.values[0]) / 100,
    ]
    if (semiAxis[0] / semiAxis[1] >= 2) semiAxis[0] = semiAxis[0] / 2
    else if (semiAxis[1] / semiAxis[0] >= 2) semiAxis[1] = semiAxis[1] / 2

    var curve = new THREE.EllipseCurve(
      0,
      0, // ax, aY
      semiAxis[0],
      semiAxis[1], // xRadius, yRadius
      0,
      2 * Math.PI, // aStartAngle, aEndAngle
      false, // aClockwise
      0, // aRotation
    )

    var points = curve.getPoints(40)
    var geometry = new THREE.BufferGeometry().setFromPoints(points)
    var material = new THREE.LineBasicMaterial({
      color: this.colorOfOriginalVERTEX,
    })
    var ellipse = new THREE.Line(geometry, material)

    if (this.phi[index] < 0) this.phi[index] *= 1
    //if (this.rho[index]<0) this.rho[index]=Math.PI-this.rho[index];
    //	this.phi[index]*=-1;
    //	this.phi[index]=-Math.PI/3;
    ellipse.position.set(
      this.x[index] / 100,
      this.y[index] / 100,
      this.z[index] / 100,
    )
    var quaternion = new THREE.Quaternion()
    var vector = new THREE.Vector3(
      Math.cos(this.phi[index]) * Math.sin(this.rho[index]),
      Math.sin(this.phi[index]) * Math.sin(this.rho[index]),
      Math.cos(this.rho[index]),
    )
    quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 1), vector)
    ellipse.quaternion.copy(quaternion)
    ellipse.index = index
    ellipse.semiAxis = semiAxis
    ellipse.name = 'vertex'
    scene.getObjectByName('VERTEX').add(ellipse)

    scene
      .getObjectByName('VERTEX')
      .add(this.create_vertexCenter(ellipse.position))
  }
  create_vertexCenter(vect) {
    var PGeometry = new THREE.BufferGeometry()
    PGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array([vect.x, vect.y, vect.z]), 3),
    )
    //	PGeometry.vertices.push(vect);
    var PMaterial = new THREE.PointsMaterial({
      size: 2,
      sizeAttenuation: false,
      color: this.colorOfOriginalVERTEX,
    })
    var pointObj = new THREE.Points(PGeometry, PMaterial)
    pointObj.name = 'vCenter'
    return pointObj
  }
}

//jet-ebis scenidan washla ;gilakze dacherisas
$('#jet-btn').click(function () {
  resetColors()
  // if (this.checked) {
  //   if ($("#jetAlgos")[0].disabled) {
  //     $("#jetAlgos")[0].disabled = false;
  //     scene.getObjectByName("JET").visible = true;
  //   } else this.checked = false;
  // } else {
  //   scene.getObjectByName("JET").visible = false;
  //   $("#jetAlgos")[0].disabled = true;
  // }
  if (this.checked) {
    scene.getObjectByName('JET').visible = true
  } else {
    scene.getObjectByName('JET').visible = false
  }
  showEventStatus()
})
//track-ebis scenidan washla gilakze dacherisas
$('#track-btn').click(function () {
  resetColors()
  if (this.checked) {
    if ($('#trackAlgos')[0].disabled) {
      $('#trackAlgos')[0].disabled = false
      scene.getObjectByName('TRACK').visible = true
    } else this.checked = false
  } else {
    scene.getObjectByName('TRACK').visible = false
    $('#trackAlgos')[0].disabled = true
  }
  showEventStatus()
})
//gilakze dacherisas cell-ebis gamochena gaqroba
$('#cell-check').click(function () {
  if (this.checked) {
    TILEActivated = true
    scene.getObjectByName('TILE').visible = true
    scene.getObjectByName('edges').visible = true
  } else {
    scene.getObjectByName('TILE').visible = false
    scene.getObjectByName('edges').visible = false
    TILEActivated = false
  }
  showEventStatus()
})
$('#met-btn').click(function () {
  if (METActivated) {
    scene.getObjectByName('MET').children[0].visible = false // MET-is geometriis damalva
    METActivated = false //scenashi arsebuli MET-is raodenobis "ganuleba"
    $(this).prop('checked', false)
  } else {
    scene.getObjectByName('MET').children[0].visible = true
    METActivated = true
    $(this).prop('checked', true)
  }
  showEventStatus()
})
$('#vertices-check').click(function () {
  if (this.checked)
    scene.getObjectByName('VERTEX').children.forEach(function (obj) {
      obj.visible = true
    })
  else
    scene.getObjectByName('VERTEX').children.forEach(function (obj) {
      obj.visible = false
    })
  showEventStatus()
})
let loadNextEvent = function () {
  TILE.hideCells() //calorimetris cell-ebis gaqroba sxva eventis chatvirtvisas
  $('.cell-scheme').css({ display: 'none' }) //energiebis skalis fanjris gaqroba
  LOCAL_XML_FILE_UPLOAD = undefined
  EVENT = new Event('Event', 0) //EVENT klasis globaluri obieqti, romelsac enicheba saxeli indeqsi
  EVENT.initExtras(1)
}
//track-ebis gafiltvra filtris gilakze dacherisas
$('.track-filter-col input').keyup(function () {
  resetColors()
  if (!$('#track-btn').is(':checked')) {
    errors.log(3)
  }
  EVENT.trackFilterReset()
  EVENT.allTrackFilter()
})
//jet-ebis gafiltvra filtris gilakze dacherisas
// $(".jet-filter-col input").keyup(function () {
//   resetColors();
//   if (!$("#jet-btn").is(":checked")) {
//     errors.log(4);
//   }
//   //for (var i = 0; i < JET.numberOfEventParams; i++) if (scene.getObjectByName('JET').getObjectByName(i) != null) scene.getObjectByName("JET").getObjectByName(i).visible = true;//yvela jet-is gamochena
//   //	JET.jetFilter();
//   EVENT.jetFilterReset();
//   EVENT.allJetFilter();
// });
// yvela obieqtis sawyisi ferebis dabruneba
function resetColors() {
  if (LarObject) {
    LarObject.resetColors()
  }
  $('.track-jet-info, .track-info-table').removeClass('d-flex')
  $('.track-jet-info, .jet-info-table').removeClass('d-flex')
  $('.track-jet-info, .cell-info-table').removeClass('d-flex')
  $('.track-jet-info, .cluster-info-table').removeClass('d-flex')
  $('.track-jet-info, .hits-info-table').removeClass('d-flex')
  $('.track-jet-info, .MET-info-table').removeClass('d-flex')
  $('.track-jet-info, .vertex-info-table').removeClass('d-flex')
  $('.track-jet-info, .multiple-track-list').removeClass('d-flex')
  $('.multiple-track-list')[0].innerHTML = ''
  //	scene.getObjectByName('HITS').children.forEach(function(obj){obj.visible=true});
  scene.getObjectByName('TRACK').children.forEach(function (obj) {
    obj.children.forEach(function (obj1) {
      obj1.material.color.setHex(
        globalTraclColor
      )
    })
  })
  scene.getObjectByName('JET').children.forEach(function (obj) {
    obj.children.forEach(function (obj1) {
      obj1.material.color.setHex(colorOfOriginalJet)
    })
  })
  scene.getObjectByName('TILE').children.forEach(function (obj) {
    obj.material.opacity = 1
    obj.material.color.setHex(TILE.cellOriginalColors[obj.index])
  })
  // MET obieqtis sawyisi feris dabruneba
  if (scene.getObjectByName('MET').children[0])
    scene
      .getObjectByName('MET')
      .children[0].material.color.setHex(
        scene.getObjectByName('MET').MET.originalMETcolor,
      )
  scene.getObjectByName('VERTEX').children.forEach(function (obj) {
    if (obj.name == 'vertex')
      obj.material.color.setHex(obj.parent.VERTEX.colorOfOriginalVERTEX)
  })
}
// monishnuli obieqtis migeba da shesabamisi informaciis gamotana
function getEventObject(e) {
  console.log(`Ctrl_is_Pressed: ${ctrlPressed}`)
  if (checkCameraPositionDesctop === core.camera.position.x) {
    var chosenObj = EVENT.getIntersectedObject(e)
    if (ctrlPressed == true) {
      select_multiple_tracks(chosenObj)
      return
    }
    if (chosenObj) {
      switch (chosenObj.object.parent.name) {
        case 'track':
          if (
            chosenObj.object.material.color.getHex() ===
            globalTraclColor
          ) {
            resetColors()
            //delete all info
            chosenObj.object.material.color.setHex(
              chosenObj.object.parent.TRACK.trackColor[chosenObj.object.name]
                .selected,
            )
            $('.track-jet-info, .track-info-table').addClass('d-flex')
            //show obj info
            getTrackInfo(chosenObj)
          } else {
            //chosenObj.object.material.color.setHex(chosenObj.object.parent.TRACK.trackColor[chosenObj.object.name].original);
            resetColors()
            //delete all info
          }
          break
        case 'jet':
          if (chosenObj.object.material.color.getHex() === colorOfOriginalJet) {
            //jet-is feris shemowmeba
            resetColors()
            //delete all info
            scene
              .getObjectByName('JET')
              .children[chosenObj.object.parent.JET.index].getObjectByName(
                chosenObj.object.name,
              )
              .material.color.setHex(colorOfSelectedJet) //tu jet-is feri udris sawyiss mashin mashin track-is materials enicheba monishvnis feri
            //show obj info
            $('.track-jet-info, .jet-info-table').addClass('d-flex')
            getJetInfo(chosenObj)
            //getJetInfo(chosenObj1.point.x,chosenObj1.point.y,chosenObj1.point.z,JET.phi[index],JET.et[index],JET.theta[index], JET.SGK);
          } else {
            //scene.getObjectByName("JET").children[chosenObj.object.parent.JET.index].getObjectByName(chosenObj.object.name).material.color.setHex(colorOfOriginalJet);//tu  monishnul jet-s daechira kursori, mashin mas ubrundeba sawyisi feri
            //	delete all info
            resetColors()
          }
          break
        case 'TILE':
          if (chosenObj.object.material.color.getHex() === TILE_SELECT_COLOR) {
            resetColors()
            break
          }
          resetColors()
          for (
            var i = 0;
            i < scene.getObjectByName('TILE').children.length;
            i++
          ) {
            // cell-ebis gamchvirvaleobis minicheba
            scene.getObjectByName('TILE').children[i].material.opacity = 0.25
          }
          scene
            .getObjectByName('TILE')
            .getObjectByName(chosenObj.object.name)
            .material.color.setHex(TILE_SELECT_COLOR)
          scene
            .getObjectByName('TILE')
            .getObjectByName(chosenObj.object.name).material.opacity = 1

          $('.track-jet-info, .cell-info-table').addClass('d-flex')
          getCellInfo(chosenObj)
          break
        case 'LAR':
          const LAR_Parent = scene.getObjectByName('LAR')
          if (LarObject.isChecked) {
            LarObject.resetColors()
            break
          }
          LarObject.isChecked = true
          LAR_Parent.children.forEach((obj) => {
            obj.material = LarObject.getShaderMaterial()
          })

          chosenObj.object.material = LarObject.getShaderMaterial(
            LarObject.selected_color,
            1,
          )
          $('.track-jet-info, .LAR-info-table').addClass('d-flex')
          LarObject.updateInfoWindow(chosenObj.object)
          break
        case 'VERTEX':
          if (
            chosenObj.object.material.color.getHex() ===
            chosenObj.object.parent.VERTEX.colorOfOriginalVERTEX
          ) {
            //monishnuli vertex-is feris shemowmeba
            resetColors()
            //delete all info
            //show obj info
            $('.track-jet-info, .vertex-info-table').addClass('d-flex')
            getVertexInfo(chosenObj)
            vertex_tracks(chosenObj.object)
            chosenObj.object.material.color.setHex(
              chosenObj.object.parent.VERTEX.colorOfSelectedVERTEX,
            ) //monishnul clusters enicheba feri
          } else {
            //	delete all info
            resetColors()
          }
          break
        case 'MET':
          if (
            chosenObj.object.material.color.getHex() ===
            scene.getObjectByName('MET').MET.originalMETcolor
          ) {
            //MET-is feris shemowmeba
            resetColors()
            //delete all info
            scene
              .getObjectByName('MET')
              .children[0].material.color.setHex(
                scene.getObjectByName('MET').MET.selectedMETcolor,
              ) //tu jet-is feri udris sawyiss mashin mashin track-is materials enicheba monishvnis feri
            //show obj info
            $('.track-jet-info, .MET-info-table').addClass('d-flex')
            getMETInfo()
          } else {
            //	delete all info
            resetColors()
          }
          break
        default:
          resetColors()
      }
    } else {
      resetColors()
    }
  }
}
function changeEventObject(e) {
  e.preventDefault()
  if (TRACK) {
    var chosenObj = EVENT.getIntersectedObject(e) //archeuli track-is migeba funqciidan
    if (chosenObj) {
      if (hoveredObj !== undefined) TRACK.changeTrackMesh(hoveredObj, 0.007)
      TRACK.changeTrackMesh(chosenObj.object.name, 0.015)
      hoveredObj = chosenObj.object.name
    }
  }
}
function changeCursor(e) {
  e.preventDefault()
  try {
    var chosenObj = EVENT.getIntersectedObject(e)
    if (chosenObj) {
      $(canvas).css('cursor', 'pointer') //kursoris cvlileba geometriaze mitanisas
    } else {
      $(canvas).css('cursor', 'auto') //default kursoris dabruneba geometriidan moshorebis shemdeg
    }
  } catch {}
}
//kursoris koordinatis migeba dacherisas (desctop)
function getCursorCoord() {
  checkCameraPositionDesctop = core.camera.position.x
}
//event-is monishvna touch-ze
$(document).on('touchstart', 'canvas', function (e) {
  if (checkCameraPositionMobile === core.camera.position.x) {
    mousePosition.x =
      ((e.originalEvent.touches[0].pageX - canvasPosition.left) /
        canvas.width) *
        2 -
      1 //kursoris x koordinati ekranze
    mousePosition.y =
      -(
        (e.originalEvent.touches[0].pageY - canvasPosition.top) /
        canvas.height
      ) *
        2 +
      1 //kursoris y koordinati ekranze
    rayCaster.setFromCamera(mousePosition, core.camera) //sxivis dashveba kameridan kursoris mimartulebit
  }
})
//kursoris koordinatis migeba dacherisas (mobile)
$(document).on('touchstart', 'canvas', function () {
  checkCameraPositionMobile = core.camera.position.x
})
//track Info
function getTrackInfo(selectedObj) {
  let phiVal = (
    (scene.getObjectByName('TRACK').children[
      selectedObj.object.parent.TRACK.index
    ].TRACK.phi[selectedObj.object.name] *
      180) /
    Math.PI
  ).toFixed(3)
  phiVal = phiVal < 0 ? 360 - Math.abs(phiVal) : phiVal
  $('#track-phi-val')[0].innerHTML = phiVal + '&deg'
  $('#track-eta-val')[0].innerHTML = scene
    .getObjectByName('TRACK')
    .children[selectedObj.object.parent.TRACK.index].TRACK.eta[
      selectedObj.object.name
    ].toFixed(3)
  $('#track-pt-val')[0].innerHTML = Math.abs(
    scene.getObjectByName('TRACK').children[
      selectedObj.object.parent.TRACK.index
    ].TRACK.pt[selectedObj.object.name],
  ).toFixed(3)
  $('#track-theta-val')[0].innerHTML =
    (
      (scene.getObjectByName('TRACK').children[
        selectedObj.object.parent.TRACK.index
      ].TRACK.theta[selectedObj.object.name] *
        180) /
      Math.PI
    ).toFixed(3) + '&deg'
  $('#track-charge-val')[0].innerHTML = Math.sign(
    scene.getObjectByName('TRACK').children[
      selectedObj.object.parent.TRACK.index
    ].TRACK.pt[selectedObj.object.name],
  )
}
//Jet Info
function getJetInfo(selectedObj) {
  $('#jet-phi-val')[0].innerHTML = scene.getObjectByName('JET').children[
    selectedObj.object.parent.JET.index
  ].JET.phi[selectedObj.object.name]
  $('#jet-eta-val')[0].innerHTML = scene.getObjectByName('JET').children[
    selectedObj.object.parent.JET.index
  ].JET.eta[selectedObj.object.name]
  $('#jet-et-val')[0].innerHTML = scene.getObjectByName('JET').children[
    selectedObj.object.parent.JET.index
  ].JET.et[selectedObj.object.name]
  $('#jet-theta-val')[0].innerHTML = scene.getObjectByName('JET').children[
    selectedObj.object.parent.JET.index
  ].JET.theta[selectedObj.object.name]
}
//MET Info
function getMETInfo(selectedObj) {
  $('#MET-Et-val')[0].innerHTML =
    scene.getObjectByName('MET').MET.Et.toFixed(3) + 'Gev'
  $('#MET-phi-val')[0].innerHTML =
    scene.getObjectByName('MET').MET.phi.toFixed(3) + '&deg'
  $('#MET-Ex-val')[0].innerHTML =
    scene.getObjectByName('MET').MET.Ex.toFixed(3) + 'Gev'
  $('#MET-Ey-val')[0].innerHTML =
    scene.getObjectByName('MET').MET.Ey.toFixed(3) + 'Gev'
}
function getVertexInfo(selectedObj) {
  $('#vertex-primVxCand-val')[0].innerHTML = scene.getObjectByName(
    'VERTEX',
  ).VERTEX.primVxCand[selectedObj.object.index]
  $('#vertex-numTracks-val')[0].innerHTML = scene.getObjectByName(
    'VERTEX',
  ).VERTEX.numTracks[selectedObj.object.index]
}
function getCellInfo(selectedObj) {
  var strIndx = selectedObj.object.name
  strIndx = strIndx.slice(0, strIndx.length - 1)
  var numIndx = parseFloat(strIndx)
  if (numIndx < 0) numIndx = parseFloat(strIndx.slice(2))
  else numIndx = parseFloat(strIndx.slice(1))
  console.log('after after num: ', numIndx)
  var cellName = TILE.name[numIndx]
  var sectionName = ''
  switch (TILE.section[numIndx]) {
    case 1:
      if (TILE.eta[numIndx] > 0) sectionName = '+LBA'
      else sectionName = '-LBC'
      break
    case 2:
      if (TILE.eta[numIndx] > 0) sectionName = '+EBA'
      else sectionName = '-EBC'
      break
    default:
      if (TILE.eta[numIndx] > 0) sectionName = '+ETCA'
      else sectionName = '-ETCC'
  }
  $('#section').html(sectionName)
  $('#module-number').html(Math.abs(TILE.module[numIndx]) + 1)
  $('#cell-name').html(cellName)
  $('#eventNumber').html(TILE.energy[numIndx] + ' GeV')
  $('#phi').html(TILE.phi[numIndx])
  $('#eta').html(TILE.eta[numIndx])
  $('#sampling').html(TILE.sampling[numIndx])
  //  $( "body").append($(".cell-div"));
}
//vertex-is monishvnisas masshi gamavali track-ebis gaferadeba
function vertex_tracks(vertex) {
  vertex.geometry.computeBoundingBox()
  let box = new THREE.Box3().setFromObject(vertex)
  box.copy(vertex.geometry.boundingBox).applyMatrix4(vertex.matrixWorld)
  //box.setFromCenterAndSize( vertex.position, box.getSize() );
  //
  var atr = new THREE.Vector3()
  /*let box = new THREE.Sphere();
	vertex.geometry.computeBoundingSphere();
	box.copy(vertex.geometry.boundingSphere).applyMatrix4(vertex.matrixWorld);
	box.set( vertex.position,box.radius);  
	*/

  var geometry = new THREE.PlaneGeometry(
    vertex.semiAxis[0] * 2,
    vertex.semiAxis[1] * 2,
  )
  var mat = new THREE.MeshBasicMaterial({ color: 0xff00ff })

  var pl = new THREE.Mesh(geometry, mat)
  pl.position.copy(vertex.position)
  pl.quaternion.copy(vertex.quaternion)

  //scene.add(pl);

  var plane = new THREE.Plane()
  plane.setFromNormalAndCoplanarPoint(
    new THREE.Vector3().set(0, 0, 1).applyQuaternion(pl.quaternion),
    new THREE.Vector3().copy(pl.position),
  )

  //.applyMatrix4(pl.matrixWorld);
  /*var sph = vertex.geometry;
	var obj = new THREE.Mesh( sph, new THREE.MeshBasicMaterial( 0xff0000 ) );
	var boxHelper = new THREE.BoxHelper( vertex, 0xffff00 );
	boxHelper.update(vertex);
	scene.add( boxHelper );
	*/
  //const planehelp = new THREE.Plane( new THREE.Vector3( 1, 1, 0.2 ), 3 );
  //var helper = new THREE.PlaneHelper(mesh, 0xffff00 );

  //scene.add( helper );

  scene.getObjectByName('TRACK').children.forEach(function (obj) {
    obj.children.forEach(function (objChild) {
      if (objChild.visible) {
        var lineRay = new THREE.Ray(
          objChild.incident_point,
          objChild.second_point,
        )

        if (
          lineRay.intersectPlane(plane, atr) &&
          atr.distanceTo(vertex.position) <= vertex.semiAxis[0]
        ) {
          //	objChild.material.color.setHex(0xff6e40);
          var testObject = new Object()
          testObject.object = objChild
          select_multiple_tracks(testObject)

          /*	var g = new THREE.BoxGeometry(0.01, 0.01, 0.01 );
						var m = new THREE.MeshBasicMaterial({color:0x00ff00});
						var n = new THREE.Mesh( g, m);
						n.position.copy( atr );
						scene.add( n ); */
        }
      }
    })
  })
}
//ctrl+click-ze ramdenime track-is monishvna
function select_multiple_tracks(chosenObj) {
  if (chosenObj && chosenObj.object.parent.name == 'track') {
    if ($('.multiple-track-list')[0].innerHTML == '') resetColors()
    if (
      chosenObj.object.material.color.getHex() ===
      globalTraclColor
    ) {
      chosenObj.object.material.color.setHex(
        chosenObj.object.parent.TRACK.trackColor[chosenObj.object.name]
          .selected,
      )
      if (
        chosenObj.object.visible == false ||
        chosenObj.object.parent.visible == false
      )
        return
      $('.track-info-table').removeClass('d-flex')
      if ($('.multiple-track-list')[0].childNodes.length == 0)
        $('.track-jet-info, .multiple-track-list').addClass('d-flex')
      getTrackInfo(chosenObj)
      writeTrackInfoInList(chosenObj)
      addDeltaPhi(chosenObj)
    } else {
      chosenObj.object.material.color.setHex(
        globalTraclColor,
      )
      removeTrackFromList(chosenObj)
    }
  }
}
// ramdenime track-is monishvnisas track-ebs shoris kutxis gamotana
function addDeltaPhi(chosenObj) {
  var deltaPhi =
    '<div class="d-flex align-items-center deltaAngle col ' +
    chosenObj.object.uuid +
    '"><div class="ps-2 pe-1">&Delta;φ: </div><div class="track-jet-values angle_betw_tracks">value</div></div>'
  //	if ($('#angle_betw_tracks')[0]) {
  //		$('.multiple-track-list')[0].removeChild(document.getElementsByClassName('deltaAngle')[0]);
  //	}
  if ($('.track-phi-val').length > 1) {
    $('.multiple-track-list')[0].removeChild(
      document.getElementsByClassName('w-100')[$('.w-100').length - 1],
    )
    $('.multiple-track-list')[0].innerHTML += deltaPhi
    var lastObj = $('.multiple-track-list').find(
      document.getElementsByClassName('colStyle'),
    )[
      $('.multiple-track-list').find(
        document.getElementsByClassName('colStyle'),
      ).length - 1
    ]
    $('.multiple-track-list')[0].innerHTML +=
      '<div class="w-100 ' + lastObj.className.split(' ')[0] + '"></div>'
    let phi1 = parseFloat(
      $('.track-phi-val')[$('.track-phi-val').length - 1].innerHTML,
    )
    let phi2 = parseFloat(
      $('.track-phi-val')[$('.track-phi-val').length - 2].innerHTML,
    )
    let phiSubstr = Math.abs(phi1 - phi2).toFixed()
    $('.angle_betw_tracks')[$('.angle_betw_tracks').length - 1].innerHTML =
      phiSubstr > 180 ? 360 - phiSubstr : phiSubstr
  }
}
// ramdenime track-is infos listshi motavseba
function writeTrackInfoInList(chosenObj) {
  var childObj =
    '<div class="d-flex align-items-center colStyle col ' +
    chosenObj.object.uuid +
    ' "><div class="ps-2 pe-1">Object: </div><div class="track-jet-values">Track</div></div><div class="' +
    chosenObj.object.uuid +
    ' colStyle col d-flex align-items-center"><div class="ps-2 pe-1">φ: </div><div class="track-jet-values track-phi-val">value</div></div><div class="colStyle col d-flex ' +
    chosenObj.object.uuid +
    ' align-items-center"><div class="ps-2 pe-1">η: </div><div class="track-jet-values track-eta-val">value</div></div><div class="colStyle col d-flex ' +
    chosenObj.object.uuid +
    ' align-items-center"><div class="ps-2 pe-1">pT: </div><div class="track-jet-values track-pt-val">value</div></div><div class="colStyle col d-flex ' +
    chosenObj.object.uuid +
    ' align-items-center"><div class="ps-2 pe-1">θ: </div><div class="track-jet-values track-theta-val">value</div></div><div class="colStyle col d-flex ' +
    chosenObj.object.uuid +
    ' colStyle col d-flex align-items-center"><div class="ps-2 pe-1">Charge: </div><div class="track-jet-values track-charge-val">value</div></div><div class="w-100 ' +
    chosenObj.object.uuid +
    '"></div>'
  $('.multiple-track-list')[0].innerHTML += childObj
  $('.track-phi-val')[$('.track-phi-val').length - 1].innerHTML = $(
    '#track-phi-val',
  )[0].innerHTML
  $('.track-eta-val')[$('.track-phi-val').length - 1].innerHTML = $(
    '#track-eta-val',
  )[0].innerHTML
  $('.track-theta-val')[$('.track-phi-val').length - 1].innerHTML = $(
    '#track-theta-val',
  )[0].innerHTML
  $('.track-pt-val')[$('.track-phi-val').length - 1].innerHTML = $(
    '#track-pt-val',
  )[0].innerHTML
  $('.track-charge-val')[$('.track-phi-val').length - 1].innerHTML = $(
    '#track-charge-val',
  )[0].innerHTML
}
// track-ebis infos list-dan ertertis amoshla meored monishvnisas
function removeTrackFromList(chosenObj) {
  //.indexOf($('.multiple-track-list')[0].querySelectorAll('.deltaAngle.'+chosenObj.object.uuid))
  var index = Array.prototype.slice
    .call($('.multiple-track-list')[0].querySelectorAll('.deltaAngle'))
    .indexOf(
      $('.multiple-track-list')[0].getElementsByClassName(
        'deltaAngle ' + chosenObj.object.uuid,
      )[0],
    )

  while (
    $('.multiple-track-list').find(
      document.getElementsByClassName(chosenObj.object.uuid),
    ).length
  ) {
    $('.multiple-track-list')[0].removeChild(
      document.getElementsByClassName(chosenObj.object.uuid)[0],
    )
  }
  try {
    if ($('.track-phi-val').length == $('.deltaAngle').length)
      $('.multiple-track-list')[0].removeChild(
        document.getElementsByClassName('deltaAngle')[0],
      )
    else if (index < $('.deltaAngle').length)
      $('.angle_betw_tracks')[index].innerHTML = Math.abs(
        parseFloat($('.track-phi-val')[index + 1].innerHTML) -
          parseFloat($('.track-phi-val')[index].innerHTML),
      ).toFixed(3)
  } catch {}
}
function addAngleBetweenTracks() {
  if ($('.multiple-track-list')[0]) return
}

$('#electron-check,#muon-check').on('click', function () {
  switch (
    Number($('#electron-check')[0].checked) +
    Number($('#muon-check')[0].checked)
  ) {
    case 0:
      for (var i = 0; i < scene.getObjectByName('TRACK').children.length; i++)
        for (
          var j = 0;
          j < scene.getObjectByName('TRACK').children[i].children.length;
          j++
        )
          scene.getObjectByName('TRACK').children[i].children[j].visible = true
      EVENT.allTrackFilter()
      break
    case 1:
      var objColor = $('#electron-check')[0].checked ? electronColor : muonColor
      for (var i = 0; i < scene.getObjectByName('TRACK').children.length; i++)
        for (
          var j = 0;
          j < scene.getObjectByName('TRACK').children[i].children.length;
          j++
        )
          if (
            scene.getObjectByName('TRACK').children[i].TRACK.trackColor[j]
              .original !== objColor
          )
            scene.getObjectByName('TRACK').children[i].children[
              j
            ].visible = false
          else
            scene.getObjectByName('TRACK').children[i].children[
              j
            ].visible = true
      EVENT.allTrackFilter()
      break

    case 2:
      for (var i = 0; i < scene.getObjectByName('TRACK').children.length; i++)
        for (
          var j = 0;
          j < scene.getObjectByName('TRACK').children[i].children.length;
          j++
        )
          if (
            scene.getObjectByName('TRACK').children[i].TRACK.trackColor[j]
              .original !== electronColor &&
            scene.getObjectByName('TRACK').children[i].TRACK.trackColor[j]
              .original !== muonColor
          )
            scene.getObjectByName('TRACK').children[i].children[
              j
            ].visible = false
          else
            scene.getObjectByName('TRACK').children[i].children[
              j
            ].visible = true
      EVENT.allTrackFilter()
      break
  }
})
// track algoritmebis checkbox
$('#trackAlgos').on('click', '.trackAlg', function () {
  resetColors()
  scene.getObjectByName('EGO').getObjectByName('TRACK').children[
    this.getAttribute('index')
  ].visible = this.checked
  eventFilterBySGK.TRACK[EVENT.XMLURL][
    this.getAttribute('index')
  ] = this.checked
  if ($('.trackAlg:checked').length == 0) $('#track-btn')[0].checked = false
  else $('#track-btn')[0].checked = true
})
// jet algoritmebis checkbox
// $("#jetAlgos").on("click", ".jetAlg", function () {
//   //EVENT.init('Jet', undefined, undefined, undefined, undefined, $(this).attr('id'));
//   resetColors();
//   scene.getObjectByName("EGO").getObjectByName("JET").children[
//     this.getAttribute("index")
//   ].visible = this.checked; //shesabamisi Jet-is xilvadobis shecvla checkbox-ze dacherisas
//   eventFilterBySGK.JET[EVENT.XMLURL][this.getAttribute("index")] = this.checked;
//   if ($(".jetAlg:checked").length == 0) $("#jet-btn")[0].checked = false;
//   else $("#jet-btn")[0].checked = true;
// });

function initJSON() {
  $('#archive').val(event.eventArchive)
  $('#XMLFiles').val(event.eventArchive)
  EVENT.initExtras(2, event.eventArchive, event.eventID) //track-ebis
}
// ctrl-s dacherisas ramdenime track-is monishvnis gaaqtiureba
document.onkeydown = function (e) {
  if (e.keyCode == 17) ctrlPressed = true
}
// ramdenime track-is monishvnis gauqmeba
document.onkeyup = function (e) {
  if (e.keyCode == 17) ctrlPressed = false
}

