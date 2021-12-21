$(document).ready(() => {
  handle()
})

var point = 1
var gameOver = false
var skippedKeywords = []
var isStart = false

function getKeyWords()
{
  return [
    'nhay',
    'mua',
    'mua1',
    'mua2',
    'mua3',
    'mua4',
  ]
}

function handle()
{
  const keywords = getKeyWords().sort(() => Math.random() - 0.5)

  $('#start').click(function () {
    if (!isStart) {
      Swal.fire({
          showConfirmButton: false,
          timer: 2000,
          title: 'CHÚC MAY MẮN! =))))',
          icon: 'success',
        },
      ).then(() => {
        showKeyword(keywords[0])

        isStart = true
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
          showKeyword('GAME OVER!')
          gameOver = true
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
          showKeyword('GAME OVER!')
        }
      }
    }
  })

  $('#reset').click(() => {
    Swal.fire({
        title: 'Chắc chưa? =))',
        showCancelButton: true,
        icon: 'warning',
        confirmButtonText: 'OK!',
        cancelButtonText: 'Xí Mê =))'
      },
    ).then((res) => {
      if (res.isConfirmed) {
        window.location.href = ''
      }
    })

  })
}

function increasePoint()
{
  $('#point').html(point)
  point++
}

function showKeyword(keyword)
{
  $('#keyword').html(keyword)
}
