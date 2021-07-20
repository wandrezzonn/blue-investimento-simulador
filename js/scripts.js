const
  range = document.getElementById('range'),
  rangeV = document.getElementById('rangeV'),
  setValue = () => {
    const
      newValue = Number((range.value - range.min) * 100 / (range.max - range.min)),
      newPosition = 10 - (newValue * 0.2);
    rangeV.innerHTML = `<span>${range.value}</span>`;
    rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
  };
document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue);

String.prototype.reverse = function () {
  return this.split('').reverse().join('');
};

function moeda(campo, evento) {
  var tecla = (!evento) ? window.event.keyCode : evento.which;
  var valor = campo.value.replace(/[^\d]+/gi, '').reverse();
  var resultado = "";
  var mascara = "##.###.###.###.###,##".reverse();
  for (var x = 0, y = 0; x < mascara.length && y < valor.length;) {
    if (mascara.charAt(x) != '#') {
      resultado += mascara.charAt(x);
      x++;
    } else {
      resultado += valor.charAt(y);
      y++;
      x++;
    }
  }
  campo.value = resultado.reverse();
}
function calcular() {
  var juros = null;
  var total = ''
  var mes ='Mês'
  var valorEmprestimo =null ;
  var valorImovel = null;
  var valorEmp = null;
  var valorIm = null;
  const meses = Number(document.getElementById('rangeV').textContent)
   valorEmprestimo = document.getElementById('valorEmprestimo')
   valorImovel = document.getElementById('valorImovel')

   

if(valorEmprestimo.value && valorImovel.value){
  var container = document.getElementById('container')
  var div = document.getElementById('novaDIV')
 valorEmp = toFloat(valorEmprestimo.value)
 valorIm = toFloat(valorImovel.value)

 total = aplicarJuros(valorEmp,valorIm,meses).toFixed(2);
 juros = taxaDeJuros(valorIm)

 if(meses>1){
 mes = "Meses"
 }
 total = converteFloatMoeda(total)
if(div){
  div.remove()
}
  var conteudoNovoDiv = document.createElement('div')

   conteudoNovoDiv.className = 'col card novaDIV'
   conteudoNovoDiv.id = 'novaDIV'
   conteudoNovoDiv.style.maxWidth = '35%'
   conteudoNovoDiv.style.minWidth = '35%'
   conteudoNovoDiv.style.marginLeft = '-40%'
   conteudoNovoDiv.innerHTML=`<h5 class="card-title" style="text-align: center; margin-top: 5%;">Valor da Parcela</h5><span style="text-align: center";>${total}</span><hr><br>`;
   conteudoNovoDiv.innerHTML= conteudoNovoDiv.innerHTML + `<h6 class="card-title" style="text-align: center; margin-top: 5%;">Prazo para pagamento: </h6><br>`;
   conteudoNovoDiv.innerHTML= conteudoNovoDiv.innerHTML + `<span  style="text-align: center; margin-top: -6%; font-size=12px">${meses} ${mes}</span><br>`;
   conteudoNovoDiv.innerHTML= conteudoNovoDiv.innerHTML + `<span  style="text-align: center; margin-top: -6%; font-size=12px">Taxa de Juros: ${juros}</span><br>`;
   conteudoNovoDiv.innerHTML= conteudoNovoDiv.innerHTML + `<h5  style="text-align: center; margin-top: -6%; font-size=12px">Amortização: TABELA PRICE</h5><br>`;
   conteudoNovoDiv.innerHTML= conteudoNovoDiv.innerHTML + `<h7  style="text-align: center; margin-top: -6%; font-size=12px">A taxa de juros varia a partir de 0.99% ao mês, dependendo do tipo de imóvel. A parcela apresentada já inclui os custos aproximados com avaliação do imóvel,seguros e custos cartoriais.</h7><br>`;
   container.append(conteudoNovoDiv)
}
 

}

function aplicarJuros(valorEmprestimo,valorImovel,meses){
  var cemMil = toFloat('100.000,00');
  var retorno = null;
  if(valorImovel <= cemMil){
    retorno = valorEmprestimo/meses;
    retorno += retorno * 0.01
    return retorno;
  }else{
    retorno = valorEmprestimo/meses
    retorno += retorno * 0.015
    return retorno;
     
  }


}

function taxaDeJuros(valorImovel){
  var cemMil = toFloat('100.000,00');
  if(valorImovel <= cemMil){
    
    return '1%';
  }else{
   
    return '1.5%';
     
  }


}




function converteFloatMoeda(valor){
  var inteiro = null, decimal = null, c = null, j = null;
  var aux = new Array();
  valor = ""+valor;
  c = valor.indexOf(".",0);
  
  if(c > 0){
     
     inteiro = valor.substring(0,c);
     decimal = valor.substring(c+1,valor.length);
  }else{
     inteiro = valor;
  }
  
 
  for (j = inteiro.length, c = 0; j > 0; j-=3, c++){
     aux[c]=inteiro.substring(j-3,j);
  }
  
 
  inteiro = "";
  for(c = aux.length-1; c >= 0; c--){
     inteiro += aux[c]+'.';
  }
 
  
  inteiro = inteiro.substring(0,inteiro.length-1);
  
  decimal = parseInt(decimal);
  if(isNaN(decimal)){
     decimal = "00";
  }else{
     decimal = ""+decimal;
     if(decimal.length === 1){
        decimal = decimal+"0";
     }
  }
  
  
  valor = "R$ "+inteiro+","+decimal;
  
  
  return valor;

}

function toFloat(num) {
  dotPos = num.indexOf('.');
  commaPos = num.indexOf(',');

  if (dotPos < 0)
      dotPos = 0;

  if (commaPos < 0)
      commaPos = 0;

  if ((dotPos > commaPos) && dotPos)
      sep = dotPos;
  else {
      if ((commaPos > dotPos) && commaPos)
          sep = commaPos;
      else
          sep = false;
  }

  if (sep == false)
      return parseFloat(num.replace(/[^\d]/g, ""));

  return parseFloat(
      num.substr(0, sep).replace(/[^\d]/g, "") + '.' + 
      num.substr(sep+1, num.length).replace(/[^0-9]/, "")
  );

}