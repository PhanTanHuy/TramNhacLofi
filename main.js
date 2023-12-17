// Định nghĩa cấu trúc âm nhạc
function Music(name, artist, imageSrc, mp3Src) {
    this.name = name;
    this.artist = artist;
    this.imageSrc = imageSrc;
    this.mp3Src = mp3Src;
}
  

var playlist = [
    new Music("Id 072019 | 3107 ft 267", "W/n","image/img1.jfif" ,"music/song1.mp3"),
    new Music("Fire Force - Opening | Inferno", "Fire Force","image/img8.jfif" ,"music/song2.mp3"),
    new Music("W/n - 3107 3 ft. 267", "W/n","image/img3.jpg" ,"music/song3.mp3"),
    new Music("WREN EVANS - TỪNG QUEN", "WREN EVANS","image/img4.jfif" ,"music/song4.mp3"),
    new Music("Dan Dan Kokoro Hikareteku", "Dragon Ball GT","image/img5.jpg" ,"music/song5.mp3"),
    new Music("Tokyo Ghoul - Opening 1 | Unravel", "Tokyo Ghoul ","image/img7.jfif" ,"music/song6.mp3"),
    new Music("W/n - 3107 4 x Erik ft Nâu", "W/n","image/img2.jfif" ,"music/song7.mp3"),
    new Music("Nom - Beneath The Rain", "Nom","image/img9.jpg" ,"music/song8.mp3")
];
  
var audio = new Audio(); // Đối tượng âm thanh
var isPlaying = false; // Trạng thái phát  
var currentSong = null;
var id2 = null;
var bgrCurSong = null;



function playMusic(button) {
    var songName = button.getAttribute("data-song");
    var playIcon = button.querySelector("i");
    var backgroundCurrentSong = button.parentNode.parentNode;
    var changerightPlay = document.getElementById('rightPlay');
     // lấy giá trị giao diện bên phải
    var circle = document.getElementById('animationCircle');
    var tenbaihat = document.getElementById('tenbaihat');
    var tacgia = document.getElementById('tacgia');
    var anhnen = document.getElementById('anhnen');
    
    if (isPlaying) {
        if (currentSong != songName) {
            audio.pause();
            id2.classList.remove("fa-pause");
            bgrCurSong.classList.remove("currentSong");
            id2.classList.add("fa-play");
            changerightPlay.classList.add("fa-play");
            changerightPlay.classList.remove("fa-pause");
            console.log('đang dừng bài'+ currentSong);
            circle.classList.remove('cdCricle');
            console.log('da xoa circle');
            isPlaying = false;
            // đổi giao diện bên phải

        } else {
            audio.pause();
            changerightPlay.classList.add("fa-play");
            changerightPlay.classList.remove("fa-pause");
            playIcon.classList.remove("fa-pause");
            playIcon.classList.add("fa-play");
            bgrCurSong.classList.remove("currentSong");
            circle.style.animationPlayState = 'paused';
            console.log('đang dừng bài'+ currentSong);
            isPlaying = false;
            return;
             // đổi giao diện bên phải
        }
    }     
    for (var i=0; i<playlist.length; i++) {
       
        
        if (playlist[i].name === songName) {
            if (!isPlaying) {
                audio.src = playlist[i].mp3Src;
                audio.play();
                isPlaying = true;     
                playIcon.classList.remove("fa-play");
                playIcon.classList.add("fa-pause");
                circle.style.animationPlayState = 'running';
                backgroundCurrentSong.classList.add("currentSong");
                console.log('đang phát bài'+ songName);
                currentSong = songName;
                 // đổi giao diện bên phải
                anhnen.style.backgroundImage = `url("${playlist[i].imageSrc}")`;
                tenbaihat.innerHTML = playlist[i].name;
                tacgia.innerHTML = playlist[i].artist;
                circle.style.backgroundImage = `url("${playlist[i].imageSrc}")`;
            }
            break; 
        }
    }
    rightCol(audio, playIcon);
    id2 = playIcon;
    bgrCurSong = backgroundCurrentSong;
}
function rightCol(audio, playIcon) {
    console.log(audio); 
    var rightPlay = document.getElementById('rightPlay');
    var animation = document.getElementById('animationCircle');
    animation.classList.add("cdCircle");
    rightPlay.classList.add("fa-pause");
    rightPlay.onclick = function() {
        console.log('da click');
        if (!audio.paused) {
            audio.pause();
            playIcon.classList.add("fa-play");
            playIcon.classList.remove("fa-pause");
            rightPlay.classList.add("fa-play");
            rightPlay.classList.remove("fa-pause");
            animation.style.animationPlayState = 'paused';
            console.log('da ngung nhac roi');
        }
        else {
            audio.play();    
            playIcon.classList.add("fa-pause");
            playIcon.classList.remove("fa-play");
            rightPlay.classList.remove("fa-play");
            rightPlay.classList.add("fa-pause");
            console.log('da phat nhac roi');
            animation.style.animationPlayState = 'running';
        }
    }
    // lắng nghe sự kiện nhạc hết
    audio.addEventListener('ended', function() {
        // Ngưng quay ảnh
        animation.style.animationPlayState = 'paused';
        rightPlay.classList.add("fa-play");
        rightPlay.classList.remove("fa-pause");
        playIcon.classList.add("fa-play");
        playIcon.classList.remove("fa-pause");
    });

    // xử lí thanh tiến trình nhạc 
    var progressBar = document.getElementById('thanh_trangthai');
    var tuanhac = document.getElementById('tuanhac');
    audio.addEventListener('timeupdate', function (){
        // tiến trình hiện tại
        var progressPercent = (audio.currentTime * 100 / audio.duration);
        progressBar.style.width = progressPercent + '%';
    })
    // lắng nghe sự kiện tua nhạc
    tuanhac.addEventListener('click', function (e){
        // đặt chiều dài mới
        var clickX = e.offsetX * 100 / tuanhac.offsetWidth;
        console.log(clickX);
        var newProgress = (clickX / 100) * audio.duration;
        audio.currentTime = newProgress;
    })
}