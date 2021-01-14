import chooseCard from "../../GameLogic/chooseCard";

function Player(props) {
    
    let width = window.innerWidth
    let height = window.innerHeight
    let cardSize = height/10
    let angle = props.angle

    const style = {
        position:"absolute",
        top:height * props.top - cardSize,
        left:width / 2 - cardSize * 0.6666666667 - width * 0.2,
        align:"center",
        width: width * 0.5,
        transform: "rotate(" + angle + "deg)"
        
    }


    return(
        <div style={style} className="in-play">
           {displayCards(props.cards, cardSize)}
        </div>
        )


}

function play(card) {
    console.log(card)
}

function displayCards(cards, cardSize) {
    
    let cardArray = []

    for(let i = 0; i < cards.length; i++){
        cardArray.push(<span onClick = {() => play(cards[i])}> { chooseCard(cards[i], cardSize) } </span>)
    }

    return cardArray
}

export default Player



//https://help.heroku.com/sharing/e46fcc46-a4a6-4e3c-ac8a-e7f0021d65b7