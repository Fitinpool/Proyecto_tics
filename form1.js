const calcular = new Calculos();
const calculo_form1 = document.getElementById("form1");

cargaCalculos();

function cargaCalculos()
{
    calculo_form1.addEventListener('click', (e) => {calcular.resultados1(e)});
}