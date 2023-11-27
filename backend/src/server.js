const { WebSocketServer } = require("ws")
//importando classe da biblioteca ws
const dotenv = require("dotenv")
//const acima referente ao arquivo .env

dotenv.config()
//possibilita pegar as informações do arquivo .env

const wss = new WebSocketServer({ port: process.env.PORT || 8080 })
//process Objeto global
//wss =new WebsocketServer nosso servidor 
//caso não exista uma porta no process.env.port ele ira tentar utilizar o valor alternativo da porta, no caso 8080


wss.on("connection", (ws) => {
    //quando alguem se conectar no nosso servidor vai executar tudo que está aqui dentro
    
    ws.on("error", console.error)
    //ws.on("error"), envia uma msg para qundo acontecer um erro no servidor atráves do console
    ws.on("message", (data) => {
        //dentro do webSocketServer ou wss que é o nosso servidor tem um atributo que envia os dados (data) para todos os que estão conectados no servidor
        wss.clients.forEach((client)=> client.send(data.toString()))
        //linha acima executa tudo, ou seja, cliente entrou no nosso servidor e enviou uma msg, o wss vai pegar todos os clientes e enviara as msg para eles
    })
    //ws.on("message"), esse evento vai ser disparado sempre que alguem enviar algo para o servidor, nessa function (data)=>{}
    console.log("cliente connected")
})