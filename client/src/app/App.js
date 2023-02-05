import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Parts from "../app/layouts/parts";
import Login from "../app/layouts/login";
import Main from "../app/layouts/main";
import NavBar from "./components/ui/navBar";
import About from "../app/layouts/about";
import Users from "./layouts/users";
import AppLoader from "./components/ui/hoc/appLoader";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import Busket from "./layouts/busket";
import Works from "./layouts/works";
import Footer from "./components/ui/footer";
import AddPart from "./components/page/addPart/addPart";

function App() {
    return (
        <div>
            <AppLoader>
                <NavBar />
                <Switch>
                    <ProtectedRoute
                        path="/users/:userId?/:edit?"
                        component={Users}
                    />
                    <Route path="/parts/:partId?" component={Parts} />
                    <Route path="/add" component={AddPart} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/busket" component={Busket} />
                    <Route path="/works" component={Works} />
                    <Route path="/about" component={About} />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>
                <Footer />
            </AppLoader>
        </div>
    );
}

export default App;
