const video =document.querySelector("#video");
const Play =document.querySelector("#play");
const Stop =document.querySelector("#stop");
const progress =document.querySelector("#progress");
const timestamp =document.querySelector("#timestamp");

// play & pause video
toggleVideoStatus = () =>{
    if(video.paused){
        video.play()
    }else{
        video.pause()
    }
}

// update play/pause Icon
updatePlayIcon=()=>{
    if(video.paused){
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    }else{
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';

    }
}

// update Progress 
updateProgress=()=>{
    progress.value = (video.currentTime / video.duration )*100;

    // get minutes
    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10){
        mins = '0' + String(mins);
    }

    // get seconds
    let seconds = Math.floor(video.currentTime % 60);
    if(seconds < 10){
        seconds = '0' + String(seconds);
    }

    timestamp.innerHTML = `${mins}:${seconds}`
}

// set Video Time to Progress
setVideoProgress=()=>{
         video.currentTime = (+progress.value * video.duration) / 100;
}

// stop Video
stopvideo=()=>{
    video.currentTime = 0;
    video.pause();
}

// event Listener
video.addEventListener('click' , toggleVideoStatus);
video.addEventListener('pause' , updatePlayIcon);
video.addEventListener('play' , updatePlayIcon);
video.addEventListener('timeupdate' , updateProgress);

Play.addEventListener('click' , toggleVideoStatus);

Stop.addEventListener('click' , stopvideo);

progress.addEventListener('change' , setVideoProgress);