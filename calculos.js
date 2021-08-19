class Calculos
{

    pensionFutura(e)
    {
        e.preventDefault();


        const form = e.target.parentElement.parentElement;

        var cotizacionTotal = (parseInt(form.querySelector("#Sueldo").value))* 0.1 + parseInt(form.querySelector("#APV").value);

        const fecha = new Date();

        var fechaNac = form.querySelector("#Fecha_N").value.split('-');

        var EdadEnMeses= (fecha.getFullYear() - parseInt(fechaNac[0]))*12 + (fecha.getMonth() + 1 - parseInt(fechaNac[1]));

        var EdadJubilacion = parseInt(form.querySelector('#Edad_J').value);

        var mesesParaJubilar= EdadJubilacion*12 - EdadEnMeses;

        var fondoTotal = parseInt(form.querySelector("#Saldo").value);

        for(var i = 0; i < mesesParaJubilar; i++)
        {
            fondoTotal = fondoTotal + cotizacionTotal;
            fondoTotal = fondoTotal * 1.003;
        }

        var pension = fondoTotal/(95 - EdadJubilacion); //cambiar promedio de vida

        console.log(pension);

    }

    pensionDeseada(e)
    {
        e.preventDefault();


        const form = e.target.parentElement.parentElement;

        var cotizacionTotal = (parseInt(form.querySelector("#Sueldo").value))* 0.1;

        const fecha = new Date();

        var fechaNac = form.querySelector("#Fecha_N").value.split('-');

        var EdadEnMeses= (fecha.getFullYear() - parseInt(fechaNac[0]))*12 + (fecha.getMonth() + 1 - parseInt(fechaNac[1]));

        var EdadJubilacion = parseInt(form.querySelector('#Edad_J').value);

        var mesesParaJubilar= EdadJubilacion*12 - EdadEnMeses;

        var fondoTotal = parseInt(form.querySelector("#Saldo").value);

        for(var i = 0; i < mesesParaJubilar; i++)
        {
            fondoTotal = fondoTotal + cotizacionTotal;
            fondoTotal = fondoTotal * 1.003;
        }

        var fondoFuturo = (95 - EdadJubilacion)*12*parseInt(form.querySelector('#PDAF').value);

        var fondoFaltante = fondoFuturo - fondoTotal;

        var rentabilidadVoluntaria = 0;
        for(var i = 0; i < mesesParaJubilar; i++)
        {
            rentabilidadVoluntaria = (rentabilidadVoluntaria + 1)*1.003
        }

        var APV = fondoFaltante / rentabilidadVoluntaria;

        console.log(APV);
    }

}