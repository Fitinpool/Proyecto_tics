const fondosAFP = {
    capital : [1.0052538280408596, 1.004527221543641, 1.0061774025897503, 1.0033380295383023, 1.0032576602600798],
    cuprum : [1.0052459611277158, 1.004527221543641, 1.0064184974022432, 1.0034584508349766, 1.0034022740126778],
    habitat : [1.0053245998017803, 1.0046302455190648, 1.0064262640857444, 1.0035386434752658, 1.0034664732719605],
    modelo : [1.005277424717846, 1.0045192918063746, 1.0062941407136823, 1.0033380295383023, 1.0032978537514263],
    planvital : [1.0049701916105216, 1.0043367175322409, 1.0063252457367005, 1.0030322487646148, 1.0028224379721813],
    provida : [1.0053088774793386, 1.004384380809392, 1.0061306655932825, 1.003153074208474, 1.0030241880399],
    uno : [1.005277424717846, 1.0045192918063746, 1.0062941407136823, 1.0033380295383023, 1.0032978537514263]   
};

const vidaEstimada = {
    hombre : 85,
    mujer : 90
}

class Calculos
{
    resultados1(e)
    {
        e.preventDefault();
        const form = e.target.parentElement.parentElement;
        var pensionFondo = this.pensionFutura(form);

        var url = "./resultados1.html" + "?";

        for(let i = 0; i < 5; i++)
        {
            url += "f" + i + "=" + pensionFondo[i];

            url += "&";
        }

        url += 'afp=' + form.querySelector('#AFP').value.toString();
        location.href = url;
    }

    resultados2(e)
    {
        e.preventDefault();
        const form = e.target.parentElement.parentElement;
        var pensionFondo = this.pensionDeseada(form);

        var url = "./resultados2.html" + "?";

        for(let i = 0; i < 5; i++)
        {
            url += "f" + i + "=" + pensionFondo[i];

            url += "&";
        }

        url += 'afp=' + form.querySelector('#AFP').value.toString();
        location.href = url;
    }

    pensionFutura(form)
    {
        var cotizacionTotal = (parseInt(form.querySelector("#Sueldo").value))* 0.1 + parseInt(form.querySelector("#APV").value);

        const fecha = new Date();

        var fechaNac = form.querySelector("#Fecha_N").value.split('-');

        var EdadEnMeses= (fecha.getFullYear() - parseInt(fechaNac[0]))*12 + (fecha.getMonth() + 1 - parseInt(fechaNac[1]));

        var EdadJubilacion = parseInt(form.querySelector('#Edad_J').value);

        var mesesParaJubilar= EdadJubilacion*12 - EdadEnMeses;

        var fondos = parseInt(form.querySelector("#Saldo").value);

        var fondoTotal = [fondos,fondos,fondos,fondos,fondos];

        for(var i = 0; i < 5; i++)
        {
            for(var j = 0; j < mesesParaJubilar; j++)
            {
                fondoTotal[i] += cotizacionTotal;

                fondoTotal[i] = fondoTotal[i] * fondosAFP[form.querySelector('#AFP').value.toString()][i]; // fondoTotal[i] + fondoTotal[i] * 0.003
            }
        }

        console.log(vidaEstimada[form.querySelector('#Sexo').value.toString()]);
        var pension = [];
        for(var i = 0; i < 5; i++)
        {

            pension.push(fondoTotal[i]/((vidaEstimada[form.querySelector('#Sexo').value.toString()] - EdadJubilacion)*12));
             //cambiar promedio de vida ondoTotal[i]/((vidaEstimada[form.querySelector('#Sexo').value.toString()] - EdadJubilacion)*12)
        }

        return pension;
        
    }

    pensionDeseada(form)
    {
        var cotizacionTotal = (parseInt(form.querySelector("#Sueldo").value))* 0.1;

        const fecha = new Date();

        var fechaNac = form.querySelector("#Fecha_N").value.split('-');

        var EdadEnMeses= (fecha.getFullYear() - parseInt(fechaNac[0]))*12 + (fecha.getMonth() + 1 - parseInt(fechaNac[1]));

        var EdadJubilacion = parseInt(form.querySelector('#Edad_J').value);

        var mesesParaJubilar= EdadJubilacion*12 - EdadEnMeses;

        var fondos = parseInt(form.querySelector("#Saldo").value);

        var fondoTotal = [fondos,fondos,fondos,fondos,fondos];

        for(var i = 0; i < 5; i++)
        {
            for(var j = 0; j < mesesParaJubilar; j++)
            {
                fondoTotal[i] += cotizacionTotal;

                fondoTotal[i] = fondoTotal[i] * fondosAFP[form.querySelector('#AFP').value.toString()][i];
            }
        }

        var fondoFuturo = [];

        for(var i = 0; i < 5; i++)
        {
            fondoFuturo.push((vidaEstimada[form.querySelector('#Sexo').value.toString()] - EdadJubilacion)*12*parseInt(form.querySelector('#PDAF').value));
        }

        var fondoFaltante = []; 
        
        for(var i = 0; i < 5; i++)
        {
            fondoFaltante.push(fondoFuturo[i] - fondoTotal[i]); 
        }

        var rentabilidadVoluntaria = [0,0,0,0,0];
        for(var i = 0; i < 5; i++)
        {
            for(var j = 0; j < mesesParaJubilar; j++)
            {
                rentabilidadVoluntaria[i] = (rentabilidadVoluntaria[i] + 1)*fondosAFP[form.querySelector('#AFP').value.toString()][i]
            }
        }
        
        var APV = [];

        for(var i = 0; i < 5; i++)
        {   
            if(fondoFaltante[i] / rentabilidadVoluntaria[i] < 0)
            {
                APV.push(0); 
            }
            else
            {
                APV.push(fondoFaltante[i] / rentabilidadVoluntaria[i]); 
            }
        }

        return APV;
    }

}