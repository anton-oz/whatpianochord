# Todo

## URGEGENT

- [ ] update pianocontroller styles

- - either shadcn or custom style, think of simple style like apple or openai

- [ ] add sounds to corrresponding keys / chords

- - use tunejs or tunepiano ( tunepiano prob easier )

- - - with tunejs you would learn more about the web audio API ( do this if tunepiano is annoying or broken )

#### dark / light mode

#### more chord building tools for user

- [ ] store settings in a cookie and have the initial state be the last selected input

- [ ] add extended chords

- [x] able to set custom number of octaves

- [ ] have chord inversions

- [ ] if the piano is showing one octave, render the keyboard
      with the selected note as the first note and render the 12 keys
      from that note.

## make key dimensions better

#### real world size for ratio

- white key width = 2.2cm

- black key width = 0.9cm

- 12 keys width = 16.3 cm

- black keys width (c# to a#) = 13.3cm

- gap between keys

## make keys look slightly more realistic

- [ ] eventually want it to look as realistic as possible

- - [ ] keys should look somewhat 3d, almost looking at the keys sideways kind of deal

- [ ] have action on piano be delayed

- [ ] add the current current to to actual size indicator, along with a slider to change the size of keys

## add a sound editor

- [ ] be able to edit to the attack, decay, release, and sustain

- [ ] add glissando option

## consolidate css

- [ ] consolidate button toggle on and off tailwind styling in the tailwind.config.js file so resused classes dont need to be lengthly rewritten each time

# FAR FUTURE

- [ ] PWA functionality ( cache the app so available offline )

- [ ] can record / save chord progressions and it will auto play back, can output midi files or score

- [ ] upload midi files and it will play them

- [ ] midi keyboard can interface

# unknown / bugs

- [ ] when you click note all the notes rerender, causes a small shake kind of look when clicking keys on piano
