const lista = document.querySelector('#resultado');
const url = window.location;

cargaPagina();

function cargaPagina()
{
    const head = document.createElement('th');
    head.scope = 'row';
    head.innerHTML = `
        ${url.search.split('&')[5].split('=')[1].toUpperCase()}
    `;
    lista.appendChild(head);

    for(let i = 0; i < 5; i++)
    {
        const row = document.createElement('td');
        row.innerHTML = `
            $${Math.round(parseInt(url.search.split('&')[i].split('=')[1]))}
        `;

        lista.appendChild(row);
    }
}
