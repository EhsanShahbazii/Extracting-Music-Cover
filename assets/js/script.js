const jsmedia = window.jsmediatags;
const $ = document;

$.querySelector(".input").addEventListener("change", (e) => {
  const file = e.target.files[0];

  jsmedia.read(file, {
    onSuccess: function (tag) {
      const data = tag.tags.picture.data;
      const format = tag.tags.picture.format;
      let base64String = "";

      for (let i = 0; i < data.length; i++)
        base64String += String.fromCharCode(data[i]);

      $.querySelector(
        ".cover"
      ).style.backgroundImage = `url(data:${format};base64,${window.btoa(
        base64String
      )})`;
      $.querySelector(".title").textContent = `title: ${tag.tags.title}`;
      $.querySelector(".artist").textContent = `artist: ${tag.tags.artist}`;
      $.querySelector(".album").textContent = `album: ${tag.tags.album}`;
      $.querySelector(".genre").textContent = `genre: ${tag.tags.genre}`;
      $.querySelector(".year").textContent = `year: ${tag.tags.year}`;
      $.querySelector(".comment").textContent = `comment: ${tag.tags.comment}`;
      $.querySelector(".track").textContent = `track: ${tag.tags.track}`;
      $.querySelector(".lyrics").textContent = `lyrics: ${tag.tags.lyrics}`;

      let a = document.createElement("a"); //Create <a>
      a.href = "data:image/jpeg;base64," + window.btoa(base64String); //Image Base64 Goes here
      a.download = "Image.jpeg"; //File name Here
      a.click();

      // let a = $.createElement("a");
      // a.href = $.querySelector(".cover").style.backgroundImage.split(":")[1];
      // a.download = `${tag.tags.title}.jpeg`;
      // $.body.appendChild(a);
      // a.click();
      // $.body.removeChild(a);
    },
    onError: function (error) {
      console.log(error);
    },
  });
});
