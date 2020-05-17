import React, { useRef, useEffect } from 'react'
import '../css/Portfolio.css'
const importImages = (tag) => tag.keys().map(tag) // Import Sequence of Images
const images = importImages(require.context('../images', false, /\.(png|jpe?g|svg)$/))
const imagesArr = images.map(element => {
  // eslint-disable-next-line no-undef
  const img = new Image()
  img.src = element
  return img
})

export const Animation = () => {
  const canvasRef = useRef(null)
  const scrollSignRef = useRef(null)

  useEffect(() => {
    // consts
    const ref = canvasRef.current
    const scrollRef = scrollSignRef.current
    const ctx = ref.getContext('2d')
    const totalImages = 91
    let currentLocation = 0
    // disable scroll on start
    document.body.style.overflow = 'hidden'
    // First Draw
    imagesArr[0].onload = function () {
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.drawImage(imagesArr[0], 0, 0, window.innerWidth, window.innerHeight)
    };

    // Resize Func
    (function resizeCanvas () {
      window.addEventListener('resize', function () {
        ref.width = window.innerWidth
        ref.height = window.innerHeight
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
        ctx.drawImage(imagesArr[currentLocation], 0, 0, window.innerWidth, window.innerHeight)
      }, false)
    })();

    // Wheel Func
    (function mouseWheel () {
      let newLocation = null
      const yPos = ref.getBoundingClientRect()
      // eslint-disable-next-line curly
      if (yPos.y !== 0)
        window.scroll({ top: 0, behavior: 'smooth' })
      function animate (e) {
        // remove sign
        scrollRef.className = 'hidden'
        // get screen y axis ref
        const yPos = ref.getBoundingClientRect();
        // disable scroll when reach to top
        (currentLocation === imagesArr.length - 1 || yPos.y !== 0)
          ? document.body.style.overflow = ''
          : document.body.style.overflow = 'hidden'
        // enable animation only on top
        if (yPos.y === 0) {
          const delta = Math.max(-1, Math.min(1, e.deltaY))
          if (delta === -1) currentLocation -= 1
          if (delta === 1) currentLocation += 1
          if (currentLocation < 0) currentLocation = 0
          if (currentLocation >= (totalImages - 1)) currentLocation = (totalImages - 1)
          if (newLocation === null) {
            // eslint-disable-next-line no-undef
            requestAnimationFrame(setImage)
          }
          newLocation = currentLocation
        }
      }
      // Listen to scrolling
      let startPos = null
      window.addEventListener('wheel', animate, false)
      window.addEventListener('touchstart', (e) => getStartPos(e, startPos), false)
      window.addEventListener('touchmove', getTouchPos, false)
      // Get start point for mobile
      function getStartPos (e) {
        const touch = e.touches[0]
        startPos = touch.clientY
      }
      // Get move points for mobile
      function getTouchPos (e) {
        const touch = e.touches[0]
        // eslint-disable-next-line no-undef
        const mouseEvent = new WheelEvent('wheel', {
          deltaY: -1 * (touch.clientY - startPos)
        })
        window.dispatchEvent(mouseEvent)
      }
      // Set the images
      function setImage () {
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
        ctx.drawImage(imagesArr[newLocation], 0, 0, window.innerWidth, window.innerHeight)
        newLocation = null
      }
    })()
  })
  return (
    <div className="container">
      <canvas className="img canvas" width={window.innerWidth} height={window.innerHeight} ref={canvasRef}/>
      <section ref={ scrollSignRef }>
        <div className="scroll chevron"></div>
        <div className="scroll chevron"></div>
        <div className="scroll chevron"></div>
        <span className='scroll title scrollHeader'>Scroll down</span>
      </section>
    </div>
  )
}
