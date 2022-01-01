(function() {
    const inputElm = document.querySelector('#input')
    const formElm = document.querySelector('form')
    const winScoreElm = document.querySelector('.winScore')

    const p1BtnElm = document.querySelector('.p1Btn')
    const p1ScoreElm = document.querySelector('.p1Score')
    const p2BtnElm = document.querySelector('.p2Btn')
    const p2ScoreElm = document.querySelector('.p2Score')

    const resetBtnElm = document.querySelector('.reset')


    //data layer
    //view layer(DOM)
    let winScore = 20
    let p1Score = 0
    let p2Score = 0
    let turn = 'player1'

    //setting initial score
    winScoreElm.textContent = winScore
    p1ScoreElm.textContent = p1Score
    p2ScoreElm.textContent = p2Score

    //random number generate for player1 & player2 click
    function generateRanNum(max) {
        return Math.floor(Math.random() * max + 1)
    }

    ///validations
    function validateInput(inputVal) {
        if(inputVal === '' || inputVal < 1) {
            if (!document.querySelector('.invalid-input')) {
                formElm.insertAdjacentHTML('beforebegin',
                '<p class="invalid-input">Please input valid number</p>')
            }else{
                if(document.querySelector('.invalid-input')) {
                    document.querySelector('.invalid-input').remove()
                }
            }
        }
    }

    formElm.addEventListener('submit', e => {
        e.preventDefault()
        const inputVal = +inputElm.value
        //validation
        validateInput(inputVal)
            
        //setting data layer
        winScore = +inputElm.value
        //setting view layer
        winScoreElm.textContent = winScore
        //clearing the input
        inputElm.value = ''
        //change to all default state
        initialPlayState()
    })
    

    p1BtnElm.addEventListener('click', e => {
        if (turn === 'player1') {
            p1Score = generateRanNum(winScore)
            p1ScoreElm.textContent = p1Score
            turn = 'player2'
            p1BtnElm.setAttribute('disabled', 'disabled')
            p2BtnElm.removeAttribute('disabled')

            checkWinner()
        }
    })

    function checkWinner() {
        const isp1Winner = winScore === p1Score
        const isp2Winner = winScore === p2Score
        console.log(isp1Winner, isp2Winner);

        if(isp1Winner || isp2Winner) {
            p1BtnElm.setAttribute('disabled', 'disabled')
            p2BtnElm.setAttribute('disabled', 'disabled')
        }

        displayWinner(isp1Winner, isp2Winner)
    }

    function displayWinner(p1WinState, p2WinState) {
        if(p1WinState) {
            formElm.insertAdjacentHTML('beforebegin',
            '<p class="winnerMes">Player1 is Winner</p>')
        }else if(p2WinState) {
            formElm.insertAdjacentHTML('beforebegin', 
            '<p class="winnerMes">Player2 is Winner</p>')
        }
    }

    p2BtnElm.addEventListener('click', e => {
        if (turn === 'player2') {
            p2Score = generateRanNum(winScore)
            p2ScoreElm.textContent = p2Score
            turn = 'player1'
            p2BtnElm.setAttribute('disabled', 'disabled')
            p1BtnElm.removeAttribute('disabled')

            checkWinner()
        }
    })

    ///reset
    resetBtnElm.addEventListener('click', e => {
        winScore = 20
        
        initialPlayState()
    })

    function initialPlayState() {
        p1Score = 0
        p2Score = 0
        turn = 'player1'

        winScoreElm.textContent = winScore
        p1ScoreElm.textContent = p1Score
        p2ScoreElm.textContent = p2Score

        p1BtnElm.removeAttribute('disabled')
        p2BtnElm.removeAttribute('disabled')
        ///reset winning meggage
        if (document.querySelector('.winnerMes')) {
            document.querySelector('.winnerMes').remove()
        }
    }
})()

//IIFE