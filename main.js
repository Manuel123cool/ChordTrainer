// This approach to importing classes works in CJS contexts (i.e., a regular <script src="..."> tag).
const { Stave, StaveNote, Beam, Formatter, Renderer, SymbolModifiers, ChordSymbol} = Vex;

// Create an SVG renderer and attach it to the DIV element with id="output".
const div = document.getElementById("output");
const renderer = new Renderer(div, Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(900, 180);
const context = renderer.getContext();

// Measure 1
const staveMeasure1 = new Stave(10, 0, 420);
staveMeasure1.addClef("treble").addKeySignature(keySig[0]).setContext(context).draw();

const chord1 = returnNote(0)
const chord2 = returnNote(1)
const chord3 = returnNote(2)
const chord4 = returnNote(3)

const notesMeasure1 = [new StaveNote({ keys: [notes[0]], duration: "q" }).addModifier(chord1), new StaveNote({ keys: [notes[1]], duration: "q" }).addModifier(chord2), new StaveNote({ keys: [notes[2]], duration: "q" }).addModifier(chord3), new StaveNote({ keys: [notes[3]], duration: "q" }).addModifier(chord4)];

// Helper function to justify and draw a 4/4 voice
Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);


// Measure 2
const staveMeasure2 = new Stave(staveMeasure1.width + staveMeasure1.x, 0, 400);
staveMeasure2.addKeySignature(keySig[1]).setContext(context).draw();

const chord1A = returnNote(4)
const chord2A = returnNote(5)
const chord3A = returnNote(6)
const chord4A = returnNote(7)

const notesMeasure2 = [new StaveNote({ keys: [notes[4]], duration: "q" }).addModifier(chord1A), new StaveNote({ keys: [notes[5]], duration: "q" }).addModifier(chord2A), new StaveNote({ keys: [notes[6]], duration: "q" }).addModifier(chord3A), new StaveNote({ keys: [notes[7]], duration: "q" }).addModifier(chord4A)];

staveMeasure2.setContext(context).draw();
Formatter.FormatAndDraw(context, staveMeasure2, notesMeasure2);


function returnNote(index) {
  switch (chordsType[index]) {
    case " ":
      return new ChordSymbol().setFontSize(20).addGlyphOrText(enharmonic(chords[index])).addGlyphOrText("7", { symbolModifier: SymbolModifiers.SUPERSCRIPT });
    case "minor":
      return new ChordSymbol().setFontSize(20).addGlyphOrText(enharmonic(chords[index])).addGlyph(chordsType[index]).addGlyphOrText("7", { symbolModifier: SymbolModifiers.SUPERSCRIPT });
      break;
    default:
      return new ChordSymbol().setFontSize(20).addGlyphOrText(enharmonic(chords[index])).addGlyph(chordsType[index], { symbolModifier: SymbolModifiers.SUPERSCRIPT });
  }
}

const button1 = document.getElementById("next");

button1.addEventListener("click", (event) => {
  const firstKey = genRanVoicingRef(0, -1);

  genRanVoicingRef(1, firstKey);
  genRanVoicingRef(2, firstKey);
  genRanVoicingRef(3, firstKey);

  const secondKey = genRanVoicingRef(4, -1);
  genRanVoicingRef(5, secondKey);
  genRanVoicingRef(6, secondKey);
  genRanVoicingRef(7, secondKey);

  keySig = [firstKey, secondKey]
  // Helper function to justify and draw a 4/4 voice
  // Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);
  div.innerHTML = "";

  const divN = document.getElementById("output");
  const rendererN = new Renderer(div, Renderer.Backends.SVG);

  // Configure the rendering context.
  rendererN.resize(900, 140);
  const contextN = rendererN.getContext();

  // Measure 1
  const staveMeasure1N = new Stave(10, 10, 400);
  staveMeasure1N.addClef("treble").addKeySignature(keySig[0]).setContext(contextN).draw();

  const chord1N = returnNote(0)
  const chord2N = returnNote(1)
  const chord3N = returnNote(2)
  const chord4N = returnNote(3)

  const notesMeasure1N = [new StaveNote({ keys: [notes[0]], duration: "q" }).addModifier(chord1N), new StaveNote({ keys: [notes[1]], duration: "q" }).addModifier(chord2N), new StaveNote({ keys: [notes[2]], duration: "q" }).addModifier(chord3N), new StaveNote({ keys: [notes[3]], duration: "q" }).addModifier(chord4N)];

  // Helper function to justify and draw a 4/4 voice
  Formatter.FormatAndDraw(contextN, staveMeasure1N, notesMeasure1N);


  //Measure 2
  const staveMeasure2N = new Stave(staveMeasure1N.width + staveMeasure1N.x, 10, 400);
  staveMeasure2N.addKeySignature(keySig[1]).setContext(contextN).draw();

  const chord1AN = returnNote(4)
  const chord2AN = returnNote(5)
  const chord3AN = returnNote(6)
  const chord4AN = returnNote(7)

  const notesMeasure2N = [new StaveNote({ keys: [notes[4]], duration: "q" }).addModifier(chord1AN), new StaveNote({ keys: [notes[5]], duration: "q" }).addModifier(chord2AN), new StaveNote({ keys: [notes[6]], duration: "q" }).addModifier(chord3AN), new StaveNote({ keys: [notes[7]], duration: "q" }).addModifier(chord4AN)];

  staveMeasure2N.setContext(contextN).draw();
  Formatter.FormatAndDraw(contextN, staveMeasure2N, notesMeasure2N);
});

function enharmonic(baseNote) {
    let ranInt = Math.floor(Math.random() * 2);
    if (ranInt == 0) {
    switch (baseNote) {
      case "A#":
        return "Bb";
      case "G#":
        return "Ab";
      case "F#":
        return "Gb";
      case "D#":
        return "Eb";
      case "C#":
        return "Db";

      default:
        return baseNote;
    }
    } else {
	return baseNote;
    }
}
