# Spotify_Visualizer

Picture this: Its 2014, and Trap Nation has dropped another absolute heater on their channel. You click to the video to listen to the absolute heat that was just dropped. The audio loads and with it, the epilepsy triggering visualizer plays.

The aim of this project is to recreate the epilepsy inducing visualizer from Trap Nation's glory days, but now allowing us to sync it to any spotify song, rather than having to wait for the newest trap nation heater...

An example of the scenario above: `https://www.youtube.com/watch?v=GnQcMBzhr8E&ab_channel=TrapNation`

Live Demo: Coming soon...

## Issues/Mental Blocks

- Spotify API provides TONS of data, specifically related to audio analysis. Meaning that the MDN web audio API is not of any use here, since we don't have an audio file to process. Using Web Audio API, you can just plug a sound file into FFT (Fast Fourier Transform) to perform signal processing, whereas the data here needs to be formatted in a way that it can be roughly grouped into columns, that are ultimately shown. This was decided using a data structure of the current nature ```js {starttime, finishtime, frequency, loudness}```

## Stages

- [x] Connect to Spotify API
- [x] Playback in web browser
- [ ] Create 2D Audio Visualization
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

3D Modelling to take the epilepsy to the next level, (Three.js/webGL)
Increased UX
