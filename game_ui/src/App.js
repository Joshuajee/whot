import {BrowserRouter, Route} from 'react-router-dom';

import Home from "./Routes/Home";
import Rules from "./Routes/Rules";
import Leaderboard from "./Routes/Leaderboard";
import Settings from "./Routes/Settings";
import GamePlay from "./Routes/GamePlay";
import CreateAgent from "./Routes/CreateAgent";

const home =  () => <Home />
const rules =  () => <Rules />
const leaderboard = () => <Leaderboard />
const settings = () => <Settings />
const game = () => <GamePlay />
const createAgent = () => <CreateAgent />


const App = () => {

    return(
        <BrowserRouter>
            <Route path="/" exact={true} component={home} />
            <Route path="/home" exact={true} component={home} />
            <Route path="/rules" exact={true} component={rules} />
            <Route path="/leaderboard" exact={true} component={leaderboard} />
            <Route path="/settings" exact={true} component={settings} />
            <Route path="/create-agent" exact={false} component={createAgent}/>
            <Route path="/game/:user" exact={false} component={game}/>
        </BrowserRouter>
    )
}

export default App;