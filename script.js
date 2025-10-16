// JavaScript code
async function fetchData() {
    const dataUrl = 'data:text/csv;base64,UHJvZHVjdHMsU2FsZXMKUGhvbmVzLDEwMDAKQm9va3MsMTIzLjQ1Ck5vdGVib29rcywxMTEuMTEK';
    try {
        const response = await fetch(dataUrl);
        const text = await response.text();
        const { headers, rows } = parseCsv(text);
        const salesIndex = headers.indexOf('Sales');
        const totalSales = rows.reduce((sum, row) => sum + parseFloat(row[salesIndex] || 0), 0);
        document.querySelector('#total-sales').textContent = totalSales.toFixed(2);

        const tbody = document.querySelector('#product-sales tbody');
        rows.forEach(row => {
            const tr = document.createElement('tr');
            const productCell = document.createElement('td');
            const salesCell = document.createElement('td');
            productCell.textContent = row[0];
            salesCell.textContent = row[salesIndex];
            tr.appendChild(productCell);
            tr.appendChild(salesCell);
            tbody.appendChild(tr);
        });
    } catch (error) {
        document.querySelector('#total-sales').textContent = 'Error loading data';
        console.error('Error fetching data:', error);
    }
}

function parseCsv(text) {
    const rows = text.trim().split('\n').map(row => row.split(/[,;\t]/));
    const headers = rows[0];
    return { headers, rows: rows.slice(1) };
}

fetchData();