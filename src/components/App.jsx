import React, { useState } from "react";
import Auth from "./Auth";
import LeadForm from "./LeadForm"
import authenticate from "../authenticate";

const isServer = typeof window === 'undefined';

const getTokenAws = () => {
    if (isServer) { return null; }
    return localStorage.getItem("tokenAwsCognito");
}

function App() {
    const tokenAwsCognito = getTokenAws()
    const [token, setToken] = useState(tokenAwsCognito);
    const logout = () => {
        localStorage.removeItem("tokenAwsCognito");
        setToken("")
    }

    const login = async (data) => {
        try {
            const token = await authenticate(data);
            localStorage.setItem("tokenAwsCognito", token);
            setToken(token);
        } catch (ex) {
            alert(ex);
        }
    }

    return (
        <div class="container">
            <br /><br /><br /><br /><br /><br />
            {token ?
                <>
                    <button className="btn btn-secondary" onClick={() => logout()}>Logout</button>
                    <hr />
                    <LeadForm />
                </>
                : <Auth login={login} />
            }
        </div>
    );
}
export default App;