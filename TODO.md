# Todo

## URGEGENT

### Direction to clean up the piano component state

- [x] I want the piano component to be reusable, so everything neccesary for piano inside that component / folder

- [x] remove context, have all state be managed in the main ./src/components/Piano/Piano.tsx

- I want the piano settings to be build in like they are, like a midi keyboard

- add sound to piano

- add velocity dial to piano

- once that is cleaned up try to figure out how to add an ai that will help generate midi

- be able to upload midi files and the piano plays

-

#### rest of urgent

- [ ] be able to drag the piano wider from the corner or edge

- [x] might switch back to piano context XD

- [ ] update pianocontroller styles

- - either shadcn or custom style, think of simple style like apple or openai

- [ ] add sounds to corrresponding keys / chords

- - use tunejs or tunepiano ( tunepiano prob easier )

- - - with tunejs you would learn more about the web audio API ( do this if tunepiano is annoying or broken )

## Reasoning for piano context

- moving the menu to a dropdown menu as of now

- want to keep keyboard as reusable as possible, eventually a standalone component downloadable via npm

- want to make the piano look like a midi keyboard (as realistic as possible) so have the piano controls as panels on the upper part of the keyboard.

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
