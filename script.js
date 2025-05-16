

function add(){

    const inputs = document.querySelectorAll("input");
    const formData = {};
    const newRowData = {};

    inputs.forEach(input => {
        const name = input.name || input.name || "unnamed";
        formData[name] = input.value;
    });

    const url = 'http://localhost:3000/books';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
    .then(data => {
        this.newRowData = data;
        alert("Book successfully submitted.");
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error saving book info.");
    });

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
}

async function deleteBook(id) {
    await fetch(`http://localhost:3000/books/${id}`, {method: 'DELETE'});
    createDataTable();
    alert('Deleted');
}

async function createDataTable(){
    // const response = await fetch('http://localhost:3000/books');
    // const dataInTable = await response.json();

    // dataInTable.forEach(data => {
    //         // var rowNode = table.row
    //         //     .add([data.title, data.author])
    //         //     .draw()
    //         //     .node();
    //     })

        
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/books");
    xhr.onload = function () {
      const books = JSON.parse(xhr.responseText);
      const table = document.getElementById("dataTable");
      table.innerHTML = `
                        <thead class="thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Action</th>
                            </tr>
                        </thead>`
      books.forEach(book => {
        table.innerHTML += `
          <tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>
              <button type="button" class="btn btn-danger center" onclick="deleteBook('${book.id}')">Delete</button>
            </td>
          </tr>
        `;
      });
    };
    xhr.send();
}

createDataTable();