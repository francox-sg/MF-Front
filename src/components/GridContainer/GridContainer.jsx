import classes from './GridContainer.module.css'
import GridItem from '../GridItem/GridItem'
const GridContainer = ()=>{
    return(
        <div className={classes.container}>
            <GridItem Item = "Item1" />
            <GridItem Item = "Item2" />
            <GridItem Item = "Item3" />
        </div>
    )
}

export default GridContainer