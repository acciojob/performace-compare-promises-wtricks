// Array of API URLs to fetch data from
const apiUrls = [
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/2",
    "https://jsonplaceholder.typicode.com/todos/3",
    "https://jsonplaceholder.typicode.com/todos/4",
    "https://jsonplaceholder.typicode.com/todos/5",
    "https://jsonplaceholder.typicode.com/todos/6",
    "https://jsonplaceholder.typicode.com/todos/7",
    "https://jsonplaceholder.typicode.com/todos/8",
    "https://jsonplaceholder.typicode.com/todos/9",
    "https://jsonplaceholder.typicode.com/todos/10"
];

const fetchData = async (url) => {
    const start = performance.now();
    const response = await fetch(url);
    const data = await response.json();
    const end = performance.now();
    return { url, time: ((end - start) / 1000).toFixed(3) };
};

const outputAllTable = document.getElementById('output-all');
const outputAnyTable = document.getElementById('output-any');

async function fetchDataAndDisplay() {
    const allPromises = apiUrls.map(url => fetchData(url));
    const anyPromises = apiUrls.map(url => fetchData(url)).map(promise => promise.catch(() => undefined));

    const allResults = await Promise.all(allPromises);
    const anyResults = await Promise.any(anyPromises);

    allResults.forEach(result => {
        const newRow = outputAllTable.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);

        cell1.textContent = result.url;
        cell2.textContent = result.time;
    });

    const newRow = outputAllTable.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);

    cell1.textContent = 'Total';
    cell2.textContent = (allResults.reduce((acc, result) => acc + parseFloat(result.time), 0)).toFixed(3);

    const anyRow = outputAnyTable.insertRow();
    const anyCell1 = anyRow.insertCell(0);
    const anyCell2 = anyRow.insertCell(1);

    anyCell1.textContent = anyResults.url;
    anyCell2.textContent = anyResults.time;
}

fetchDataAndDisplay();
