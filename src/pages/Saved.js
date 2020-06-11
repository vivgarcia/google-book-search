import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Wrapper from "../components/Wrapper";
import Section from "../components/Section";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";
import Results from "../components/Results";
import Dropdown from "../components/Dropdown";
import API from "../utils/API.js";

class Saved extends Component {
    state = {
        results: []
    }

    //display all saved books from the database on load
    componentWillMount() {
        this.getBooks();
    }

    getBooks = () => {
        API.getBooks().then(response => {
            this.setState({ results: response.data });
        });
    }

    //delete a specific book
    deleteBook = id => {
        API.deleteBook(id).then(this.getBooks());
    }

    //change status and move book to a different section
    changeStatus = (id, status) => {
        API.updateBook(id, {status: status}).then(this.getBooks());
    }

    //check if any books are saved
    //if no books, notify that there are no books saved,
    //else render saved book sections
    checkResults() {
        if (this.state.results.length === 0 || this.state.results === undefined) {
            return <Wrapper>
                <SectionTitle>No books currently saved.</SectionTitle>
            </Wrapper>;
        } else {
            return (
                <Wrapper>
                    {this.renderResults("Reading")}
                    {this.renderResults("Completed")}
                    {this.renderResults("Plan to Read")}
                </Wrapper>
            );
        }
    }

    //display sections depending on if there are books in that section
    renderResults(status) {
        let readingStatus = this.state.results.filter(results => results.status === status);
        if (readingStatus !== undefined && readingStatus.length !== 0) {
            return (
                <Section>
                    <SectionTitle>{status}</SectionTitle>
                    {readingStatus.map(results =>
                        <Card>
                            <Dropdown>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <div className="dropdown-item" onClick={() => this.changeStatus(results._id, "Reading")}>Move to Reading</div>
                                    <div className="dropdown-item" onClick={() => this.changeStatus(results._id, "Plan to Read")}>Move to Plan to Read</div>
                                    <div className="dropdown-item" onClick={() => this.changeStatus(results._id, "Completed")}>Move to Completed</div>
                                    <div className="dropdown-item" onClick={() => this.deleteBook(results._id)}>Delete Book</div>
                                </div>
                            </Dropdown>
                            <Results bookData={results} />
                        </Card>
                    )}
                </Section>
            );
        } else {
            return false;
        }
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="title">View All Your <span className="emphasis">Saved</span> Books</h1>
                    <h4 className="subtitle">Monitor your reading progress.</h4>
                </Jumbotron>
                {this.checkResults()}
            </div>
        )
    }
}

export default Saved;