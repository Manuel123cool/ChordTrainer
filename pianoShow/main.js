
class Rect {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
}


function drawOctave(whichOtave = 0, notes, ctx) {
    let blackNotesPlayed = [];
    let whiteNotesPlayed = [];


    const whiteNotesVar = [0, 2, 4, 5, 7, 9, 11];
    const blackNotesVar = [1, 3, 6, 8, 10];
    notes.forEach(element => {
        whiteNotesVar.forEach((elem2, index) => {
            if (elem2 === element) {
                whiteNotesPlayed.push(index);
            } 
            
        });

        blackNotesVar.forEach((elem2, index) => {
            if (elem2 === element) {
                blackNotesPlayed.push(index);
            } 
        });
    });
    
    const standardPro = 6
    const plusWidth = standardPro * 2;

    const startPos = {x: 10  + (whichOtave * 7) * standardPro * 1.6 + ((whichOtave * 7) * plusWidth), y: 50};
    
    let whiteNotes = Array();
    
    for (let i = 0; i < 7; i++) {
        whiteNotes.push( new Rect(startPos.x  + i * standardPro * 1.6 + (i * plusWidth), startPos.y) );
    }
    
    function drawWhiteNotes() {
        for (let i = 0; i < whiteNotes.length; i++) {
            const base = standardPro * 1.6;
            const height = base * 6.3;
    
            whiteNotesPlayed.forEach(elem => {
                if (i === elem) {
                    ctx.fillStyle = "blue";
                    ctx.strokeStyle = "black";
                    ctx.fillRect(whiteNotes[i].x, whiteNotes[i].y, base + plusWidth, height);
                }
            });
            
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "black";

            ctx.rect(whiteNotes[i].x, whiteNotes[i].y, base + plusWidth, height);
            ctx.stroke();

        }
    }
    
    let blackNotes = Array();
    
    for (let i = 0; i < 6; i++) {
        if (i === 2) {i += 1;}
        blackNotes.push( new Rect((startPos.x + (standardPro * 1.6 - standardPro + plusWidth / 2) + standardPro / 2) + standardPro * 1.6 * i + (i * plusWidth), startPos.y) );
    }
    
    function drawBlackNote() {
        for (let i = 0; i < blackNotes.length; i++) {
            const base = standardPro;
            const height = base * 7.4;

            let drawed = false 
            blackNotesPlayed.forEach((elem) => {
                if (i === elem) {
                    ctx.fillStyle = "blue";
                    ctx.strokeStyle = "black";
                    ctx.fillRect(blackNotes[i].x, blackNotes[i].y, base + plusWidth, height);
                    drawed = true;
                    
                    ctx.beginPath();
                    ctx.lineWidth = "1";
                    ctx.strokeStyle = "black";

                    ctx.rect(blackNotes[i].x, blackNotes[i].y, base + plusWidth, height);
                    ctx.stroke();
                }
            });
            if (!drawed) {
                ctx.fillStyle = "black";
                ctx.fillRect(blackNotes[i].x, blackNotes[i].y, base + plusWidth, height);
            }
        }
    }
    drawWhiteNotes();
    drawBlackNote();
}



function reSeperatedNotes(notes) {
    let notesSeperated = [];
    let overallCount = 0;
    let indexCount = 0;

    const octaveCount = 4;
    for (let i = 0; i < octaveCount; i++) {
        notesSeperated.push([]);
        for (let j = 0; j < 12; j++) {
            const note = notes[indexCount];
            if (note === j &&  note + (i * 12) < (i + 1) * 12) {
                notesSeperated[i].push(note);
                indexCount += 1;
            }
        }
    }
    return notesSeperated
}




function makeToCount(notesString) {
    let reNotes = [];
    notesString.forEach( elem => {
        switch(elem) {
            case "c":
                reNotes.push(0)
                break;
            case "C":
                reNotes.push(1)
                break;
            case "d":
                reNotes.push(2)
                break;              
            case "D":
                reNotes.push(3)
                break;
            case "e":
                reNotes.push(4)
                break;
            case "f":
                reNotes.push(5)
                break;  
            case "F":
                reNotes.push(6)
                break;
            case "g":
                reNotes.push(7)
                break;
            case "G":
                reNotes.push(8)
                break;  
            case "a":
            reNotes.push(9)
            break;
            case "A":
                reNotes.push(10)
                break;
            case "h":
                reNotes.push(11)
                break;  
          }
    })
    return reNotes;
}

