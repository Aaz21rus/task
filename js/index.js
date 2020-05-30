const word1 = document.querySelector( '.intro__logo-name' )
const word2 = document.querySelector( '.intro__logo-surname' )

word1.classList.add( 'fade' )

const textPath = document.querySelector( '#intro__Logo-surname' )

// const path = document.querySelector(textPath.getAttribute( 'href' ))

// const pathLength = path.getTotalLength()
// console.log(pathLength)

function updateTextPathOffset( offset ) {
  textPath.setAttribute( 'startOffset', offset )
}
// -pathLength
setInterval( updateTextPathOffset(0), 2000 )

// const strWord2 = word2.textContent
// const splitText = strWord2.split('')
// console.log(splitText)

// word2.textContent = ''
// for(let i=0; i < splitText.length; i++) {
//   word2.innerHTML += '<tspan>' + splitText[i] + '</tspan>'
// }

// let char = splitText.length - 1

// let timer = setInterval(onTick, 50)

// function onTick() {
//   const span = word2.querySelectorAll('tspan')[char]
//   // let classAnimation = 'fade' + char

//   span.classList.add('fade_surname')
//   char--
//   if (char === -1) {
//     complete()
//     return
//   }
// }

// function complete() {
//   clearInterval(timer)
//   timer = null
// }
