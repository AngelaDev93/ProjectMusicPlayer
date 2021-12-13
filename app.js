/////carousels///////////

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

///////navigation//////////

//////////toggling music player////////

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

///////back from music player//////

const backToHomeBtn = document.querySelector('.section-music-player .back-button');

backToHomeBtn.addEventListener('click', () => {
    sectionMusicPlayer.classList.remove('active');
})

///////playlist////////////

const playlistSection = document.querySelector('.playlist');
const navBtn = document.querySelector('.section-music-player .nav-button');

navBtn.addEventListener('click', () => {
    playlistSection.classList.add('active');
})

const backToMusicPlayer = document.querySelector('.playlist .back-button');

backToMusicPlayer.addEventListener('click', () => {
    playlistSection.classList.remove('active')
})


