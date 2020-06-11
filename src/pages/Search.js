import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import SearchBar from "../components/SearchBar";
import FlexContainer from "../components/FlexContainer";
import Tag from "../components/Tag";
import Wrapper from "../components/Wrapper";
import SectionTitle from "../components/SectionTitle";
import Card from "../components/Card";
import Results from "../components/Results";
import Dropdown from "../components/Dropdown";
import API from "../utils/API.js";

class Search extends Component {
    state = {
        query: "",
        results: [],
        search: false
    }

    //search the google books api
    searchBooks = query => {
        API.findBooks(query).then(response => {
            const results = [];
            //for loop throws an error if response data is undefined, so need to write a conditional to prevent that
            if (response.data.totalItems !== 0) {
                // only push in information utilized in this application
                for (let i = 0; i < response.data.items.length; i++) {
                    let resultObj = {};
                    resultObj.title = response.data.items[i].volumeInfo.title;
                    //change author name to anonymous if no author is listed
                    let author = response.data.items[i].volumeInfo.authors;
                    (author === undefined) ? resultObj.author = "Anonymous" : resultObj.author = author;
                    resultObj.description = response.data.items[i].volumeInfo.description;
                    resultObj.image = response.data.items[i].volumeInfo.imageLinks.thumbnail;
                    resultObj.link = response.data.items[i].volumeInfo.canonicalVolumeLink;
                    resultObj.date = response.data.items[i].volumeInfo.publishedDate;
                    results.push(resultObj);
                }
            }
            //change search to true in order to display results
            this.setState({
                results: results,
                search: true
            })
        });
    }

    //update query value every time user inputs something in the search
    handleInput = event => {
        let value = event.target.value;
        this.setState({ query: value });
    }

    //when user submits a query, prevent page from refreshing and make an api call to
    //google books
    handleSubmit = event => {
        event.preventDefault();
        this.searchBooks(this.state.query);
        //clear value after search
        document.querySelector(".search-bar").value = "";
    }

    //add reading status to data and send as a post request
    saveBook = (data, status) => {
        let savedData = data;
        savedData.status = status;
        API.saveBook(savedData);
    }

    //display tags on page
    renderTags() {
        const tags = ["Adventure", "Comedy", "Light Novel", "Literature", "Romance", "Sci-Fi", "Fiction"];
        return tags.map(tags => <Tag name={tags} click={this.searchBooks} />);
    }

    //only show results section title if user has submitted a search
    renderSectionTitle() {
        if (this.state.results !== undefined && this.state.search && this.state.results.length > 0) {
            return <SectionTitle>Displaying {this.state.results.length} Results</SectionTitle>;
        } else if (this.state.results.length === 0 && this.state.search) {
            return <SectionTitle>No Results Found</SectionTitle>;
        } else {
            return false;
        }
    }

    renderResults() {
        if (this.state.results !== undefined) {
            return this.state.results.map(results =>
                <Card>
                    <Dropdown>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <div className="dropdown-item" onClick={() => this.saveBook(results, "Reading")}>Add to Reading</div>
                            <div className="dropdown-item" onClick={() => this.saveBook(results, "Plan to Read")}>Add to Plan to Read</div>
                            <div className="dropdown-item" onClick={() => this.saveBook(results, "Completed")}>Add to Completed</div>
                        </div>
                    </Dropdown>
                    <Results bookData={results} />
                </Card>
            )
        } else {
            return false;
        }
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="title">Search for the <span className="emphasis">Perfect</span> Book</h1>
                    <h4 className="subtitle">Explore the Google Books database for a new read.</h4>
                </Jumbotron>
                <SearchBar change={this.handleInput} submit={this.handleSubmit}/>
                <FlexContainer>
                    {this.renderTags()}
                </FlexContainer>
                <Wrapper>
                    {this.renderSectionTitle()}
                    {this.renderResults()}
                </Wrapper>
            </div>
        )
    }
}

export default Search;