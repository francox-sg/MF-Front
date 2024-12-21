import classes from './Slider.module.css'


const Slider = ({value = true, handlerValue , colorTrue="#d1d0d0", colorFalse = "#d1d0d0", letterTrue = "", letterFalse =""}) => {

    return (
        <div onClick={handlerValue} className={classes.sliderContainer}>
            <div style={value ? {backgroundColor: colorTrue} : {backgroundColor:colorFalse, translate:"20px"}} className={classes.sliderCenter /* `${classes.sliderCenter} ${ value ? classes.sliderTrue : classes.sliderFalse}` */}>
                <p className={classes.sliderLetra}>{value ? letterTrue : letterFalse}</p>
            </div>
        </div>
    )
}

export default Slider