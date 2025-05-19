const API_URL = "http://localhost:3000/books";
let editId = null;
let modalInstance;
let allBooks = [];
let currentPage = 1;
let itemsPerPage = 5;


document.addEventListener('DOMContentLoaded', () => {
    const modalElement = document.getElementById('editModal');
    modalInstance = new bootstrap.Modal(modalElement);
});

function addOrEditBook(){
    const createBookEnvironment = document.querySelector("#createBookEnvironment");
    const updateBookEnvironment = document.querySelector("#updateBookEnvironment");

    const environment = editId ? updateBookEnvironment : createBookEnvironment;
    const inputs = environment.querySelectorAll("input");
    const formData = {};
    const inputsToCorrect = [];
    let validInputs = true;

    inputs.forEach(input => {
        input.classList.remove("is-invalid");
    });

    inputs.forEach(input => {
        const inputValue = input.value.trim();
        if (!inputValue) {
            inputsToCorrect.push(input.name);
            validInputs = false;
            input.classList.add("is-invalid");
            return;
        }
        const name = input.name || input.name || "unnamed";
        formData[name] = input.value;
    });
    if (!validInputs) {
        const missingFields = inputsToCorrect.join(", ");
        return alert(`The following fields are required: ${missingFields}`);
    }

    const xhr = new XMLHttpRequest();
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    try{
        xhr.onload = () => {
            alert(editId ? "Book updated" : "Book added");
            document.getElementById("title").value = "";
            document.getElementById("author").value = "";
            document.getElementById("editTitle").value = "";
            document.getElementById("editAuthor").value = "";
            editId = null;
            loadDataTable();
            modalInstance.hide();
        }
        
        xhr.send(JSON.stringify(formData));
    }
    catch(e){
        alert("Error saving book info. " + e)
    }

}

function editBook(id, title, author){
    document.getElementById('editTitle').value = title;
    document.getElementById('editAuthor').value = author;
    editId = id;
    modalInstance.show();
}

async function deleteBook(id) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `${API_URL}/${id}`);
    xhr.onload = () => {
      alert(`Book ${(JSON.parse(xhr.responseText)).title} deleted`);
      loadDataTable();
    };
    xhr.send();
}

function renderPagination() {
    const totalPages = Math.ceil(allBooks.length / itemsPerPage);
    const paginationContainer = document.getElementById("paginationContainer");

    let paginationHTML = `
        <ul class="pagination">
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
            </li>
    `;
    
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }

    paginationHTML += `
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
            </li>
        </ul>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
}

function changePage(page) {
    const totalPages = Math.ceil(allBooks.length / itemsPerPage);
    
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    renderTable(allBooks);
    renderPagination();
}


function renderTable(books){
    const table = document.getElementById("dataTable");
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    const booksToShow = books.slice(start, end);

    table.innerHTML = `
        <thead class="thead-light">
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            ${booksToShow.map(book => `
                <tr>
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>
                        <button class="btn btn-info" onclick="editBook('${book.id}', '${book.title}', '${book.author}')">Edit</button>
                        <button class="btn btn-danger" onclick="deleteBook('${book.id}')">Delete</button>
                    </td>
                </tr>`).join("")}
        </tbody>
    `;
}

async function loadDataTable(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", API_URL);
    xhr.onload = function () {
      allBooks = JSON.parse(xhr.responseText);
      renderTable(allBooks);
      renderPagination();
    };
    xhr.send();
}

function filterBooks(){
    const titleFilter = document.getElementById("searchTitle").value.toLowerCase();
    const authorFilter = document.getElementById("searchAuthor").value.toLowerCase();

    const books = allBooks.filter(book => {
        return (
            book.title.toLowerCase().includes(titleFilter) &&
            book.author.toLowerCase().includes(authorFilter)
        );
    })

    renderTable(books);
}

function clearFilters(){
    document.getElementById("searchTitle").value = "";
    document.getElementById("searchAuthor").value = "";
    loadDataTable();
}

loadDataTable();