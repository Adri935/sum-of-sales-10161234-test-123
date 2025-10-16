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