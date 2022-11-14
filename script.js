const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const music = document.querySelector('audio');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// List of music
const songs = [
    {
        name: 'Baby It\'s You Remix',
        dispalyName: 'Baby It\'s You (remix)',
        artist: 'George FitzGerald',
        coverImg: 'find-your-line',
    },
    {
        name: 'Moon Over the Castle',
        dispalyName: 'Moon Over the Castle',
        artist: 'Bring Me the Horizon',
        coverImg: 'find-your-line',
    },
    {
        name: 'Squad',
        dispalyName: 'Squad',
        artist: 'Disciples, GoldLink',
        coverImg: 'find-your-line',
    },
    {
        name: 'Swan Lake',
        dispalyName: 'Swan Lake',
        artist: 'Pyotr Ilyich Tchaikovsky',
        coverImg: 'tchaikovsky',
    },
    {
        name: 'Piano Concerto 1',
        dispalyName: 'Piano Concerto 1',
        artist: 'Pyotr Ilyich Tchaikovsky',
        coverImg: 'tchaikovsky',
    },
];

// Checks if is playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play & Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.dispalyName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.coverImg}.jpg`;
}

// Current Song
let songIndex = 0;

// Prev Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Selects the first song from a list
loadSong(songs[songIndex]);

// Updates Progress Bar and Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Culculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Culculate display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners 
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);

progressContainer.addEventListener('click', setProgressBar);