/* eslint-disable func-names */
/* eslint-disable camelcase */
/* eslint-disable no-alert */
/* eslint-disable array-callback-return */
/* eslint-disable  consistent-return */


const addnote = document.querySelector('.add_note');
const formcontainer = document.querySelector('.form-container');

const form = document.querySelector('form');
const button = document.querySelector('button');
let booklist = [];
function Book(title, name, pages, readstatus = false) {
  this.title = title;
  this.name = name;
  this.pages = pages;
  this.readstatus = readstatus;
}

let read = '';

Book.prototype.info = function () {
  if (this.readstatus) {
    read = 'Read!';
    return read;
  }
  read = 'Not Read!';
  return read;
};
Book.prototype.toggleStatus = function () {
  this.readstatus = !this.readstatus;
};


if (localStorage.length < 1) {
  booklist = [
    {
      title: 'Lord of the Rings', name: 'JRR Tolkien', pages: 300, readstatus: true,
    },
    {
      title: 'Neuromante', name: 'William Gibson', pages: 200, readstatus: true,
    },
    { title: 'The Call of The Wild', name: 'Jack London', pages: '80' },
    {
      title: "Hitchiker's Guide to The Galaxy", name: 'Douglas Adams', pages: '250', readstatus: true,
    },
  ];
} else {
  const storedlist = localStorage.getItem('booklist');
  booklist = JSON.parse(storedlist);
}


const render = function (template, node, container = document.createElement('div')) {
  container.innerHTML = template;
  node.appendChild(container);
};


booklist.forEach((book) => {
  const bookexec = new Book(book.title.trim(), book.name.trim(), book.pages, book.readstatus);
  const node = document.getElementById('title');
  const template = `<div class="card m-4 p-relative text-center">
                    <div class="card-body mt-5">
                    <h5 class="card-title">${bookexec.name}</h5>
                    <p class="card-text">${bookexec.title}</p>
                    
                    <p class="card-text text-center"><span class="font-weight-bolder">Number of pages:  ${bookexec.pages}</span></p>
                    <a href="#" class="btn btn-info ptl-0">${bookexec.info()}</a>
                    <a href="#" class="btn btn-danger remove w-100">Remove Book</a>
                    </div>
                </div>`;
  render(template, node);
});


button.addEventListener('click', (e) => {
  e.preventDefault();


  if (form.book_title.value.length < 3 || form.author_name.value.length < 3) {
    alert('Sorry Book title and Author name should be at least 3 characters long!');
  } else {
    booklist.push({
      title: form.book_title.value.trim(),
      name: form.author_name.value.trim(),
      pages: form.book_pages.value,
      readstatus: form.book_status.value,
    });
    localStorage.setItem('booklist', JSON.stringify(booklist));

    const node = document.getElementById('title');
    const AddBook = new Book(form.book_title.value.trim(),
      form.author_name.value.trim(),
      form.book_pages.value,
      form.book_status.value);
    const template = `<div class="card text-center m-4">
                    <div class="card-body mt-5">
                    <h5 class="card-title">${form.author_name.value}</h5>
                    <p class="card-text">${form.book_title.value}</p>
                    <a href="#" class="btn btn-info ptl-0">${AddBook.info()}</a>
                    <p class="card-text text-center"><span class="font-weight-bolder">Number of pages:  ${form.book_pages.value}</span></p>
                  
                    <a href="#" class="btn btn-danger remove w-100">Remove Book</a>
                    </div>
                </div>`;
    render(template, node);
    form.reset();
    formcontainer.classList.remove('d-flex');
  }
});

const shelve = document.querySelector('.book-lists');

shelve.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    const text = e.target.parentElement.children[1].innerText;
    alert('You are about to remove this book!');
    booklist = booklist.filter((books) => {
      if (books.title !== text) {
        return books;
      }
    });


    localStorage.setItem('booklist', JSON.stringify(booklist));
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains('ptl-0')) {
    const text = e.target.parentElement.children[1].innerText;

    booklist.find((books) => {
      if (books.title === text) {
        books.readstatus = !books.readstatus;
        const runbook = new Book(books.title, books.name, books.pages, books.readstatus);
        e.target.innerText = runbook.info();

        localStorage.setItem('booklist', JSON.stringify(booklist));
      }
    });
  }
});

addnote.addEventListener('click', () => {
  formcontainer.classList.add('d-flex');
});
formcontainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('form-container')) {
    formcontainer.classList.remove('d-flex');
  }

  e.stopImmediatePropagation();
});

/* eslint-enable func-names */
/* eslint-enable camelcase */
/* eslint-enable no-alert */
/* eslint-enable array-callback-return */
/* eslint-enable  consistent-return */