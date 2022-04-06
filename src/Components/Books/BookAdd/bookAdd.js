import React from "react";
import {Navigate, useNavigate} from "react-router-dom"

const BookAdd = (props) => {

    const navigate = useNavigate()
    const [formData, updateFormDate] = React.useState({
        name: "",
        author: "",
        category: "",
        availableCopies: 0
    })
    const handleChange = (e) =>{
        updateFormDate({
            ...formData,
            [e.target.name]:e.target.value.trim()
        })
    }
    const onFormSubmit = (e) =>{
        e.preventDefault();

        const name = formData.name;
        const author = formData.author;
        const category = formData.category;
        const availableCopies = formData.availableCopies;

        props.onAddBook(name, author, category, availableCopies);
        navigate("/books");
    }

    return(
        <div className={"row mt-5"}>
            <div className={"col-md-5"}>
                <form onSubmit={onFormSubmit}>
                    <div className={"form-group"}>
                        <label htmlFor="name">Name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               required
                               placeholder="Enter book name"
                               onChange={handleChange}
                        />
                    </div>
                        <div className="form-group">
                            <label>Author</label>
                            <select name="author" className="form-control" onChange={handleChange}>
                                {props.authors.map((term) =>
                                    <option selected value={term.id}>{term.name} {term.surname}</option>
                                )}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" className="form-control" onChange={handleChange}>
                                {props.categories.map((term) =>
                                    <option selected value={term}>{term}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="availableCopies">Available Copies</label>
                            <input type="text"
                                   className="form-control"
                                   id="availableCopies"
                                   name="availableCopies"
                                   placeholder="available copies"
                                   required
                                   onChange={handleChange}
                            />
                        </div>
                    <button type="submit" id="submit" className={"btn btn-primary mt-2"} >Submit</button>
                </form>
            </div>
        </div>
    )
}
export default BookAdd