let pianos = [];
let notesStringGlo = [];

var cGlo = document.getElementById("myCanvas");
var ctxGlo = cGlo.getContext("2d");

function redraw(ctx, notesString, id = undefined) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (id !== undefined) {
	    ctx.font = "16px serif";
	    ctx.fillText(String(id), 10, 15);
    }
    const notes = makeToCount(notesString);
    const notesSeperated = reSeperatedNotes(notes);

    drawOctave(0, notesSeperated[0], ctx);
    drawOctave(1, notesSeperated[1], ctx);
    drawOctave(2, notesSeperated[2], ctx);
    drawOctave(3, notesSeperated[3], ctx);
}

function updateTextarea() {
	let chordNames = [];
        pianos.forEach( (elem, index) => {

            let input = document.getElementById("input" + String(index + 1));
            chordNames.push(input.value);
        });

        let headerTxt = document.getElementById("headerName").value;
        let dataSend = JSON.stringify({pianos: pianos, chordNames: chordNames, header: headerTxt});
        let areaElem = document.getElementById("data");
        areaElem.value = dataSend;
}

function keyPressEvent(event) {
    let source = event.target;
    let exclude = ['input', 'textarea'];

    if (exclude.indexOf(source.tagName.toLowerCase()) !== -1) {
         return;
    }
    if (event.key === "q") {
        notesStringGlo = [];
    } else {
        console.log(event.key);
        notesStringGlo.push(event.key);
    }

    redraw(ctxGlo, notesStringGlo);
}


function addPianoCan(notesString) {
    const div = document.getElementById("canvases");
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", String(pianos.length));
    canvas.setAttribute("width", "630");
    canvas.setAttribute("height", "150"); 
    canvas.setAttribute("style", "border:1px solid grey");

    div.appendChild(canvas);

    const inputChord = document.createElement("input");
    inputChord.setAttribute("type", "text");
    inputChord.setAttribute("id", "input" + String(pianos.length));
    div.appendChild(inputChord);
    inputChord.addEventListener("input", updateTextarea);

    var c = document.getElementById(String(pianos.length));
    var ctx = c.getContext("2d");
    
    redraw(ctx, notesString, pianos.length);
}

function insertCan(notesString, n) {
    const idNum = String(Number(n) + 1);
    const div = document.getElementById("canvases");
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", String(idNum));
    canvas.setAttribute("width", "630");
    canvas.setAttribute("height", "150");
    canvas.setAttribute("style", "border:1px solid grey");
	function insertAfter(referenceNode, newNode) {
	    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}
    let ref = document.getElementById(String(n)).nextSibling;
    insertAfter(ref, canvas);

    const inputChord = document.createElement("input");
    inputChord.setAttribute("type", "text");
    inputChord.setAttribute("id", "input" + String(idNum));

    ref = document.getElementById(String(n)).nextSibling.nextSibling;
    insertAfter(ref, inputChord);

    inputChord.addEventListener("input", updateTextarea);

    var c = document.getElementById(String(idNum));
    var ctx = c.getContext("2d");

    redraw(ctx, notesString, idNum);
}


function init() {
    let xmlhttp0 = new XMLHttpRequest();
    xmlhttp0.addEventListener('readystatechange', (e) => {
        if (xmlhttp0.readyState==4 && xmlhttp0.status==200) {
            let responseText = xmlhttp0.responseText;
	    
	    var textarea = document.getElementById("data");
	    textarea.value = responseText;
                console.log(responseText);
            let data = JSON.parse(responseText);
	    data.pianos.forEach( (elem) => {	
		pianos.push(elem);
		addPianoCan(elem);	

	    });
	    var c = document.getElementById("headerName");
	    c.value = data.header;
	    data.chordNames.forEach( (elem, index) => {

	        c = document.getElementById("input" + String(index + 1));
		c.value = elem;
	    });
//                document.getElementById('chordData').value = responseText;
        }
    });
    xmlhttp0.open('GET', "/pianoShow/php/get.php?data=true", true);
    xmlhttp0.send();
}

