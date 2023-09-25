$('#convert').on('click', () => {
    let s = $('#script').val().substring(12)
    if (s !== '') {
      window.location.href = `/convert?script=${s}`
    }
  }),
    $('.btn-fff').on('click', (e) => {
      let f = e.target.value;
      window.location.href = `/display?title=${f}&sceneNumber=0&locked=yes`
    }),
    $('.btn-fdx').on('click', (e) => {
      let s = e.target.value;
      window.location.href = `/convert?script=${s}`
    }),
    $('#btn-voices').on('click', (e) => {
      window.location.href = `/voices`
    })