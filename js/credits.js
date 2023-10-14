  $("#input-writer").on("focusout", (e) => {
    const val = e.target.value;
    const title = $("#filmTitle")[0].outerText;
    window.location.href = `/update-credits?title=${title}&credit=writer&val=${val}`;
  }),
  $("#input-director").on("focusout", (e) => {
    const val = e.target.value;
    const title = $("#filmTitle")[0].outerText;
    window.location.href = `/update-credits?title=${title}&credit=director&val=${val}`;
  }),
  $("#input-producer").on("focusout", (e) => {
    const val = e.target.value;
    const title = $("#filmTitle")[0].outerText;
    window.location.href = `/update-credits?title=${title}&credit=producer&val=${val}`;
  }),
  $("#input-title").on("focusout", (e) => {
    const val = e.target.value;
    const title = $("#filmTitle")[0].outerText;
    window.location.href = `/update-credits?title=${title}&credit=title&val=${val}`;
  })


