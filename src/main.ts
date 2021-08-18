

import './style.css'


// Sound file by Sassaby, Creative Commons Lisence 1.0 
// https://freesound.org/people/Sassaby/sounds/533093/
const weakBeat:HTMLMediaElement = new Audio("/src/audio/wood_block_01.wav");
//weakBeat.crossOrigin = 'anonymous';

const strongBeat:HTMLMediaElement = new Audio("/src/audio/wood_block_03.wav");
//strongBeat.crossOrigin = 'anonymous';

let beats:number = 4;

let mentronomeOn:boolean = false;

let tempo:number = 160;

$("button").on('click', function(){
  mentronomeOn = !mentronomeOn;
  console.log(mentronomeOn);
  if(mentronomeOn){
    playMentronome();
  }
})

function playMentronome(counter=0){
  tempo = +$("#bpm").val()!;
  beats = +$("#beats").val()!;
  // Breakout condition
  if(!mentronomeOn)
  {
    return;
  }

  //Pauses and sets to beginning both sounds
  strongBeat.pause();
  strongBeat.currentTime = 0;
  weakBeat.pause();
  weakBeat.currentTime = 0;

  //Sets weak and strong beat based on meter variable.
  if(counter%beats === 0)
  {
    strongBeat.play();
  }
  else
  {
    weakBeat.play();
  }
  counter += 1;

  //Sets delay of recursion based on tempo.
  setTimeout(() => { playMentronome(counter); }, 60000/tempo);}
