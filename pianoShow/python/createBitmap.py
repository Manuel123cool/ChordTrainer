#!/usr/bin/env python
from PIL import Image, ImageDraw
import json



def drawOctave(whichOtave, notes, draw): 

    blackNotesPlayed = []
    whiteNotesPlayed = []

    whiteNotesVar = (0, 2, 4, 5, 7, 9, 11)
    blackNotesVar = (1, 3, 6, 8, 10)

    for element in notes:
        for index, element2 in enumerate(whiteNotesVar):
            if element == element2:
                whiteNotesPlayed.append(index)
            
        for index, element2 in enumerate(blackNotesVar):
            if element == element2:
                blackNotesPlayed.append(index)
        
    standardPro = 6
    plusWidth = standardPro * 2
    class StartPos:
        x = 10  + (whichOtave * 7) * standardPro * 1.6 + ((whichOtave * 7) * plusWidth)
        y = 50
    startPos = StartPos()

    class React:
        def __init__(self, x, y):
            self.x = x
            self.y = y

    whiteNotes = []

    for i in range(7):
        whiteNotes.append(React(startPos.x  + i * standardPro * 1.6 + (i * plusWidth), startPos.y))

    def drawWhiteNotes():
        for i in range(len(whiteNotes)):
            base = standardPro * 1.6
            height = base * 6.3

            usedColor = (255, 255, 255)

            for elem in whiteNotesPlayed:
                if i == elem:
                    usedColor = (0, 0, 255)

            draw.rectangle((whiteNotes[i].x, whiteNotes[i].y, whiteNotes[i].x + base + plusWidth, whiteNotes[i].y + height), fill=usedColor, outline=(0, 0, 0))

    drawWhiteNotes()

    blackNotes = []

    for i in range(6):
        if i == 2:
            continue
        blackNotes.append( React((startPos.x + (standardPro * 1.6 - standardPro + plusWidth / 2) + standardPro / 2) + standardPro * 1.6 * i + (i * plusWidth), startPos.y) )

    def drawBlackNote():
        for i in range(len(blackNotes)):
            base = standardPro
            height = base * 7.4

            usedColor = (0, 0, 0)

            for elem in blackNotesPlayed:
                if i == elem:
                    usedColor = (0, 0, 255)

            draw.rectangle((blackNotes[i].x, blackNotes[i].y, blackNotes[i].x + base + plusWidth, blackNotes[i].y + height), fill=usedColor, outline=(0, 0, 0))

    drawBlackNote()



def reSeperatedNotes(notes):
    notesSeperated = []
    overallCount = 0
    indexCount = 0

    octaveCount = 4 

    for i in range(octaveCount):
        notesSeperated.append([])
        for j in range(12):
            if indexCount > len(notes) - 1:
                continue

            note = notes[indexCount]

            if note == j and (note + (i * 12) < (i + 1) * 12): 
                notesSeperated[i].append(note)
                indexCount += 1

            if note * -1 == j and ((note * -1) + (i * 12) < (i + 1) * 12): 
                indexCount += 1

    return notesSeperated


f = open('../data/data.txt')
data = json.load(f)
dataTxt = data['chordNames']
headerTxt = data['header']
data = data['pianos']

def makeToCount(notesString):
    reNotes = []
    for elem in notesString:
        match elem:
            case "c":
                reNotes.append(0)
            case "C":
                reNotes.append(1)
            case "d":
                reNotes.append(2)
            case "D":
                reNotes.append(3)
            case "e":
                reNotes.append(4)
            case "f":
                reNotes.append(5)
            case "F":
                reNotes.append(6)
            case "g":
                reNotes.append(7)
            case "G":
                reNotes.append(8)
            case "a":
                reNotes.append(9)
            case "A":
                reNotes.append(10)
            case "h":
                reNotes.append(11)
            case _:
                if elem and len(elem) > 1 and elem[-2] == "/":
                    if len(makeToCount([elem[-1]])) > 0:
                        reNotes.append(int(makeToCount([elem[-1]])[0]) * -1)

    return reNotes

def createImage(notes, count):
    img = Image.new( 'RGB', (620,170), "white") # Create a new black image
    pixels = img.load() # Create the pixel map
    draw = ImageDraw.Draw(img)

    
    notesSeperated = reSeperatedNotes(makeToCount(notes)) 
    drawOctave(0, notesSeperated[0], draw)
    drawOctave(1, notesSeperated[1], draw)
    drawOctave(2, notesSeperated[2], draw)
    drawOctave(3, notesSeperated[3], draw)

    img.save( "/var/www/html/pianoShow/python/png_s/chord"+ str(count) + ".png")

for count, notes in enumerate(data):
    createImage(notes, count)

from fpdf import FPDF

pdf = FPDF()

pdf.add_page()
pdf.set_auto_page_break(False)

pdf_w = 210
pdf_h = 297

w = pdf_w / 2
h = w / 3.64

countY = 0
pdf_x = 0

pdf.set_font("Arial", "", 17) 
for count, _ in enumerate(data):
    if countY + h > pdf_h and pdf_x == w:
        pdf.text(pdf_w / 2 - 35, 5, headerTxt)
        pdf.add_page()
        pdf_x = 0
        countY = 0

    if countY + h > pdf_h:
        pdf_x = w
        countY = 0  

    pdf.image("/var/www/html/pianoShow/python/png_s/chord" + str(count) + ".png", x = pdf_x, y = countY, w = w, h = h, type = '', link = '')

    pdf.text(pdf_x, countY + h - 3, str(count + 1) + ": " + dataTxt[count])
    countY += h

pdf.text(pdf_w / 2 - 35, 5, headerTxt)

file_path = "/var/www/html/pianoShow/python/pdf/chords.pdf"
pdf.output(file_path, "f")