document.addEventListener("DOMContentLoaded", (event) => {
    init();
    window.addEventListener("keypress", keyPressEvent);

    document.getElementById("headerName").addEventListener("input", updateTextarea);

    document.getElementById("ios").addEventListener("input", (event) => {
	    if (event.target.value.at(-1) == "q") {
		event.target.value = "";
		notesStringGlo = [];
	        redraw(ctxGlo, notesStringGlo);
		return;
	    }
	    notesStringGlo.push(event.target.value.at(-1));
	    redraw(ctxGlo, notesStringGlo);
    });

    document.getElementById("button4").addEventListener("click", (event) => {
	    const number = document.getElementById("number").value;
	    const canvas = document.getElementById("canvases");
	    canvas.removeChild(document.getElementById(String(number)));
	    canvas.removeChild(document.getElementById("input" + String(number)));

	    pianos[Number(number) - 1] = undefined;
	    var filtered = pianos.filter(function(value, index, arr){
        	return value !== undefined;
    	    });
	    pianos = filtered;
	var children = canvas.children;
	for (var i = 0; i < children.length; i++) {
	  var child = children[i];
	    if (i > number * 2 - 3) {
		if (child.nodeName == "CANVAS") {
			child.setAttribute("id", Number(child.id) - 1);
			child.getContext("2d").clearRect(0, 0, 100, 20);
			child.getContext("2d").fillText(String(child.id), 10, 15);
		}else {
			child.setAttribute("id", "input" + String(Number(child.id.replace("input", "")) - 1)) ;
		}
	    }
	}
	    updateTextarea();
    });
	document.getElementById("button3").addEventListener("click", (event) => {
		const number = document.getElementById("number").value;
		pianos.splice(Number(number), 0, notesStringGlo);

		const canvas = document.getElementById("canvases");
		var children = canvas.children;
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
            if (i > number * 2 - 1) {
                if (child.nodeName == "CANVAS") {
                        child.setAttribute("id", Number(child.id) + 1);
			child.getContext("2d").clearRect(0, 0, 100, 20);
			child.getContext("2d").fillText(String(child.id), 10, 15);
                }else {
                        child.setAttribute("id", "input" + String(Number(child.id.replace("input", "")) + 1)) ;
                }
            }
        }
		insertCan(pianos.at(number), number);
	    updateTextarea();
    });
	document.getElementById("button5").addEventListener("click", (event) => {
                const number = document.getElementById("number").value;
		const newPianosCount = pianos.map( piano => {
			return makeToCount(piano).map( elem => {
				const newNum = elem + Number(number);		
				if (newNum > 11) {
					return newNum - 12;
				}
				return newNum;
			});
		});
		
	const newPianos = newPianosCount.map( elem => {
	return elem.map( elem2 => {
        switch(elem2) {
            case 0:
                return "c"; 
                break;
            case 1:
                return "C";
                break;
	    case 2:
		return "d";
                break;              
            case 3:
		return "D";
                break;
            case 4:
		return "e";
                break;
            case 5:
		return "f";
                break;  
            case 6:
		return "F";
                break;
            case 7:
		return "g";
                break;
            case 8:
		return "G";
                break;  
            case 9:
		return "a";
            break;
            case 10:
		return "A";
                break;
            case 11:
		return "h";
                break;  
          }
	});
	}); 
	let currentData = JSON.parse(document.getElementById("data").value);
	currentData.pianos = newPianos;
	document.getElementById("data").value = JSON.stringify(currentData);
    });

    var c = document.getElementById("button1");
    c.addEventListener("click", (event) => {
        pianos.push(notesStringGlo);
        addPianoCan(pianos.at(-1));
	updateTextarea();
    });
    c = document.getElementById("button2");
    c.addEventListener("click", (event) => {
	let chordNames = [];
	pianos.forEach( (elem, index) => {
	    		
	    let input = document.getElementById("input" + String(index + 1));
	    chordNames.push(input.value);
	});
	
	let headerTxt = document.getElementById("headerName").value;
	var xmlhttp0 = new XMLHttpRequest();
        xmlhttp0.addEventListener('readystatechange', (e) => {
            if (xmlhttp0.readyState==4 && xmlhttp0.status==200) {
                var responseText = xmlhttp0.responseText;
                console.log(responseText);
	        window.location.href = "http://167.99.247.120/pianoShow/python/pdf/chords.pdf";
            }
        });
        xmlhttp0.open('POST', "/pianoShow/php/set.php", true);
        xmlhttp0.setRequestHeader("Content-type",
            "application/x-www-form-urlencoded");
	let dataSend = JSON.stringify({pianos: pianos, chordNames: chordNames, header: headerTxt});
	if (document.getElementById("data").value !== "") {
	     dataSend = document.getElementById("data").value;
	}
        xmlhttp0.send("data=" + dataSend);
    });
});
