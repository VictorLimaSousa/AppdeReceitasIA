let sabor = "";
let refeicao = "";
let ingredientes = "";

const SelecionarSabor = (elemento,valor)=>{
    
    let sabores = document.querySelectorAll('.sabor');

    sabores.forEach( item =>{
        item.classList.remove('selecionado');
    });

    elemento.classList.add('selecionado');
    sabor = valor;
}

const SelecionarRefeicao = (elemento,valor)=>{
    
    let refeicoes = document.querySelectorAll('.refeicao');

    refeicoes.forEach( item =>{
        item.classList.remove('selecionado');
    });

    elemento.classList.add('selecionado');
    refeicao = valor;
}

const GerarReceita = () =>{
   ingredientes = document.querySelector('#ingrediente').value;
    
    window.location.href = `/resultado.html?sabor=${sabor}&refeicao=${refeicao}&ingrediente${ingredientes}`

  
}

const parametrosURL = new URLSearchParams(window.location.search);
const APIKEY = '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';
const URL = ' https://api.openai.com/v1/chat/completions ';

if (parametrosURL.size > 2) {
    sabor = parametrosURL.get("sabor")
    refeicao = parametrosURL.get("refeicao")
    ingredientes = parametrosURL.get("ingredientes")

    if (sabor != null) {
        const elemento1 = document.querySelector('#' + sabor);
        elemento1.style.display = "flex";
    }

    if (refeicao != null) {
        const elemento1 = document.querySelector('#' + refeicao);
        elemento1.style.display = "flex";
    }

    const dados = {
        model: "gpt-4o-mini",
        messages: [{
            role:'user',
    content:`Me der uma receita para um $(refeicao) que seja $(sabor), sendo que em casa tenho apenas $(ingredientes)`}],
        temperature: 0.7
    }
                  
        fetch(URL,{
            method: 'POST',
            headers: {"Content-Type": "application/json",
                "Authorization": "Bearer " +APIKEY
            },
            body: JSON.stringify(dados)
        })
        .then(response => response.json())
        .then(result => {
            console.log(result.choices[0].messages.content)

            if (result.choices[0].message.content != null){
                document.querySelector('.resultados').innerHTML = result.choices[0].message.content.replace(/\n/g, '<br>')
            }
        })
        .catch(erro => {
            console.log(erro);
            document.querySelector('.resultados').innerHTML = 'Infelimente não foi possivel gerar a sua receita :( , tente novamente mais tarde!'

            
        });

        const Gerar_nova_receita = () =>{
            window.location.reload()
        }
        
        const voltar = () =>{
            window.location.href = 'index.html'
        }
        
    }     
            
        
                       
            
                
            
        


