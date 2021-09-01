# Metronome
By C. Marshall Moriarty
#### A easy-to-use metronome with a conductor assistant features. 

### Metronome Features
- Select Tempo from 40 - 160 BPM
- Select Beats per Measure from 1 to 16
- 4 Meter options (Whole note through 16th note)
- Live updating (adjust settings while metronome is playing)
- Visual and audio indicators
- Two different sounds to differentiate beats.

### Conductor's Assistant Features
- BPM Song Selector
    - See songs that are at current BPM setting.
    - See up to 50 matching songs.
    - Link to songs on the getsongbpm.com site.

### How to Use
Metronomome: 
- Tempo: Use the slider or +/- buttons in the top section to adjust the tempo.
- Beats per Measure: use the slider or +/- buttons in the lower left of the Metronome section to change beats per measure.
- Meter: Use the slider or +/- section of the lower right of the Metronome section to change the Meter. 
    - Note: This will not effect how the metronome looks or sounds.

Conductor's Assistant:
- With your desired tempo selected, just click the "Show Songs" link at the bottom of the page to see songs that are recorded at the selected BPM. Use the Next/Previous buttons to navigate through up to 50 songs.

- Note: When selecting a new BPM, the currently displayed songs will no longer be available.

### Goals for the Future
- Add beat patterns section that is dynamically updated based on time signature.
- Add image to the Meter section showing Whole note, quarter, etc for selected meter.
- Transition metronome notes to actual notes.
- Add subdivide function.
- Create a 'My Songs' section where users can save songs of their chosing for various BPMs.
    - This would initally use local storage.
    - Would prefer this to have a drag and drop functionality instead of a button add.
    - Add user creation/authentication and transition My Songs to a database.

###
Issues
- Song slide unification. 
    - Due to longer artist names or artist tiltes, it is difficult to get slides to appear uniformly.
        - Possible Solution: make a function to check length of these fileds and adjust css to shrink text if too long.
        - Possible Solution: Find a text fit library to deploy.
    - SOLUTION: Truncated titles of 30+ characters.