const gallery = [...document.querySelectorAll('.gallery img')];

let  carouselImageIndex = 0;

const changeCarousel = () => {
    gallery[carouselImageIndex].classList.toggle('active');

    if(carouselImageIndex >= gallery.length - 1){
        carouselImageIndex = 0;
    } else{
        carouselImageIndex++;
    }
    gallery[carouselImageIndex].classList.toggle('active');
}

setInterval(() => {
    changeCarousel();
}, 3000);

/////Section music player//////

const sectionMusicPlayer = document.querySelector('.section-music-player');

let clickCount = 1;

sectionMusicPlayer.addEventListener('click', () => {
    if(clickCount => 2){
        sectionMusicPlayer.classList.add('active');
        clickCount = 1;
        return;
    }
    clickCount++;
    setTimeout(() => {
        clickCount = 1;
    }, 250);
})

/////navigation init////////////

const backToHomeBtn = document.querySelector('.section-music-player .back-button');

backToHomeBtn.addEventListener('click', () => {
    sectionMusicPlayer.classList.remove('active');
})


const playlistSection = document.querySelector('.playlist');
const navBtn = document.querySelector('.section-music-player .nav-button');

navBtn.addEventListener('click', () => {
    playlistSection.classList.add('active');
})

const backToMusicPlayer = document.querySelector('.playlist .back-button');

backToMusicPlayer.addEventListener('click', () => {
    playlistSection.classList.remove('active')
})


/////////finish navigation///////

//////music//////

let CurrentMusic = 0;

const music = document.querySelector('#audio-source');

const seekBar = document.querySelector('.music-seek-bar');
const SongName = document.querySelector('.current-song-name');
const artistName =document.querySelector('.artist-name');
const coverImage = document.querySelector('.cover');
const currentMusicTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.duration');

const list = [...document.querySelectorAll('.list')];

////selector buttons//////

const forwardBtn = document.querySelector('i.fa-forward');
const backwardBtn = document.querySelector('i.fa-backward');
const playBtn = document.querySelector('i.fa-play');
const pauseBtn = document.querySelector('i.fa-pause');
const repeatBtn = document.querySelector('span.fa-redo');
const volumeBtn = document.querySelector('span.fa-volume-up');
const volumeSlider = document.querySelector('.volume-slider');

/////funtion for setting up music//////

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    CurrentMusic = i;

    music.src = song.path;

    SongName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImage.src = song.cover;

    setTimeout(() => {
       seekBar.max = music.duration;
       musicDuration.innerHTML = formatTime(music.duration);
    }, 300);
    currentMusicTime.innerHTML = '00 : 00';
    list.forEach(item => item.classList.remove('active'));
    list[CurrentMusic].classList.add('active');

}

setMusic(0);

////format duration in 00 : 00 format////

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10){
        min = `0` + min;
    }

    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0` + sec;
    }

    return `${min} : ${sec}`;
}

////playBtn click event/////

playBtn.addEventListener('click', () => {
    music.play();
    playBtn.classList.remove('active');
    pauseBtn.classList.add('active');
})

////pauseBtn click event/////

pauseBtn.addEventListener('click', () => {
    music.pause();
    pauseBtn.classList.remove('active');
    playBtn.classList.add('active');
})

////forward button//////

forwardBtn.addEventListener('click', () => {
    if(CurrentMusic >= songs.length - 1){
        CurrentMusic = 0;
    } else{
        CurrentMusic++;
    }
    setMusic(CurrentMusic);
    playBtn.click();
})

///////backward button/////

backwardBtn.addEventListener('click', () => {
    if(CurrentMusic <= 0){
        CurrentMusic = songs.length - 1;
    } else{
        CurrentMusic--;
    }
    setMusic(CurrentMusic);
    playBtn.click();
})

///seekbar events/////

setInterval(() => {
    seekBar.value = music.currentTime;
    currentMusicTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
        if(repeatBtn.className.includes('active')){
            setMusic(CurrentMusic);
            playBtn.click();
        } else{
            forwardBtn.click();
        }
    }
}, 500)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})

//////repeat button/////

repeatBtn.addEventListener('click', () => {
    repeatBtn.classList.toggle('active');
})

////volume////////

volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('active');
    volumeSlider.classList.toggle('active');
})

volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value;
})

list.forEach((item, i) =>{
    item.addEventListener('click', () => {
        setMusic(i);
        playBtn.click();
    })
})