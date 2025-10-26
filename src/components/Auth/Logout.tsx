import {logout} from "@/lib/actions/logout";

function Logout() {
    return (
        <form action={logout}>
            <button>Log out</button>

        </form>
    );
}

export default Logout;
