$(".shot-select").on("change", (e) => {
  const line = e.target.id;
  const val = e.target.value;
  const title = $("#title")[0].outerText;
  const scene = $("#scene")[0].outerText;
  let l1 = line.substring(5).split('_');
  window.location.href = `/update-shot-list?title=${title}&scene=${scene}&val=${val}&item=${l1[0]}&line=${l1[1]}`
})
  $(".shot-subject").on("focusout", (e) => {
  const line = e.target.id.substring(13);
  const val = e.target.value;
  const title = $("#title")[0].outerText;
  const scene = $("#scene")[0].outerText;
  window.location.href = `/update-shot-list?title=${title}&scene=${scene}&val=${val}&item=subject&line=${line}`
  }),
  $("#description").on("change", (e) => {
    const line = e.target.id.substring(17);
    const val = e.target.value;
    const title = $("#title")[0].outerText;
    const scene = $("#scene")[0].outerText;
    window.location.href = `/update-shot-list?title=${title}&scene=${scene}&val=${val}&item=description&line=${line}`
   }),
   $(".btn-add").on("click", (e) => {
    const line = e.target.value;
    const title = $("#title")[0].outerText;
    const scene = $("#scene")[0].outerText;
    window.location.href = `/add-shot?title=${title}&scene=${scene}&line=${line}`
   }),
   $(".btn-delete").on("click", (e) => {
    const line = e.target.value;
    const title = $("#title")[0].outerText;
    const scene = $("#scene")[0].outerText;
    window.location.href = `/delete-shot?title=${title}&scene=${scene}&line=${line}`
   });
