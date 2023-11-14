//Data for visueles
let chords = ["Bb", "Bb", "Bb", "Bb", "Bb", "Bb", "Bb", "Bb"];
let notes = ["c/4", "c/4", "c/4", "c/4", "c/4", "c/4", "c/4", "c/4"];
let chordsType = ["dim", "dim", "dim", "dim","dim", "dim", "dim", "dim"];
let keySig = ['F', 'D']

//ChordDate
var chordsData = [];

class ChordData {
  constructor(chordsType, degree, whichBaseNote) {
    this.chordsType = chordsType;
    this.degree = degree;
    this.whichBaseNote = whichBaseNote;
  }
}

function createChordsNode(chordData) {
  const para = document.createElement("p");
  const node = document.createTextNode(
    chordData.chordsType + " " + chordData.degree + " " + chordData.whichBaseNote.toString());

  para.appendChild(node);

  const element = document.getElementById("chords");
  element.appendChild(para);
}

function createChordNodes() {
    chordsData.forEach((c) => {
	    createChordsNode(c);
  });
}

function changeChordsNode(chordData) {
    let count = 0;
    chordsData.forEach((c) => {
      if (c.chordsType == chordData.chordsType && c.degree == chordData.degree) {
        document.querySelector("#chords p:nth-child(" + (count + 1) + ")").innerHTML =
          chordData.chordsType + " " + chordData.degree + " " + chordData.whichBaseNote.toString();

          //console.log(document.querySelector("#chords p:nth-child(" + (count + 1) + ")"))
      }
      count++;
    });
}

const button = document.getElementById("addChord");

button.addEventListener("click", (event) => {
  var chordType = document.getElementById("chordType").value;
  var degree = document.getElementById("degree").value;
  var whichBaseNote = document.getElementById("whichBaseNote").value;

  let count = 0, doNotPush = false;
  chordsData.forEach((c) => {
    if (c.chordsType == chordType && c.degree == degree) {
      chordsData[count].whichBaseNote.push(whichBaseNote)
      changeChordsNode(c);

      doNotPush = true;
      document.getElementById('chordData').value = JSON.stringify(chordsData);
      return;
    }
    count++;
  });
  if (!doNotPush) {
    let chordData = new ChordData(chordType, degree, [whichBaseNote])
    chordsData.push(chordData);
    createChordsNode(chordData);
    //console.log(chordsData)
  }
  updateData();
  document.getElementById('chordData').value = JSON.stringify(chordsData);
});


function genKeyNotes(key) {

  const allNotes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"
  ];
  const pattern = [2, 2, 1, 2, 2, 2];

  let returnArray = [];

  let count = 0;
  let startIndex = 0;

  allNotes.forEach((note) => {
    if (note == key) {
      startIndex = count;
    }
    count++;
  });

  returnArray.push(allNotes[startIndex]);

  let index = startIndex;
  for (let i = 0; i < pattern.length; i++) {
    if (index + pattern[i] >= allNotes.length) {
      index = (index + pattern[i]) - allNotes.length;
    } else {
      index += pattern[i];
    }

    returnArray.push(allNotes[index]);
  }
  return returnArray
}

function testIfNoteIsInKey(noteInput, key) {
  const keyNotes = genKeyNotes(key);
  //console.log(keyNotes);

  let reTrue = false
  keyNotes.forEach((note) => {
    if (note == noteInput) {
      reTrue = true
    }
  });

  return reTrue
}

function genMelodyNote(chordType, degree, startNote) {
  const allNotes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"
  ];

  let startNoteNum = allNotes.indexOf(startNote);
  let degreeNum = -1;

  if (chordType == "majorSeventh") {
    switch (degree) {
      case "1":
        degreeNum = 0;
        break;
      case "3":
        degreeNum = 4;
        break;
      case "5":
        degreeNum = 7;
        break;
      case "7":
        degreeNum = 11;
        break;
      case "9":
        degreeNum = 14;
        break;
      case "#11":
        degreeNum = 18;
        break;
      case "13":
        degreeNum = 21;
        break;
      default:
    }
  }

  if (chordType == " ") {
    switch (degree) {
      case "1":
        degreeNum = 0;
        break;
      case "3":
        degreeNum = 4;
        break;
      case "5":
        degreeNum = 7;
        break;
      case "7":
        degreeNum = 10;
        break;
      case "9":
        degreeNum = 14;
        break;
      case "#11":
        degreeNum = 18;
        break;
      case "13":
        degreeNum = 21;
        break;
      case "b9":
        degreeNum = 13;
        break;
      case "#9":
        degreeNum = 15;
        break;
      case "b13":
        degreeNum = 20;
        break;
      default:
    }
  }

  if (chordType == "minor") {
    switch (degree) {
      case "1":
        degreeNum = 0;
        break;
      case "3":
        degreeNum = 3;
        break;
      case "5":
        degreeNum = 7;
        break;
      case "7":
        degreeNum = 10;
        break;
      case "9":
        degreeNum = 14;
        break;
      case "11":
        degreeNum = 17;
        break;
      case "13":
        degreeNum = 21;
        break;
      default:
    }
  }

  if (chordType == "halfDiminished") {
    switch (degree) {
      case "1":
        degreeNum = 0;
        break;
      case "3":
        degreeNum = 3;
        break;
      case "5":
        degreeNum = 6;
        break;
      case "7":
        degreeNum = 10;
        break;
      case "9":
        degreeNum = 14;
        break;
      case "11":
        degreeNum = 17;
        break;
      case "b13":
        degreeNum = 20;
        break;
      default:
    }
  }

  degreeNum += startNoteNum;
  for (let i = startNoteNum; i < 3 * allNotes.length; i++) {
    if (i == degreeNum) {
      if (i >= allNotes.length) {
        return allNotes[i % allNotes.length];
      }
      return allNotes[i];
    }
  }
}

