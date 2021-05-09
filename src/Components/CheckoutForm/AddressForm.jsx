import React,  {useState, useEffect} from  'react'
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core'
import {useForm, FormProvider} from 'react-hook-form' 
import  FormInput from './CustomTextField'
import {commerce} from '../../lib/commerce'
const AddressForm = ({checkoutToken}) => {
    const methods = useForm()
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')
     
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name}))
    
    const options = shippingOptions.map((sO) => ({id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}))

    const fetchShippingCountries = async (checkoutTokenId) => {
        const {countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
        // console.log(countries)
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    }
    const fetchSubdivisions = async (countryCode) => {
        const {subdivisions } = await commerce.services.localeListSubdivisions(countryCode)
        // console.log(countries)
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region= null) =>{
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region}) 

        setShippingOptions(options)
        setShippingOption(options[0].id)
    }

    useEffect(() =>{
        fetchShippingCountries(checkoutToken.id)
    },[])

    useEffect(() =>{
      if(shippingCountry)  fetchSubdivisions(shippingCountry)
    },[shippingCountry])

    useEffect(() =>{
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    }, [shippingSubdivision])

    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit='' >
                    <Grid   container spacing={3} >
                        <FormInput required name='firstname' label='First Name'/>     
                        <FormInput required name='lastname' label='Last Name'/>     
                        <FormInput required name='address1' label='Address'></FormInput>     
                        <FormInput required name='email' label='Email'></FormInput>     
                        <FormInput required name='city' label='City'></FormInput>     
                        <FormInput gutterBottom required name='pin' label='Pin Code'></FormInput>     
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value) }>
                                {/* {console.log(Object.entries(shippingCountries))} */}
                                {countries.map((country) =>{
                             return   <MenuItem 
                                    key={country.id} 
                                    value={country.id} >
                                        {country.label}
                                </MenuItem>
                                

                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value) }>
                                {/* {console.log(Object.entries(shippingCountries))} */}
                                {subdivisions.map((subdivision) =>{
                             return   <MenuItem 
                                    key={subdivision.id} 
                                    value={subdivision.id} >
                                        {subdivision.label}
                                </MenuItem>
                                

                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Optins</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value) }>
                                {/* {console.log(Object.entries(shippingCountries))} */}
                                {options.map((option) =>{
                             return   <MenuItem 
                                    key={option.id} 
                                    value={option.id} >
                                        {option.label}
                                </MenuItem>
                                

                                })}
                            </Select>
                        </Grid>
                    </Grid>
                </form> 
            
            </FormProvider>
        </>
    )
}

export default AddressForm
