const calcular = new Calculos();
const calculo_form2 = document.getElementById("form2");

cargaCalculos();

function cargaCalculos()
{
    calculo_form2.addEventListener('click', (e) => {calcular.resultados2(e)});
}