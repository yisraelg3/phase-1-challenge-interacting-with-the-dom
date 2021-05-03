document.addEventListener('DOMContentLoaded', function() {
    const counter = document.getElementById('counter')   
    const plus = document.getElementById('plus')
    const minus = document.getElementById('minus')
    const heart = document.getElementById('heart')
    const pause = document.getElementById('pause') 
    const amountofLikes = {}
    counter.textContent = 0 
    let timeoutId

    comments()
    start() 

    function start() {
        timeoutId = setInterval (() => {
        counter.textContent ++}, 1000)
    }


    const body = document.querySelector('body')
    body.addEventListener('click', (event) => {
        if (event.target.id === 'minus') {
            counter.textContent --
        } else if (event.target.id === 'plus') {
            counter.textContent ++
        } else if (event.target.id === 'pause') {
            pauseFunc(timeoutId)
        } else if (event.target.id === 'heart') {
            like()
        }
    })

    function pauseFunc (timeoutId) {
        if (pause.innerText === 'pause') {
            pause.innerText = 'resume'
            plus.disabled = true
            minus.disabled = true
            heart.disabled = true
            clearInterval(timeoutId)
        } else if (pause.innerText === 'resume') {
            pause.innerText = 'pause'
            plus.disabled = false
            minus.disabled = false
            heart.disabled = false
            start()
        }
    }    

    function like () {
        const countNum = counter.innerText
        const ul = document.getElementsByClassName('likes')[0]
        if (amountofLikes[countNum] === undefined) {
            Object.assign(amountofLikes, {[countNum]: {'amount': 0}})
        }
        const amount = amountofLikes[countNum].amount + 1
        if (document.getElementById(countNum) === null) {
            const li = document.createElement('li')    
            li.innerText = `${countNum} has ${amount} like!`
            li.id = countNum
            ul.appendChild(li)
        } else {
            const liOld = document.getElementById(countNum)
            liOld.innerText = `${countNum} has ${amount} likes!`
        }
        amountofLikes[countNum].amount = amount 
    }
        function comments () {
            const submit = document.getElementById('submit')
            submit.addEventListener('click', (event) => {
                addPTag(event)
                event.target.parentElement["comment-input"].value = ''
            })
        }

        function addPTag (event) {
            event.preventDefault()
            const list = document.getElementById('list')
            const p = document.createElement('p')
            p.textContent = event.target.parentElement["comment-input"].value
            list.appendChild(p)
        }


})