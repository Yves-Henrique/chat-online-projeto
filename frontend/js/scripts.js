//para iniciar o projeto//
//entrar na pasta pelo terminal com: cd backend//
//npm run dev - para iniciar o servidor//





//login elements
const login = document.querySelector(".login")
const loginForm = login.querySelector(".login__form")
const loginInput = login.querySelector(".login__input")


//chat elements
const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".chat__form")
const chatInput = chat.querySelector(".chat__input")
const chatMessages = chat.querySelector(".chat__messages")

const colors = [
    "cadetBlue",
    "darkgoldenred",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold"
]
const user = { id: "", name: "", color: "" }

let websocket

const creatMessageSelfElement = (content) => {
    const div = document.createElement("div")

    div.classList.add("message--self")
    div.innerHTML = content
    return div
}
//elemento de propria mensagem

const creatMessageOtherElement = (content, sender, senderColor) => {
    const div = document.createElement("div")
    const span = document.createElement("span")
    div.classList.add("message--other")
    div.classList.add("message--self")
    span.classList.add("message--sender")
    span.style.color = senderColor

    div.appendChild(span)
    span.innerHTML = sender
    div.innerHTML += content
    return div
}


const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    //funcao Math gera um numero aleatorio dentre os itens dentro do cumprimento do seu array (const colors)
    //Math.floor arrendonda para o numero pra baixo
    return colors[randomIndex]
}

const scrollScreen = () =>{
    window.scrollTo ({
        top: document.body.scrollHeight, behavior:"smooth"
    })
}
const processMessage = ({ data }) => {
    const { userId, userName, userColor, content } = JSON.parse(data) //JSON.parse(data) converte novamente para objeto e manusear ele

    const message = 
        userId == user.id 
            ? creatMessageSelfElement(content) 
            : creatMessageOtherElement(content, userName, userColor)
            //basicamente é um if else. Se(if) o userId for igual ao meu id ele executa o creatmsgSefl senão(else) ele executa o creatmsgOther e mostra os elementos do outro Id


        chatMessages.appendChild(message)
        
        scrollScreen()
}

const handleLogin = (event) => {
    event.preventDefault()
    //event.preventDefault serve para não recarregar a pag quando o formulario for enviado
    user.id = crypto.randomUUID()
    user.name = loginInput.value
    user.color = getRandomColor()


    login.style.display = "none"
    chat.style.display = "flex"

    websocket = new WebSocket("ws://localhost:8080")
    websocket.onmessage = processMessage
    //a variavel let websocket está puxando dos dados do próprio js o WebSocket para criar uma conexão com o servidor

    // websocket.onopen = () => websocket.send(`Usuário ${user.name} entrou no chat!`)
    //onopen é para quando a conexão estiver aberta ai sim será enviado uma mensagem atráves da function
}

const sendMessage = (event) => {
    event.preventDefault()

    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value

    }

    websocket.send(JSON.stringify(message))

    chatInput.value = ""
}

loginForm.addEventListener("submit", handleLogin)
chatForm.addEventListener("submit", sendMessage)