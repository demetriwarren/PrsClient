import { Link } from "react-router-dom";
import { User } from "./User";
import { SyntheticEvent } from "react";

interface UserCardProps {
    user: User;
    onRemove: (user: User) => void;
}

export function UserCard({user, onRemove}: UserCardProps){
    return (
    <div className="card p-4 " style={{width: "25rem"}} >
        <div className="card-body ">
            <div>
                <h5 className="card-title">{user.username}</h5>
                
            </div>
            <div className="mt-4">
                <p className="m-0">{user.isAdmin}</p>
                <p className="m-0">{user.phone}</p>
                <p className="m-0">{user.email}</p>
            </div>
            <div>
                <Link to={`edit/${user.id}`}>Edit</Link> |
                <a className="ms-1 hover" onClick={(event: SyntheticEvent) =>{
                    event.preventDefault();
                    onRemove(user);
                }}>Delete</a>
            </div>

        </div>

    </div>
    )
}