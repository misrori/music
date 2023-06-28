window.addEventListener('load', () => {
  const songList = document.getElementById('songList');
  const audioPlayer = document.getElementById('audioPlayer');

  // Fetch the song files
  fetch('www/sounds/')
    .then(response => response.text())
    .then(text => {
      // Parse the HTML response and extract the song file names
      const parser = new DOMParser();
      const htmlDocument = parser.parseFromString(text, 'text/html');
      const links = htmlDocument.querySelectorAll('a');

      // Iterate over the song file names and create the playlist
      links.forEach(link => {
        const fileName = link.getAttribute('href');

        if (fileName.endsWith('.mp3')) {
          const songName = fileName.replace('.mp3', '');
          const listItem = document.createElement('li');
          listItem.textContent = songName;

          // Add a click event listener to play the song
          listItem.addEventListener('click', () => {
            audioPlayer.src = 'sounds/' + fileName;
            audioPlayer.play();
          });

          songList.appendChild(listItem);
        }
      });
    });
});
