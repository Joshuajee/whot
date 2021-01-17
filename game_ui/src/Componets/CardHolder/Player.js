import chooseCard from "../../GameLogic/chooseCard";
import axios from "axios"

function Player(props) {
    
    let width = window.innerWidth
    let height = window.innerHeight
    let cardSize = height/10
    let angle = props.angle
    let margin = (width / 2) - cardSize * 0.6666666667 - width * 0.2
    console.log(props.position)

    const style = {
        position:"absolute",
        top:height * props.top - cardSize,
        left: margin,
        align:"center",
        width: (width - margin * 2),
        transform: "rotate(" + angle + "deg)"
        
    }


    return(
        <div style={style} className="in-play">
           {displayCards(props.cards, cardSize)}
        </div>
        )


}

function play(card) {



    let req = {
                cardAtHand:{type:Array, default:[]},
                cardInPlay:{type:String, default:""},
                cardPlayed:{type:Array, default:[]},
                noOfCardsInMarket:{type:Number, default:0},
                noOfCardsWithOpponent:{type:Number, default:0},
                availableMove:{type:Array, default:[]},
                rules: {"holdOn":{"active":true, "card":1, "defend":false},
                        "pickTwo":{"active":true, "card":2, "defend":false},
                        "pickThree":{"active":true, "card":5, "defend":false}, 
                        "suspension":{"active":true, "card":8, "defend":false},
                        "generalMarket":{"active":true, "card":14, "defend":false}
                    }
    
            }

    axios.post("/api/play/",{agentName:"Jee", cardAtHand:[]}).then((response)=>{
        console.log(response)
    })
    //console.log(card)
}

function displayCards(cards, cardSize) {
    
    let cardArray = []

    for(let i = 0; i < cards.length; i++){
        cardArray.push(<span onClick = {() => play(cards[i])}> { chooseCard(cards[i], cardSize) } </span>)
    }

    return cardArray
}

export default Player