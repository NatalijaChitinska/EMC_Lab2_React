import axios from "../custom-axios/axios";

const ELibraryService = {
    fetchAuthors: () => {
        return axios.get("/authors")
    },
    fetchBooks: () => {
        return axios.get("/books")
    },
    fetchCategories: () => {
        return axios.get("/categories")
    },
    fetchCountries: () => {
        return axios.get("/countries")
    },
    deleteBook: (id) =>{
        return axios.delete(`/books/delete/${id}`)
    },
    addBook: (name, author, category, availableCopies) =>{
        return axios.post("/books/add", {
            "name": name,
            "author": author,
            "category" : category,
            "availableCopies": availableCopies
        }).then(function (response){
            console.log(response)
        }).catch(function(error) {
            console.log(error.response.data);
        })
    },
    editBook: (id, name, author, category, availableCopies) =>{
        return axios.put(`/books/edit/${id}`, {
            "name": name,
            "author": author,
            "category" : category,
            "availableCopies": availableCopies
        })
    },
    getBook: (id) =>{
        return axios.get(`/books/${id}`);
    },
    decreaseCopies:(id) =>{
        return axios.get(`/books/${id}/decreaseCopies`);
    }

}

export default ELibraryService;