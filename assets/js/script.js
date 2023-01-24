const jsmedia = window.jsmediatags;
const $ = document;

$.querySelector("input").addEventListener("change", (e) => {
  const file = e.target.files[0];

  jsmedia.read(file, {
    onSuccess: function (tag) {
      const data = tag.tags.picture.data;
      const format = tag.tags.picture.format;
      let base64String = "";

      for (let i = 0; i < data.length; i++)
        base64String += String.fromCharCode(data[i]);

      $.querySelector(
        ".result"
      ).style.backgroundImage = `url(data:${format};base64,${window.btoa(
        base64String
      )})`;
      $.querySelector("#title").textContent = `title: ${tag.tags.title}`;
      $.querySelector("#artist").textContent = `artist: ${tag.tags.artist}`;
      $.querySelector("#album").textContent = `album: ${tag.tags.album}`;
      $.querySelector("#genre").textContent = `genre: ${tag.tags.genre}`;
      $.querySelector("#year").textContent = `year: ${tag.tags.year}`;
      $.querySelector("#track").textContent = `track: ${tag.tags.track}`;
      $.querySelector("#lyrics").textContent = `lyrics: ${tag.tags.lyrics}`;

      Swal.fire({
        position: "top-end",
        html: `<div style="display: flex; justify-content: space-evenly; align-items: center"><div style="background-image: url(data:${format};base64,${window.btoa(
          base64String
        )}); width:100px; height: 100px; background-position: center;
          background-size: contain;"></div>
          <div><h6>${tag.tags.title}</h6>
          <h6>${tag.tags.artist}</h6>
          </div>
          <div class="spinner-border text-info" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
          </div>`,
        showConfirmButton: false,
        timer: 2500,
      });

      $.querySelector("#download-btn").addEventListener("click", () => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "image has been successfully downloaded",
          showConfirmButton: false,
          timer: 1500,
        });
        let a = document.createElement("a"); //Create <a>
        a.href = "data:image/jpeg;base64," + window.btoa(base64String); //Image Base64 Goes here
        a.download = `${tag.tags.title}.${
          tag.tags.picture.format.split("/")[1]
        }`; //File name Here
        a.click();
      });
    },
    onError: function (error) {
      console.log(error);
    },
  });
});

new Typewriter("#typewriter", {
  strings: ["Extract music cover", "Easy & fast", "Powered by jsmedia"],
  autoStart: true,
  loop: true,
});
