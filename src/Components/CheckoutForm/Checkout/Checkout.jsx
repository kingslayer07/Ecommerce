import React, {useState, useEffect} from 'react'
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import useStyles from './styles'
import {commerce} from '../../../lib/commerce' 
const steps =['Shipping address', 'Payment details']

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
    const classes = useStyles()
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [activeStep, setActiveStep] = useState(0)
    const [shippingData, setShippingData] = useState({})
    
    useEffect(() =>{
        const generateToken = async () =>{
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
                
                setCheckoutToken(token)
            } catch (error) {
                
            }
        }
        generateToken()
    },[cart])

    const nextStep = () => setActiveStep((previousStep) => previousStep +1)
    const backStep = () => setActiveStep((previousStep) => previousStep -1)

    const next = (data) =>{
        setShippingData(data)
        nextStep()
    }
    
    const Confirmation =() =>{
        return   <div>pkka na ?</div>
    }
    
    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next}/>
         : <PaymentForm shippingData={shippingData} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} checkoutToken={checkoutToken} backStep={backStep} />
    

    return (
        <>
            <div className={classes.toolbar}></div>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key ={step}>
                            <StepLabel> {step}</StepLabel>

                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
