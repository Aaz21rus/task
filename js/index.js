const word1 = document.querySelector('.intro__logo-name')
const word2 = document.querySelector('.intro__logo-surname')

word1.classList.add('fade')

const strWord2 = word2.textContent
const splitText = strWord2.split('')
console.log(splitText)

word2.textContent = ''
for(let i=0; i < splitText.length; i++) {
  word2.innerHTML += '<span>' + splitText[i] + '</span>'
}

let char = splitText.length - 1

let timer = setInterval(onTick, 50)

function onTick() {
  const span = word2.querySelectorAll('span')[char]
  // let classAnimation = 'fade' + char
  
  span.classList.add('fade_surname')
  char--
  if (char === -1) {
    complete()
    return
  }
}

function complete() {
  clearInterval(timer)
  timer = null
}
