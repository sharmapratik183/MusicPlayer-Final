"use-strict";

console.log("Welcome to My music Player");

//Intialize the variables
let songIndex = 0;
let element;
let e;
let audioElement = new Audio('Songs/blue.mp3');
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let masterAuthorName =  document.getElementById('masterAuthorName');
let gif = document.getElementById('gif');
let like = document.getElementsByClassName('likeIt');
let currentMinutes;
let currentSeconds;
let durationMinutes;
let durationSeconds;
let volume_slider = document.getElementById('volumeSeek');
let volumeIcon = document.getElementById('volumeIcon');
let currentVolume;


let songs = [

    {songName:"Bum Bum Tam Tam", filePath:"songs/Bum-Bum-Tam-Tam.mp3",authorName:"J Balvin - Bum Bum Tam Tam"},
    {songName:"Mann Bharrya Shershaah", filePath:"songs/Mann Bharryaa.mp3",authorName:"B Praak - Mann Bharrya"},
    {songName:"Ranjha Shershaah", filePath:"songs/Ranjha.mp3",authorName:"B Praak- Ranjha from 'Shershaah' "},
    {songName:"Industry Baby", filePath:"songs/industry-baby.mp3",authorName:"Lil Nas X - Industry Baby"},
    {songName:"Rataan-Lambiyan", filePath:"songs/Raataan-Lambiyan.mp3",authorName:"Assees Kaur - Rataan Lambiyan"},
    {songName:"Rammo Rammo", filePath:"songs/Rammo Rammo.mp3",authorName:"Udit Narayan"},
    {songName:"Blue Ain't Your Color", filePath:"songs/blue.mp3",authorName:"Home Free"},
    {songName:"Shaky Shaky", filePath:"songs/shaky shaky.mp3",authorName:"Daddy Yankee"},
    {songName:"Se Nota", filePath:"songs/Se Nota.mp3",authorName:"Simon Savi - Se Nota"},
    {songName:"Bad Boy X Bad Girl - Badshah", filePath:"songs/Bad Boy X Bad Girl - Badshah.mp3",authorName:"Badshaah"},
    {songName:"Kanta Laga", filePath:"songs/kanta Laga.mp3",authorName:"Yo Yo Honey Singh"},
    {songName:"Tere Jaisa Yaar Kahan", filePath:"songs/Tere Jaisa Yaar Kahan.mp3",authorName:"Kishor Kumar"},
    {songName:"Aoge Jab tum", filePath:"songs/Aaoge Jab Tum.mp3",authorName:"Ustad Rashid Khan - Jab We Met"},
    {songName:"Ek Pyar Ka Nagma Hai", filePath:"songs/Pyar ka nagma.mp3",authorName:"Jagjit Singh"},
    {songName:"Channa Mereya", filePath:"songs/Channa_Mereya.mp3",authorName:"Arijit Singh"},
    {songName:"Pachtaoge", filePath:"songs/Pachtaoge - Arijit Singh.mp3",authorName:"Arijit Singh"}

];

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;

        var p = document.getElementById(songIndex);
        p.classList.add('fa-pause');
        p.classList.remove('fa-play');
        var k = p.parentElement;
        k.classList.remove('play-icon');
        k.classList.add('play-icon2');

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
        var p = document.getElementById(songIndex);
        p.classList.remove('fa-pause');
        p.classList.add('fa-play');
        var g = p.parentElement;
        g.classList.remove('play-icon2');
        g.classList.add('play-icon');


    }
})

//Listen to Events

volumeIcon.addEventListener('click',()=>{
    if(volumeIcon.classList.contains('fa-volume-up')){
    currentVolume = audioElement.volume;
    audioElement.volume = 0;
    volumeIcon.classList.remove('fa-volume-up');
    volumeIcon.classList.add('fa-volume-mute');
    }
    else{
       audioElement.volume = currentVolume;
       volumeIcon.classList.add('fa-volume-up');
       volumeIcon.classList.remove('fa-volume-mute');
    }
});
function setVolume(){
    if(volume_slider.value == 0){
        volumeIcon.classList.remove('fa-volume-up');
        volumeIcon.classList.add('fa-volume-mute');
        
    }
    else{
        volumeIcon.classList.add('fa-volume-up');
        volumeIcon.classList.remove('fa-volume-mute');
    }
    audioElement.volume = volume_slider.value/50;
}
document.getElementById('reLoad').addEventListener('click',()=>{
    audioElement.currentTime = 0;
})
volume_slider.addEventListener('change',setVolume);

