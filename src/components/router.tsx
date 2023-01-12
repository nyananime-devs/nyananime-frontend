/* Base */
import { h, FunctionalComponent } from "preact";
import { Router } from "preact-router";
/* Components */
import Home from "../routes/home";
import All from "../routes/all";
import Settings from "../routes/settings";
import Download from "../routes/download";
import Status from "../routes/status";
import Login from "../routes/login";
import Register from "../routes/register";
import Show from "../routes/show";
import Group from "../routes/group";
import Episode from "../routes/episode";

const AppRouter: FunctionalComponent<any> = (props: AppConnectedProps) => {
    return (
        <Router>
            <Home path="/" dimensions={props.dimensions} users={props.users}
                shows={props.shows} groups={props.groups} episodes={props.episodes} random={props.random}
                session={props.session} actions={props.actions} dictionary={props.dictionary} preferences={props.preferences} />
            <All path="/all" dimensions={props.dimensions} shows={props.shows} groups={props.groups} filterData={props.filterData} preferences={props.preferences} session={props.session} actions={props.actions} dictionary={props.dictionary} />
            <Settings path="/settings" user={props.user}
                session={props.session} actions={props.actions} preferences={props.preferences} dictionary={props.dictionary} />
            <Download path="/download" session={props.session} actions={props.actions} preferences={props.preferences} dictionary={props.dictionary} />
            <Status path="/status" session={props.session} actions={props.actions} preferences={props.preferences} dictionary={props.dictionary} />
            <Login path="/login" session={props.session} actions={props.actions} preferences={props.preferences} dictionary={props.dictionary} authResult={props.authResult} />
            <Register path="/register" session={props.session} actions={props.actions} preferences={props.preferences} dictionary={props.dictionary} authResult={props.authResult} />
            <Show path="/shows/:id" id="" shows={props.shows} episodes={props.episodes} user={props.user}
                session={props.session} actions={props.actions} preferences={props.preferences} dictionary={props.dictionary} />
            <Group path="/groups/:id" id="" dimensions={props.dimensions} shows={props.shows} groups={props.groups}
                session={props.session} actions={props.actions} preferences={props.preferences} dictionary={props.dictionary} />
            <Episode path="/episodes/:id" id="" dimensions={props.dimensions} playerData={props.playerData} shows={props.shows} episodes={props.episodes} encodes={props.encodes} segments={props.segments}
                session={props.session} actions={props.actions} preferences={props.preferences} dictionary={props.dictionary} />
        </Router>
    );
};

export default AppRouter;
