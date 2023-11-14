$(".btn-fff").on("click", (e) => {
  let f = e.target.value;
  window.location.href = `/showreel?title=${f}&sceneNumber=0&elementNumber=0`;
});

$(".btn-fdx").on("click", (e) => {
    let s = e.target.value;
    window.location.href = `/convert?script=${s}`;
});

$(".btn-fdx-yes").on("click", (e) => {
  if (
    confirm(
      "Film Fox File already exists. Are you sure you want to overwrite it?"
    )
  ) {
    let s = e.target.value;
    window.location.href = `/convert?script=${s}`;
  }
});

$("#btn-voices").on("click", (e) => {
  window.location.href = `/voices`;
});
