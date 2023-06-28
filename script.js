window.addEventListener('load', () => {
  const songList = document.getElementById('songList');
  const audioPlayer = document.getElementById('audioPlayer');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  const soundsFolder = './sounds/';

  // Fetch the song files
  fetch(soundsFolder)
    .then(response => response.text())
    .then(text => {
      // Parse the HTML response and extract the song file names
      const parser = new DOMParser();
      const htmlDocument = parser.parseFromString(text, 'text/html');
      const links = htmlDocument.querySelectorAll('a');

      // Create the playlist array
      const playlist = [];
      let currentSongIndex = 0;

      // Iterate over the song file names and add them to the playlist
      links.forEach(link => {
        const fileName = link.getAttribute('href');

        if (fileName.endsWith('.mp3')) {
          const songName = decodeURIComponent(fileName.replace('.mp3', ''));
          const songPath = fileName;
          const listItem = document.createElement('li');
          listItem.textContent = songName;

          // Add the song to the playlist
          playlist.push({ name: songName, path: songPath });

          // Add a click event listener to play the song
          listItem.addEventListener('click', () => {
            currentSongIndex = playlist.findIndex(song => song.path === songPath);
            playSong(currentSongIndex);
          });

          songList.appendChild(listItem);
        }
      });

      // Function to play a song
      function playSong(index) {
        const { name, path } = playlist[index];
        audioPlayer.src = path;
        audioPlayer.play();
      }

      // Function to play the next song
      function playNextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        playSong(currentSongIndex);
      }

      // Function to play the previous song
      function playPrevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        playSong(currentSongIndex);
      }

      // Add an event listener to play the next song when the current one ends
      audioPlayer.addEventListener('ended', playNextSong);

      // Add an event listener to the next button to play the next song
      nextButton.addEventListener('click', playNextSong);

      // Add an event listener to the previous button to play the previous song
      prevButton.addEventListener('click', playPrevSong);

      // Autoplay the first song
      playSong(currentSongIndex);
    });
});
