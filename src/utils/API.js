import axios from "axios";

export default {
    //api call to get book listings from google books
    findBooks: query => {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    },
    //gets all of the saved books
    getBooks: () => {
        return axios.get("/api/books");
    },
    //allow users to save books on the search page
    saveBook: data => {
        return axios.post("/api/books", data);
    },
    //allow users to delete their books from the saved page
    deleteBook: id => {
        return axios.delete(`/api/books/${id}`);
    },
    //change reading status of book
    updateBook: (id, status) => {
        return axios.put(`/api/books/${id}`, status);
    }
}