audioElement.addEventListener('timeupdate',()=>{
    //Update Seekbar
    progress = parseFloat((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
    
    if(audioElement.currentTime>=audioElement.duration){
        console.log("hua?");
        gif.style.opacity = 0;
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        document.getElementById(songIndex).classList.remove('fa-pause');
        document.getElementById(songIndex).classList.add('fa-play');
        
    }
    currentMinutes = parseInt(audioElement.currentTime/60);
    currentSeconds = parseInt(audioElement.currentTime - currentMinutes*60);
    if(currentSeconds<10){
        currentSeconds = "0" + currentSeconds;
    }
    document.getElementById('currentTime').innerHTML = "0" + currentMinutes + ":" + currentSeconds;
});

myProgressBar.addEventListener('change',()=>{
  audioElement.currentTime = parseFloat((myProgressBar.value * audioElement.duration)/100);
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
         element.classList.remove('fa-pause');
        element.classList.add('fa-play');
        var g = element.parentElement;
        g.classList.remove('play-icon2');
        g.classList.add('play-icon');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
  element.addEventListener('click',(e)=>{
      if(audioElement.paused || audioElement.currentTime<=0 || songIndex!=e.target.id){
        makeAllPlays();
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        var p = e.target.parentElement;
        p.classList.remove('play-icon');
        p.classList.add('play-icon2');
  
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
      

       if(audioElement.currentTime==0 || songIndex!=e.target.id){
        songIndex =e.target.id;
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerHTML = songs[songIndex].songName;
        masterAuthorName.innerHTML = songs[songIndex].authorName;
       }

            audioElement.play();

            audioElement.addEventListener('loadedmetadata',()=>{
            durationMinutes = parseInt(audioElement.duration/60);
            durationSeconds = parseInt(audioElement.duration - (durationMinutes)*60);
            if(durationSeconds<10){
                durationSeconds = "0" + durationSeconds;
            }
    
            document.getElementById('songDuration').innerHTML = "0" + durationMinutes + ":" + durationSeconds;
        });
  
        gif.style.opacity = 1;
      }
      else 
      {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        e.target.classList.remove('fa-pause');
        e.target.classList.add('fa-play');
        gif.style.opacity = 0;
      }

     
  });
});

document.getElementById('backward').addEventListener('click',()=>{
        if(songIndex<=0){
            songIndex = 0;
        }
        else{
            songIndex-=1;
        }
        makeAllPlays();
        var g = document.getElementById(songIndex);
        g.classList.remove('fa-play');
        g.classList.add('fa-pause');
        var p = g.parentElement;
        p.classList.remove('play-icon');
        p.classList.add('play-icon2');
        masterSongName.innerHTML = songs[songIndex].songName;
        masterAuthorName.innerHTML = songs[songIndex].authorName;

        audioElement.src = songs[songIndex].filePath;
   
         audioElement.currentTime = 0;
         audioElement.play();
   
         masterPlay.classList.remove('fa-play');
         masterPlay.classList.add('fa-pause');
         gif.style.opacity = 1;

});



document.getElementById('forward').addEventListener('click',()=>{
    if(songIndex>=13){
        songIndex = 0;
    }
    else{
        songIndex+=1;
    }
    makeAllPlays();
    var g = document.getElementById(songIndex);
    g.classList.remove('fa-play');
    g.classList.add('fa-pause');
    var p = g.parentElement;
    p.classList.remove('play-icon');
    p.classList.add('play-icon2');
    masterSongName.innerHTML = songs[songIndex].songName;
    masterAuthorName.innerHTML = songs[songIndex].authorName;

    audioElement.src = songs[songIndex].filePath;

    masterPlay.classList.remove('fa-play');
     masterPlay.classList.add('fa-pause');
     gif.style.opacity = 1;
     audioElement.play();


});

Array.from(like).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(e.target.classList.contains('far')){
            e.target.classList.remove('far');
            e.target.classList.add('fas');
            e.target.style.color = 'red';
        }
        else{
            e.target.classList.add('far');
            e.target.classList.remove('fas');
            e.target.style.color = 'gray';
        }
    });
});