document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.querySelector('.audio-player');
    if(audioPlayer) {
        audioPlayer.addEventListener('play', () => {
            console.log('Audio started playing');
           
        });
    }
});
// if(name == "nitro"){
    // return "ksj"}