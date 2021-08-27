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
        const fondosAFP = {
            capital : [1.0058, 1.0046, 1.0064, 1.0034, 1.0033],
            cuprum : [1.0054, 1.0046, 1.0067, 1.0035, 1.0035],
            habitat : [1.0055, 1.0048, 1.0067, 1.0036, 1.0035],
            modelo : [1.0054, 1.0046, 1.0065, 1.0034, 1.0034],
            planvital : [1.0051, 1.0044, 1.0066, 1.0031,1.0029],
            provida : [1.0055, 1.0045, 1.0063, 1.0032, 1.0031],
            uno : [1.0054, 1.0046, 1.0065, 1.0034, 1.0034]
        };

        const vidaEstimada = {
            hombre : 85,
            mujer : 90
        }

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

                fondoTotal[i] = fondoTotal[i] * fondosAFP[form.querySelector('#AFP').value.toString()][i];
            }
        }

        console.log(vidaEstimada[form.querySelector('#Sexo').value.toString()]);
        var pension = [];
        for(var i = 0; i < 5; i++)
        {

            pension.push(fondoTotal[i]/((vidaEstimada[form.querySelector('#Sexo').value.toString()] - EdadJubilacion)*12));
             //cambiar promedio de vida ondoTotal[i]/((vidaEstimada[form.querySelector('#Sexo').value.toString()] - EdadJubilacion)*12)
        }

        console.log(pension);

        return pension;
        
    }

    pensionDeseada(form)
    {

        const fondosAFP = {
            capital : [1.0058, 1.0046, 1.0064, 1.0034, 1.0033],
            cuprum : [1.0054, 1.0046, 1.0067, 1.0035, 1.0035],
            habitat : [1.0055, 1.0048, 1.0067, 1.0036, 1.0035],
            modelo : [1.0054, 1.0046, 1.0065, 1.0034, 1.0034],
            planvital : [1.0051, 1.0044, 1.0066, 1.0031,1.0029],
            provida : [1.0055, 1.0045, 1.0063, 1.0032, 1.0031],
            uno : [1.0054, 1.0046, 1.0065, 1.0034, 1.0034]
        };

        const vidaEstimada = {
            hombre : 85,
            mujer : 90
        }
        
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