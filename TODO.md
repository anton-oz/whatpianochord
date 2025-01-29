# Todo

## CURRENT

### 1/7/25

      [ ] have piano off button clear all selected keys

      [ ] update piano rendering

            - instead of rendering individual 12 key arrays based on octave, create an array with all the keys being currently rendered.

            - this will help with bugs when rendering extended chords that cross multiple octaves

            - ^ e.g. from [12 keys], [12 keys] to [24 keys] ( for 2 octaves rendered )

      [x] Inversion shows 'root' when at 0

      [ ] new chords addeded all render properly

      [ ] get sound when you press piano keys

      [ ] start with salamander grand piano

      [ ] for note velocity just have a knob to start

      [ ] be able to upload midi file and the piano plays the file back

      [ ] add tunejs or web audio API

#### BACKLOG

      [ ] add tests for piano

      [ ] add more sounds to keyboard

            [ ] add electric piano

            [ ] synths

      [ ] dark / light mode

      [ ] store settings in a cookie and have the initial state be the last selected input

      [ ] add extended chords

      [ ] able to set custom number of octaves

      [ ] if the piano is showing one octave, render the keyboard
      with the selected note as the first note and render the 12 keys
      from that note.

## make key dimensions better

## add a sound editor

- [ ] be able to edit to the attack, decay, release, and sustain

- [ ] add glissando option

## consolidate css

- [ ] consolidate button toggle on and off tailwind styling in the tailwind.config.js file so resused classes dont need to be lengthly rewritten each time

# FAR FUTURE

- [ ] see about a midi generation tool, or a button that makes the piano play itself

- [ ] PWA functionality ( cache the app so available offline )

- [ ] can record / save chord progressions and it will auto play back, can output midi files or score

- [ ] upload midi files and it will play them

- [ ] midi keyboard can interface

# unknown / bugs

- [ ] when you click note all the notes rerender, causes a small shake kind of look when clicking keys on piano
