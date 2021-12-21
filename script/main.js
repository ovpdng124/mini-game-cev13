import { getKeywords } from './keyword.js'

$(document).ready(() => {
  handle()
})

var allKeywords = getKeywords()
var point = 1
var gameOver = false
var skippedKeywords = []
var isStart = false

function handle() {
  const keywords = allKeywords.sort(() => Math.random() - 0.5)

  $('#start').click(function () {
    if (!isStart) {
      Swal.fire({
          showConfirmButton: false,
          timer: 2000,
          title: 'CHÚC MAY MẮN! =))))',
        },
      ).then(() => {
        showKeyword(keywords[0])
        isStart = true

        $('#start').prop('disabled', true)
        $('#pause').prop('disabled', false)
        $('#pause').trigger('click')
      })
    }
  })

  $('#next').click(() => {
    if (isStart) {
      keywords.shift()
      if (keywords.length) {
        showKeyword(keywords[0])
      } else {
        if (skippedKeywords.length) {
          showKeyword(skippedKeywords[0])
          skippedKeywords.shift()
        } else {
          handleGameOver('GAME OVER!')
        }
      }

      if (!gameOver) {
        increasePoint()
      }
    }
  })

  $('#skip').click(() => {
    if (isStart) {
      if (keywords.length) {
        skippedKeywords.push(keywords[0])
        keywords.shift()

        if (!keywords.length) {
          showKeyword(skippedKeywords[0])
          skippedKeywords.shift()
        } else {
          showKeyword(keywords[0])
        }
      } else {
        if (skippedKeywords.length) {
          showKeyword(skippedKeywords[0])
          skippedKeywords.shift()
        } else {
          handleGameOver('GAME OVER!')
        }
      }
    }
  })

  $('#reset').click(() => {
    Swal.fire({
        title: 'ĐÃ LƯU LẠI ĐIỂM SỐ CHƯA?',
        showCancelButton: true,
        icon: 'warning',
        confirmButtonText: 'OK!',
        cancelButtonText: 'CHƯA =))',
      },
    ).then((res) => {
      if (res.isConfirmed) {
        window.location.href = ''
      }
    })
  })
}

function increasePoint() {
  $('#point').html(point)
  point++
}

function showKeyword(keyword) {
  $('#keyword').html(keyword.toUpperCase())
}

export function handleGameOver(message = "TIME'S UP!") {
  gameOver = true
  showKeyword(message)

  $('.section-keyword').addClass('bg-danger')
  $('#pause').trigger('click')
  $('#pause').prop('disabled', true)
  $('#skip').prop('disabled', true)
  $('#next').prop('disabled', true)
}