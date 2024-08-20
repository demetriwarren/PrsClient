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
                <h5 className="card-title">{user.firstname} {user.lastname}</h5>
                <span className="badge text-bg-primary">{user.username}</span>
                <div className="">
                <p className="m-0">{user.isAdmin && "Admin"}</p>
                <p className="m-0 ">{user.isReviewer && "Reviewer"}</p>
                </div>
                <p className="m-0">{(!user.isReviewer && !user.isAdmin) && "No role assigned"}</p>
                
            </div>
            <div className="mt-4">
                <p className="m-0">{user.phone}</p>
                <p className="m-0">{user.email}</p>
            </div>
            <div className="mt-3">
                <Link className="btn btn-outline-primary px-2 py-1" to={`edit/${user.id}`}>Edit</Link>
                <a className="ms-2 btn btn-outline-primary px-2 py-1" onClick={(event: SyntheticEvent) =>{
                    event.preventDefault();
                    onRemove(user);
                }}>Delete</a>
            </div>

        </div>

    </div>
    )
}