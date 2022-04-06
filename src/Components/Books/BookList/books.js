import React from "react";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate"

import BookItem from "../BookItem/bookItem";

class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 5
        }
    }

    render() {

        const pageCount = Math.ceil(this.props.books.length / this.state.size);
        const offset = this.state.size * this.state.page;
        const nextPageOffset = offset + this.state.size;
        const books = this.getBooksPage(offset, nextPageOffset);

        return (
            <div className={"container mm-4 mt-5"}>
                <div className={"row"}>
                    <div className={"table-responsive"}>
                        <table className={"table table-striped"}>
                            <thead>
                            <tr>
                                <th scope={'col'}>Name</th>
                                <th scope={'col'}>Author</th>
                                <th scope={'col'}>Category</th>
                                <th scope={'col'}>Available copies</th>
                            </tr>
                            </thead>
                            <tbody>
                            {books}
                            </tbody>
                        </table>
                    </div>

                    <div className={"col"}>
                        <div className={"row"}>
                            <div className={"col-md-12 col-sm-12"}>
                                <Link className={"btn btn-dark btn-block"}
                                      to={"/books/add"}>
                                    Add new book
                                </Link>
                            </div>
                        </div>
                    </div>
                    <ReactPaginate previousLabel={"back"}
                                   nextLabel={"next"}
                                   breakLabel={<a href="/#">...</a>}
                                   breakClassName={"break-me"}
                                   pageClassName={"ml-1"}
                                   pageCount={pageCount}
                                   marginPagesDisplayed={2}
                                   pageRangeDisplayed={5}
                                   onPageChange={this.handlePageClick}
                                   containerClassName={"pagination m-4 justify-content-center"}
                                   activeClassName={"active"}
                    />
                </div>
            </div>
        )
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({
            page: selected
        })
    }

    getBooksPage = (offset, nextPageOffset) => {
        return this.props.books.map((term) => {
            return (
                <BookItem term={term}
                          onDelete={this.props.onDelete}
                          onEditBook={this.props.onEditBook}
                          onMarkAsTaken={this.props.onMarkAsTaken}/>
            )
        }).filter((book, index) => {
            return index >= offset && index < nextPageOffset;
        })
    }
}

export default Books