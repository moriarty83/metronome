// Basic Metronome Settings Variables with Default Values
let tempo:number = 60;
let beats:number = 4;
  // NOTE: Meter is actually raising 2 to the power of meter to get the output value.
let meter:number = 2;

// Audio FIles
// Sound file by Sassaby, Creative Commons Lisence 1.0 - Edited by Christopher Moriarty 
// https://freesound.org/people/Sassaby/sounds/533093/
const weakBeat:HTMLMediaElement = new Audio("https://raw.githubusercontent.com/moriarty83/metronome/master/src/audio/wood_block_01.wav");
const strongBeat:HTMLMediaElement = new Audio("https://raw.githubusercontent.com/moriarty83/metronome/master/src/audio/wood_block_03.wav");


let mentronomeOn:boolean = false;


// Data from API Request
let savedData:any;

// Variables of inputs for Metronome Settings
const $bpmInput:JQuery = $('#bpm-input');

const $beatInput:JQuery = $('#beat-input');

const $meterInput:JQuery = $("#meter-input");

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
    // Amount is passed as either +1 or -1 from the buttons.
    tempo += amount;

    // Adjust slider value.
    $("#bpm-input").val(tempo)

    // Update UI
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
  if(drawerOpen){
    toggleDrawer();
  }
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

// Populates lights/blips based on beat count.
function populateBlips(){
  $(".blip-container").empty();

  for (let i = 0; i < beats; i++) {
    $(".blip-container").append('<div class="blip"></div>');
  }
}

function playMentronome(counter=0){




  // Breakout condition
  if(!mentronomeOn)
  {
    return;
  }

  let timestamp:number = (new Date()).getTime();
  let now = (new Date()).getTime();

  // Converts tempo to MS for timeout function below.
  let tempoMS = 60000/tempo;
  beats = +$("#beat-input").val()!;

  if(now-timestamp >= tempoMS){
  //Pauses and sets to beginning both sounds so they don't try to play over each other.
  strongBeat.pause();
  strongBeat.currentTime = 0;
  weakBeat.pause();
  weakBeat.currentTime = 0;
  
  //Decides which sound to play based on meter variable.
  if(counter%beats === 0)
  {
    strongBeat.play();
  }
  else
  {
    weakBeat.play();
  }

  // Lights up correct blip
  lightBlip(counter);
  counter += 1;
  }
  //Sets timeout of recursion based on tempo.
  setTimeout(
    () => { playMentronome(counter); }, 
    10);
}


// Lights Blips based on the Beats per Measure.
function lightBlip(count:number){
  // Identifies correct blip.
  let blip: number = count%beats;

  // Turns all blips lights off.
  let $blips = $(".blip").removeClass("active");

  // Lights active blip.
  $blips.eq(blip).addClass("active");
}

/////////////////////////////////////
// BEAT ADJUSTMENT SECTION
/////////////////////////////////////

// Populates Beats Output on initial load
$("#beat-output").text(beats);

