import React from "react";
import {Link} from "react-router-dom";

const bookItem = (props) =>{
    return(
        <tr>
            <td>{props.term.name}</td>
            <td>{props.term.author.name} {props.term.author.surname}</td>
            <td>{props.term.category}</td>
            <td>{props.term.availableCopies}</td>
            <td>
                <a title={"MarkAsTaken"} className={"btn btn-warning"}
                   onClick={() => props.onMarkAsTaken(props.term.id)}>
                    Mark as Taken
                </a>
                <Link className={"btn btn-info me-2 ms-2"}
                      onClick={() => props.onEditBook(props.term.id)}
                      to={`/books/edit/${props.term.id}`}>
                    Edit
                </Link>
                <a title={"Delete"} className={"btn btn-danger"}
                    onClick={()=> props.onDelete(props.term.id)} >
                    Delete
                </a>

            </td>
        </tr>
    );


}
export default bookItem;