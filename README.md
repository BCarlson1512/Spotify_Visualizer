# Spotify_Visualizer

Picture this: Its 2014, and Trap Nation has dropped another absolute heater on their channel. You click to the video to listen to the absolute heat that was just dropped. The audio loads and with it, the epilepsy triggering visualizer plays.

The aim of this project is to recreate the epilepsy inducing visualizer from Trap Nation's glory days, but now allowing us to sync it to any spotify song, rather than having to wait for the newest trap nation heater...

An example of the scenario above: `https://www.youtube.com/watch?v=GnQcMBzhr8E&ab_channel=TrapNation`

Live Demo: Coming soon...

## Issues/Mental Blocks

Data processing

- Spotify API provides TONS of data, specifically related to audio analysis. Meaning that the MDN web audio API is not of any use here, since we don't have an audio file to process. Using Web Audio API, you can just plug a sound file into FFT (Fast Fourier Transform) to perform signal processing, whereas the data here needs to be formatted in a way that it can be roughly grouped into columns, that are ultimately shown. This was decided using a data structure of the current nature ```js {starttime, finishtime, frequency, loudness}```
  
2d Visualization issues...

- Dynamically updating the waveform, in real time has been quite a journey. Initially the plan was to use multiple setstate functions inside of a useeffect before realizing that they all trigger re-renders (thanks react, love you) before the useeffect finishes, ultimately making them all undefined/null. The workaround here is to store all the required data into an object and then pass its data down to its respective components.
- Never did I think that floating point errors would have such a deep rooted impact in a project, however that small discrepancy in rounding (usually 0.00001) created a HUGE issue in fetching the appropriate data from a set of over 50000 data points (for a track length of 3:11)

## Stages

- [x] Connect to Spotify API
- [x] Playback in web browser
- [ ] Create 2D Audio Visualization
- [ ] Sync visualization in real time
- [ ] Implement Three.js Visualization
- [ ] Clean up frontend code

## Tech used

Spotify API: Duh.
Frontend: React.js, Material UI, react-spotify-web-playback
Backend: Express.js

## Building/Running

clone the repository, in two separate terminal instances
cd into server and type npm run dev
cd into client and type npm run dev

## Future

Attempting not to put my head through a wall on corner cases
3D Modelling to take the epilepsy to the next level, (Three.js/webGL)
Increased UX
