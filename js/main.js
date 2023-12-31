    const form = document.getElementById("novoItem")
    const lista = document.getElementById("lista")
    const itens = JSON.parse(localStorage.getItem("itens")) || []

    itens.forEach( (elemento) => {
        criaElemento(elemento)
    })

form.addEventListener("submit", (evento) => {
    evento.preventDefault()
    const nome = evento.target.elements["nome"]
    const quantidade = evento.target.elements["quantidade"]
    
    const itemAtual = {
        "nome": nome.value, //"key", value
        "quantidade": quantidade.value //"key", value
    }

    const existe = itens.find(elemento => elemento.nome === nome.value)
    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens[existe.id] = itemAtual
    } else {
            itemAtual.id = itens.length

            criaElemento(itemAtual)

            itens.push(itemAtual)
        }

    
    localStorage.setItem("item", JSON.stringify(itens))
   
   
    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item) {
    //<li class="item"><strong>1</strong>Camisa</li>
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroitem = document.createElement('strong')
    numeroitem.innerHTML = item.quantidade
    numeroitem.dataset.id = item.id
    novoItem.appendChild(numeroitem)
    
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta())

    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta() {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode)
    })

    return elementoBotao
}

function deletaElemento(tag) {
    tag.remove()
}