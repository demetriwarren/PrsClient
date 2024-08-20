import { useEffect, useState } from "react";

import { userAPI } from "./UserApi";
import { User} from "./User";
import { UserCard } from "./UserCard";
import toast from "react-hot-toast";

//gonna have the useState of vendors/useForm in here
//need the busy state,
export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [busy, setBusy] = useState(false);

  //async function loadVendors() which has a var called data, which awaits the VendorAPIlist
  async function loadUsers() {
    try {
      setBusy(true);
      let data = await userAPI.list();
      setUsers(data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setBusy(false);
    }
  }

  //useEffect() - needed for the API calls. Has an open array for rendering only after first render. loadVendors inside of the arrow function
  useEffect(() => {
    loadUsers();
  }, []);

  async function remove(user: User){
    if(confirm("Are you sure you want to delete this user?"))
        if(user.id){
            await userAPI.delete(user.id);
            let updatedUsers = users.filter((u) => u.id !== user.id);
            setUsers(updatedUsers);
            toast.success("Successfully deleted.");
        }
  }

  return (
    <>
        {busy && (
            <section className="d-flex justify-content-center align-items-center align-content-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </section>
        )}
        <section className="d-flex flex-wrap gap-5">
            {users.map((user) => (
                <UserCard key={user.id} user={user} onRemove={remove}/>
            ))}
        </section>
    </>
  )
}
