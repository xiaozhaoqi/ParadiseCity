// import React from 'react'

export default () => {
  const img = document.createElement('img')
  img.src =
    'https://s11.flagcounter.com/count/m1nf/bg_FFFFFF/txt_000000/border_FFFFFF/columns_2/maxflags_64/viewers_3/labels_1/pageviews_1/flags_0/percent_0/'
  img.onload = () => {
    const load = document.querySelector('.load-counter')
    load && load.classList.remove('load-counter')
    load && load.appendChild(img)
  }
  return (
    <>
      <p>Hey.</p>
      <p>Leaving something on the Internet!</p>
      <div className='load-counter' style={{ marginTop: '1em' }}></div>
    </>
  )
}
