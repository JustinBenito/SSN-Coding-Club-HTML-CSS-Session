const API_KEY = "YOUR_API_KEY";
const submitButton = document.querySelector('#submit')
const inputElement = document.querySelector('input')
const chatElement = document.querySelector('.chat-container')
const historyElement = document.querySelector('.history')

async function getMessage(){
    console.log('clicked')
    const userInput = inputElement.value
    if(userInput=='') return

    const inp = document.createElement('div')
    inp.classList.add('bg-gray-100', 'text-gray-800','rounded-lg', 'p-3', 'mb-2')
    inp.textContent = userInput
    chatElement.append(inp)

    

    try {
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "user",
                    content: userInput
                }]
            })
        }
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data =  await response.json()
        // console.log(response)
        console.log(data)
        const out = document.createElement('div')
        out.classList.add('bg-blue-100', 'text-gray-800','rounded-lg', 'p-3', 'mb-2')
        out.textContent= data.choices[0].message.content
        chatElement.append(out)

        const pElement = document.createElement('p')
        pElement.textContent=userInput
        historyElement.append(pElement)
    }
    catch(error){
        console.error(error)
    }
}

submitButton.addEventListener('click', getMessage)