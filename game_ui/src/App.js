import {BrowserRouter, Route} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import Home from "./Routes/Home";
import Rules from "./Routes/Rules";
import Leaderboard from "./Routes/Leaderboard";
import Settings from "./Routes/Settings";
import GamePlay from "./Routes/GamePlay";
import CreateAgent from "./Routes/CreateAgent";
import { setHeight, setIsLandscape, setWidth } from './Redux/actions';


const home =  () => <Home />
const rules =  () => <Rules />
const leaderboard = () => <Leaderboard />
const settings = () => <Settings />
const game = () => <GamePlay />
const createAgent = () => <CreateAgent />


const App = () => {

    const { height, width } = useSelector((state) => state);

    const dispatch = useDispatch();

    useEffect(() => {

        window.onresize = () => {
            dispatch(setHeight(window.innerHeight));
            dispatch(setWidth(window.innerWidth));
        }

        window.onorientationchange = () => {
            dispatch(setHeight(window.innerHeight));
            dispatch(setWidth(window.innerWidth));
        }

    }, [dispatch]);

    useEffect(() => {

        if(height > width) {
            dispatch(setIsLandscape(false));
        } else {
            dispatch(setIsLandscape(true));
        }

    }, [height, width, dispatch]);

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