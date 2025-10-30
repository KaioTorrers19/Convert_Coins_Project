
 let rates={}

 const form = document.querySelector("form")

 const amount = document.querySelector("#amount");

 const currency = document.querySelector("#currency");

 const description = document.querySelector("#description");

 const result = document.querySelector("#result");

 const footer = document.querySelector("footer");

// Manipulando o input amount para receber somente números
amount.addEventListener("input", () => {
    const hasCharactersRegex = /[^0-9.,]/g;
    // Amount recebe ele mesmo, utilizando o replace que substitui tudo que não for numero por vazio
    amount.value =amount.value.replace(hasCharactersRegex, '');
    amount.value = amount.value.replace(',', '.');
})


// função para consumir a API de cotação
async function exchangerateApi() {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/BRL');
     const data = await response.json();
     rates=data.rates;
     return data;
}

exchangerateApi();



// Conversão De moeda
form.onsubmit = (event) =>{

       event.preventDefault();

       switch (currency.value) {
        case "USD":
         var convert = ( amount.value / rates.USD).toFixed(2); 
            break;
        case "EUR":
            var convert = ( amount.value / rates.EUR).toFixed(2); 
            break;
        case "GBP":
            var convert = ( amount.value / rates.GBP).toFixed(2); 
            break;
          
            
          

}
// formatação do valor convertido para o padrão BRL
 const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: "BRL"
    }).format(convert);
    
    footer.classList.add("show-result"); 
    description.innerText =  `1 ${currency.value} = ${ (1 / rates[currency.value]).toFixed(2)} Reais`;
    result.innerText = ` ${formatted}`; 
};

 
   


