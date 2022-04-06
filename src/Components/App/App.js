
import './App.css';
import {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Categories from "../Categories/categories"
import Books from "../Books/BookList/books"
import BookAdd from "../Books/BookAdd/bookAdd"
import BookEdit from "../Books/BookEdit/bookEdit"
import Header from "../Header/header"
import ELibraryService from "../../repository/elibraryRepository";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            books: [],
            categories: [],
            countries: [],
            selectedBook: {}
        }
    }

    render() {
        return(
          <Router>
              <Header/>
              <main>
                  <div className={"container"}>
                      <Routes>
                          <Route path={"/categories"} element={<Categories
                              categories={this.state.categories}
                          />}/>
                          <Route path={"/books/add"} element={<BookAdd
                              categories={this.state.categories}
                              authors={this.state.authors}
                              onAddBook = {this.addBook}

                          />}/>
                          <Route path={"/books/edit/:id"} element={<BookEdit
                              categories={this.state.categories}
                              authors={this.state.authors}
                              onEditBook={this.editBook}
                              book={this.state.selectedBook}
                          />}/>
                          <Route path={"/books"} element={<Books
                              books={this.state.books}
                              onDelete={this.deleteBook}
                              onEditBook={this.getBook}
                              onMarkAsTaken={this.decreaseCopies}
                          />}/>
                          <Route path={"/"} element={<Books
                              books={this.state.books}
                              onDelete={this.deleteBook}
                              onEditBook={this.state.getBook}
                              onMarkAsTaken={this.decreaseCopies}
                          />}/>
                      </Routes>
                  </div>
              </main>
          </Router>
        )
    }

    loadCategories = () => {
        ELibraryService.fetchCategories()
            .then((data) =>{
                this.setState({
                    categories: data.data
                })
            })
    }

    loadBooks = () =>{
        ELibraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            })
    }

    loadAuthors = () =>{
        ELibraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors:data.data
                })
            })
    }

    deleteBook = (id) =>{
        ELibraryService.deleteBook(id)
            .then(() =>{
                this.loadBooks();
            })
    }

    addBook = (name, author, category, availableCopies) =>{
        ELibraryService.addBook(name, author, category, availableCopies)
            .then(() => {
                this.loadBooks()
            })
    }

    getBook = (id) =>{
        ELibraryService.getBook(id)
            .then((data)=>{
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    editBook = (id, name, author, category, availableCopies) => {
        ELibraryService.editBook(id, name, author, category, availableCopies)
            .then(() =>{
                this.loadBooks();
            })
    }

    componentDidMount() {
        this.loadCategories()
        this.loadBooks()
        this.loadAuthors()
    }
    decreaseCopies =(id) =>{
        ELibraryService.decreaseCopies(id)
            .then(()=>{
                this.loadBooks();
            });
    }
}

export default App;
