console.log('Welcome to Musiiica!!');

//initializing Variables.
let songIndex = 0;
let audioElement = new Audio("music/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let slidebar = document.getElementById("slidebar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById('masterSongName');
let SongItem = Array.from(document.getElementsByClassName('SongItem'));

let songs = [
    { songName:"Trust Me [NCS]", filePath:"music/1.mp3", coverPath:"images/1.jpg" },
    { songName:"Legacy [NCS]", filePath:"music/2.mp3", coverPath:"images/2.jpg" },
    { songName:"Touchdown [NCS]", filePath:"music/3.mp3", coverPath:"images/3.jpg" },
    { songName:"Sorry(I had to leave) [NCS]", filePath:"music/4.mp3", coverPath:"images/4.jpg" },
    { songName:"Hate you [NCS]", filePath:"music/5.mp3", coverPath:"images/5.jpg" },
    { songName:"Love me [NCS]", filePath:"music/6.mp3", coverPath:"images/6.jpg" },
    { songName:"Full Speed Ahead [NCS]", filePath:"music/7.mp3", coverPath:"images/7.jpg" },
    { songName:"Electric [NCS]", filePath:"music/8.mp3", coverPath:"images/8.jpg" },
    { songName:"Into the wild [NCS]", filePath:"music/9.mp3", coverPath:"images/9.jpg" },
    { songName:"Rival-Throne", filePath:"music/10.mp3", coverPath:"images/10.jpg" },

]


SongItem.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    slidebar.value = progress;
})

slidebar.addEventListener('change', ()=>{
    audioElement.currentTime = (slidebar.value * audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `music/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `music/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 9;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `music/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

