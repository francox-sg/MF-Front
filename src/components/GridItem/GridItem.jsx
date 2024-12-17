import classes from './GridItem.module.css'



const GridItem = ({Item})=>{
    console.log(Item);
    
    return(
        <div style={{color: "blue", gridArea: Item}}>
            <p>1</p>
            <p>2</p>
            <p>3</p>
        </div>
    )
}

export default GridItem