// Function to change Beat when + and - Buttons are Clicked.
const changeBeat = (amount:number) => 
  {
    // Amount is either +1 or -1.
    beats += amount;
    (beats<1) ? beats = 1 : beats = beats;
    (beats>16) ? beats = 16 : beats = beats;
    $("#beat-input").val(beats)
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
// METER ADJUSTMENT SECTION
/////////////////////////////////////
// Populates Meter Output on initial load
$("#meter-output").text(2**meter);

// Function to change Meter when + and - Buttons are Clicked.
const changeMeter = (amount:number) => 
  {
    // Amount is either +1 or -1.
    meter += amount;
    (meter<0) ? meter = 0 : meter = meter;
    (meter>3) ? meter = 3 : meter = meter;
    $("#meter-input").val(meter)
    displayMeter();
  }

// Adjust Meter if Slider is changed.
$meterInput.on('input', function () {
  meter = +$("#meter-input").val()!;
  displayMeter();
});

// Display Meter Function
function displayMeter() {
  console.log(meter);
  $("#meter-output").text(2**meter);
}

// Functionality to buttons to increase and decrease Meter
$("#meter-plus").on('click', function(){changeMeter(1)});
$("#meter-minus").on('click', function(){changeMeter(-1)});

/////////////////////////////////////
// SONG DRAWER SECTION
/////////////////////////////////////
// Boolean to determine if drawer is open or closed
let drawerOpen:boolean = false;

// Number to track which/how many songs have been displayed.
let songsDisplayed:number = 0;


// Open drawer when handle is clicked.
$(".drawer-handle").on('click', function(){
  
  toggleDrawer();

  if(drawerOpen){
    // Updates handle text
    $("#handle-text").text("Hide")
  }
})

// Open/Close Drawer
function toggleDrawer(){
  drawerOpen = !drawerOpen;
  $(".drawer-content").slideToggle();
  $("#arrow").toggleClass("up-arrow");
  $("#arrow").toggleClass("down-arrow");
  
  // Changes Arrow Text
  if(drawerOpen)
  {
    $("#handle-text").text("Hide")
  }
  if(!drawerOpen)
  {
    $("#handle-text").text("Show Songs")
    songsDisplayed = 0;
    emptyDrawer();
  }
  populateDrawer();
}


// Close Drawer Function. Needed to specifically close when Toggle is not wanted.
// function closeDrawer(){
//   if($('#drawer-content').is(':visible')){
//     $('#drawer-content').slideUp();
//     emptyDrawer();
//   }
// }

// Function to empty song drawer
function emptyDrawer() {
  $(".drawer-content").empty();
}


// Function to clear and populate song drawer.
function populateDrawer()
{
  // Prevents API call being made if drawer is not open.
  if(!$('#drawer-content').is(':visible'))
  {
    return;
  }
  emptyDrawer();
  $(".drawer-content").append(`<div class="drawer-title"><h1>Loading...</h1></div>`)

  console.log("BPM input is " + $("#bpm-input").val())
    // API request based on BPM
  $.ajax(`https://api.getsongbpm.com/tempo/?api_key=8d7585614344fcdbb6bcd62c9bf1b7ce&bpm=${+$("#bpm-input").val()!}`).then((data)=>{ 
    savedData = JSON.parse(data);

    fillDrawer();
  })
}

const truncateString = function(text:string, maxLength:number){
  if (text.length > maxLength){
    text = text.substring(0,maxLength)+"..."
  }
  return text;
}

// Fills the contents of the drawer with songs. 
function fillDrawer(){
  console.log("Songs Displayed = "+ songsDisplayed);
  console.log("Fill drawer Called")

  emptyDrawer();
  $(".drawer-content").append(`<div class="drawer-title"><h1>Songs at ${$("#bpm-input").val()} BPM</h1></div>`)
  $(".drawer-content").append(`<div class="song-slides"></div>`)
  console.log("Songs Displayed Before For loop = "+ songsDisplayed);
  for (let i = songsDisplayed; i < songsDisplayed+10; i++) 
  {
    let artist:string = truncateString(savedData.tempo[i]["artist"]["name"], 15)
    let title:string = truncateString(savedData.tempo[i]["song_title"], 30)
    let image = savedData.tempo[i]["artist"]["img"] !== null ? savedData.tempo[i]["artist"]["img"] : "src/images/unknown-person-icon-16.jpg"
    console.log(savedData.tempo[i]["artist"]["img"])
    // Add song slides.
    $(".song-slides").append(
      `<div class="song-slide">`+
      `<h2 class="by-line">${artist}</h2>`+
      `<h1 class="song-title">${title}</h1>`+
      `<img src="${image}" alt="" class="song-image">`+
      `<a class="view-song-link" href = "${savedData.tempo[i]["song_uri"]}" target="_blank">View on getSongBPM.com</a>`+
      `</div>`
    );

    
    //$(".song-title").last().text(truncateString($(".song-title").last().text, 30))
    
    
  }
  console.log("Songs Displayed = "+ songsDisplayed);
  // Saves index of songs dipslayed for future use.
  songsDisplayed = songsDisplayed+10;

  console.log("Songs Displayed = "+ songsDisplayed);
  // Keeps max songs to dispay at 50.
  $(".drawer-content").append(`<div class="button-container"></div>`)
  if(songsDisplayed > 10)
  {
    $(".button-container").append(`<button class="more-button" name="previous" id="previous-button">Previous</button>`)
  }
  if(songsDisplayed < 50)
  {
    $(".button-container").append(`<button class="more-button" name="next" id="next-button">Next</button>`)
  }
}

// Listener on drawer-content to dectect click on the Previous button.
$(".drawer-content").on("click", "#previous-button", function(event){
  event.preventDefault();

  // Subtracts ten from Songs Displayed then refills the drawer.
  songsDisplayed = songsDisplayed-20;
  fillDrawer();
})

// Listener on drawer-content to detect click on the More button.
$(".drawer-content").on("click", "#next-button", function(event){
  event.preventDefault();  
  fillDrawer();
})