function convertKeyToNote(key) {
  switch (key) {
    case "Bb":
      return "A#";
    case "Eb":
      return "D#";
    case "Ab":
      return "G#";
    case "Db":
      return "C#";
    case "Gb":
      return "F#";
    case "Cb":
      return "B";

    default:
      return key;
  }
}

function makeToNoteFromScale(note, key) {
  // const allNotes = [
  //   "C",
  //   "C#",
  //   "D",
  //   "D#",
  //   "E",
  //   "F",
  //   "F#",
  //   "G",
  //   "G#",
  //   "A",
  //   "A#",
  //   "B"
  // ];

  if (!key.includes("b")) {
      return note.replace("#", "")
  } else {
    switch (note) {
      case "A#":
        return "B";
      case "G#":
        return "A";
      case "F#":
        return "G";
      case "D#":
        return "E";
      case "C#":
        return "D";

      default:
        return note;
    }
  }
  return note
}

function genRanKeySig() {
  const allNotes = [
    "C",
    "F",
    "Bb",
    "Eb",
    "Ab",
    "Db",
    "Gb",
    "Cb",
    "G",
    "D",
    "A",
    "E",
    "B",
    'F#',
    'C#',
  ]
  return allNotes[Math.floor(Math.random() * allNotes.length)];
}

// let chords = ["Bb", "Bb", "Bb", "Bb", "Bb", "Bb", "Bb", "Bb"];
// let notes = ["c/4", "c/4", "c/4", "c/4", "c/4", "c/4", "c/4", "c/4"];
// let chordsType = ["dim", "dim", "dim", "dim","dim", "dim", "dim", "dim"];
// let keySig = ['F', 'D']

function genRanVoicingRef(index, firstKey) {
  const wasMinuesOne = firstKey == -1 ? true : false;
  while (true) {
    let firstObj = chordsData[Math.floor(Math.random() * chordsData.length)];
    if (wasMinuesOne) {
      firstKey = genRanKeySig();
    }
    let firstBaseNote = firstObj.whichBaseNote[Math.floor(Math.random() * firstObj.whichBaseNote.length)];

    if (testIfNoteIsInKey(genMelodyNote(firstObj.chordsType, firstObj.degree, firstBaseNote), convertKeyToNote(firstKey))) {
      chords[index] = firstBaseNote;
      notes[index] = makeToNoteFromScale(genMelodyNote(firstObj.chordsType, firstObj.degree, firstBaseNote), firstKey) + "/4";
      chordsType[index] = firstObj.chordsType
      break
    }
  }
  return firstKey
}


function init() {
    let xmlhttp0 = new XMLHttpRequest();
    xmlhttp0.addEventListener('readystatechange', (e) => {
        if (xmlhttp0.readyState==4 && xmlhttp0.status==200) {
            let responseText = xmlhttp0.responseText;
		console.log(responseText);
	    chordsData = JSON.parse(responseText);
		createChordNodes();

		document.getElementById('chordData').value = responseText;
        }
    });
    xmlhttp0.open('GET', "php/get.php?data=true", true);
    xmlhttp0.send();
}

document.addEventListener("DOMContentLoaded", init);

function updateData() {
        var xmlhttp0 = new XMLHttpRequest();
        xmlhttp0.addEventListener('readystatechange', (e) => {
            if (xmlhttp0.readyState==4 && xmlhttp0.status==200) {
                var responseText = xmlhttp0.responseText;
		console.log(responseText);	
            }
        });
        xmlhttp0.open('POST', "php/set.php", true);
        xmlhttp0.setRequestHeader("Content-type",
            "application/x-www-form-urlencoded");
	console.log(JSON.stringify(chordsData));
        xmlhttp0.send("data=" + JSON.stringify(chordsData));
    }


const button2 = document.getElementById("serverData");

button2.addEventListener("click", (event) => {
	var xmlhttp0 = new XMLHttpRequest();
        xmlhttp0.addEventListener('readystatechange', (e) => {
            if (xmlhttp0.readyState==4 && xmlhttp0.status==200) {
                var responseText = xmlhttp0.responseText;
                console.log(responseText);
            }
        });
        xmlhttp0.open('POST', "php/set.php", true);
        xmlhttp0.setRequestHeader("Content-type",
            "application/x-www-form-urlencoded");
        xmlhttp0.send("data=" + document.getElementById('chordData').value);
    });


