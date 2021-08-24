

import './style.css'

const myAPI:string = "8d7585614344fcdbb6bcd62c9bf1b7ce"

// Sound file by Sassaby, Creative Commons Lisence 1.0 
// https://freesound.org/people/Sassaby/sounds/533093/
const weakBeat:HTMLMediaElement = new Audio("/src/audio/wood_block_01.wav");
//weakBeat.crossOrigin = 'anonymous';

const strongBeat:HTMLMediaElement = new Audio("/src/audio/wood_block_03.wav");
//strongBeat.crossOrigin = 'anonymous';

let beats:number = 4;

let mentronomeOn:boolean = false;

let tempo:number = 60;

let savedData:any;

const $bpmInput:JQuery = $('#bpm-input')

const $beatInput:JQuery = $('#beat-input')

let lastLoaded:number = 0;

// Displays default blips.
populateBlips();

/////////////////////////////////////
// TEMPO/BPM SECTION
/////////////////////////////////////

// Populates BPM Text on initial load
$("#bpm-output").text(tempo + " BPM");

// Function to increase or decrease BPM used by + and - Buttons.
const changeBPM = (amount:number) => 
  {
    tempo += amount;
    let currentVal:number = +$("#bpm-input").val()!;
    $("#bpm-input").attr("value", currentVal + amount)
    $("#bpm-output").text($bpmInput.val() as string);
    displayBPM();
  }

// Adjusts tempo if slider is changed.
$bpmInput.on('input', function () {
  tempo = +$("#bpm-input").val()!;
  displayBPM();
});

// Display BPM Function
function displayBPM() {
  $("#bpm-output").text(tempo+" BPM");
}

// Functionality to buttons to increase and decrease BPM
$("#bpm-plus").on('click', function(){changeBPM(1)});
$("#bpm-minus").on('click', function(){changeBPM(-1)});


/////////////////////////////////////
// METRONOME SECTION
/////////////////////////////////////

// Turn Metronome On/Off
$("#play-button").on('click', function(){
  mentronomeOn = !mentronomeOn;
  console.log(mentronomeOn);
  if(mentronomeOn){
    playMentronome();
  }
})

function populateBlips(){
  $(".blip-container").empty();

  for (let i = 0; i < beats; i++) {
    $(".blip-container").append('<div class="blip"></div>');
  }
}

function playMentronome(counter=0){
  // tempo = +$("#bpm-input").val()!;
  let tempoMS = 60000/tempo;
  beats = +$("#beat-input").val()!;
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
  console.log("counter = " + counter);
  lightBlip(counter);
  counter += 1;

  //Sets delay of recursion based on tempo.
  setTimeout(
    () => { playMentronome(counter); }, 
    tempoMS);
}

// Lights Blips based on the Beats per Measure.
function lightBlip(count:number){
  console.log("count = " + count);
  console.log("beats = " + beats);
  let blip: number = count%beats;
  let $blips = $(".blip").removeClass("active");
  $blips.eq(blip).addClass("active");
  console.log("blip = " + blip)
  console.log($blips.eq(blip));
}

/////////////////////////////////////
// BEAT ADJUSTMENT SECTION
/////////////////////////////////////

// Populates Beats Output on initial load
$("#beat-output").text(beats);

// Function to change Beat when + and - Buttons are Clicked.
const changeBeat = (amount:number) => 
  {
    beats += amount;
    (beats<1) ? beats = 1 : beats = beats;
    $("#beat-input").attr("value", beats)
    displayBeats();
    populateBlips();
    
  }

// Adjust Beats if Slider is changed.
$beatInput.on('input', function () {
  beats = +$("#beat-input").val()!;
  populateBlips();
  displayBeats();
});

// Display BPM Function
function displayBeats() {
  $("#beat-output").text(beats);
}

// Functionality to buttons to increase and decrease BPM
$("#beat-plus").on('click', function(){changeBeat(1)});
$("#beat-minus").on('click', function(){changeBeat(-1)});

/////////////////////////////////////
// SONG DRAWER SECTION
/////////////////////////////////////

// Open drawer when clicked.
$(".drawer-handle").on('click', function(){
  $(".drawer-content").slideToggle();
  populateDrawer();
  
})

// Close Drawer Function
function closeDrawer(){
  if($('#drawer-content').is(':visible')){
    $('#drawer-content').slideToggle();
    emptyDrawer();

  }
}

// Function to empty song drawer
function emptyDrawer() {
  $(".drawer-content").empty();
}
// Function to clear and populate song drawer.
function populateDrawer()
{
  if(!$('#drawer-content').is(':visible'))
  {
    return;
  }
  emptyDrawer();
  $(".drawer-content").append(`<div class="drawer-title"><h1>Loading...</h1></div>`)

  console.log("BPM input is " + $("#bpm-input").val())
    // API request based on BPM
  $.ajax(`https://api.getsongbpm.com/tempo/?api_key=8d7585614344fcdbb6bcd62c9bf1b7ce&bpm=${+$("#bpm-input").val()!}`).then((data)=>{let testData=JSON.parse(data); 
    savedData = data;
    emptyDrawer();
    $(".drawer-content").append(`<div class="drawer-title"><h1>Songs at ${$("#bpm-input").val()} BPM</h1></div>`)
    $(".drawer-content").append(`<div class="song-slides"></div>`)
    for (let i = 0; i < 4; i++) 
    {
      $(".song-slides").append(
        `<div class="song-slide">`+
        `<h2 class="by-line">${testData.tempo[i]["artist"]["name"]}</h2>`+
        `<h1 class="song-title">${testData.tempo[i]["song_title"]}</h1>`+
        `<img src="${testData.tempo[i]["artist"]["img"]}" alt="" class="song-image">`+
        `<a href = "${testData.tempo[i]["song_uri"]}" target="_blank">View on getSongBPM.com</a>`+
        `</div>`
      )
      
    }

    $(".drawer-content").append(`<button class="more-button" name="more">More Songs</button>`)

  })
}




