import React from "react";
import {useNavigate} from "react-router-dom";

const ProductEdit = (props) =>{
    const navigate = useNavigate()
    const [formData, updateFormDate] = React.useState({
        name: "",
        author: 0,
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

        const name = formData.name !== "" ? formData.name : props.book.name;
        const author = formData.author !== 0 ? formData.author : props.book.author;
        const category = formData.category !== "" ? formData.category : props.book.category;
        const availableCopies = formData.availableCopies !== 0 ? formData.availableCopies : props.book.availableCopies;

        props.onEditBook(props.book.id, name, author, category, availableCopies);
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
                               placeholder={props.book.name}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select name="author" className="form-control" onChange={handleChange}>
                            {props.authors.map((term) => {
                                if (props.book.author !== undefined && props.book.author === term)
                                    return <option selected value={term.id}>{term.name} {term.surname}</option>
                                else
                                    return <option value={term.id}>{term.name} {term.surname}</option>
                            }

                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control" onChange={handleChange}>
                            {props.categories.map((term) =>{
                                if(props.book.category !== undefined && props.book.category === term)
                                    return <option selected value={term}>{term}</option>
                                else
                                    return <option value={term}>{term}</option>
                                }
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableCopies">Available Copies</label>
                        <input type="text"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               placeholder={props.book.availableCopies}
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

export default ProductEdit;