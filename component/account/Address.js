'use client'
import { useState, useEffect, useRef } from 'react'
import styles from './Address.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const COUNTRIES = ['Indonesia', 'United States', 'United Kingdom', 'Singapore', 'Malaysia', 'Australia']

const CITIES = {
    Indonesia: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Bali'],
    'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'],
    'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow'],
    Singapore: ['Singapore'],
    Malaysia: ['Kuala Lumpur', 'Johor Bahru', 'Penang', 'Kota Kinabalu'],
    Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
}

const STATES = {
    Indonesia: ['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Bali'],
    'United States': ['New York', 'California', 'Texas', 'Florida', 'Illinois'],
    'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    Singapore: ['Central Region', 'East Region', 'West Region'],
    Malaysia: ['Selangor', 'Johor', 'Penang', 'Sabah', 'Sarawak'],
    Australia: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia'],
}

const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name Required'),
    lastName: Yup.string().required('Last Name Required'),
    phone: Yup.string().required('Phone Required'),
    streetAddress: Yup.string().required('Street Address Required'),
    country: Yup.string().required('Country Required'),
    state: Yup.string().required('State Required'),
    city: Yup.string().required('City Required'),
    zipCode: Yup.string().required('Zip Code Required'),
    company: Yup.string(),
    email: Yup.string().email('Invalid email address').required('Email is required'),
})

const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    streetAddress: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    company: '',
    email: ''
}


export default function AddAddress() {
    const [addresses, setAddresses] = useState([])
    const [editIndex, setEditIndex] = useState(null)
    const isFirstRender = useRef(true)

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('addresses') || '[]')
        setAddresses(saved)
    }, [])

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        localStorage.setItem('addresses', JSON.stringify(addresses))
    }, [addresses])

    const handleSubmit = (values, { resetForm }) => {
        if (editIndex !== null) {
            const updated = addresses.map((addr, i) => i === editIndex ? values : addr)
            setAddresses(updated)
            setEditIndex(null)
        } else {
            setAddresses([...addresses, values])
        }
        resetForm()
    }

    const handleEdit = (index) => setEditIndex(index)

    const handleDelete = (index) => {
        const updated = addresses.filter((_, i) => i !== index)
        setAddresses(updated)
        if (editIndex === index) setEditIndex(null)
    }

    const handleCancel = (resetForm) => {
        resetForm()
        setEditIndex(null)
    }

    return (
        <div className={styles.addressContainer}>
            <h2>Add New Address</h2>

            {addresses.map((addr, index) => (
                <div key={index} className={styles.addressName}>
                    <div className={styles.name}>
                        <p>{addr.firstName} {addr.lastName}</p>
                    </div>
                    <div className={styles.addressInfo}>
                        <p>{addr.zipCode} {addr.streetAddress}, {addr.city}, {addr.state}, {addr.country}</p>
                        <div className={styles.button}>
                            <button style={{color: '#3F1700'}} onClick={() => handleEdit(index)}>Edit</button>
                            <button style={{color: 'red'}} onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                    </div>

                </div>
            ))}
            <div className={styles.addressForm}>
                <Formik
                    initialValues={editIndex !== null ? addresses[editIndex] : initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ resetForm, values }) => (
                        <Form>
                            <div className={styles.row}>
                                <div className={styles.input}>
                                    <label>First Name*</label>
                                    <Field name="firstName" placeholder="First Name" />
                                    <ErrorMessage name="firstName" component="p" />
                                </div>
                                <div className={styles.input}>
                                    <label>Last Name*</label>
                                    <Field name="lastName" placeholder="Last Name" />
                                    <ErrorMessage name="lastName" component="p" />
                                </div>
                            </div>
                            <div className={styles.column}>
                                <div className={styles.input}>
                                    <label>Company Name (Optional)</label>
                                    <Field name="company" placeholder="Enter Company Name" />
                                    <ErrorMessage name="company" component="p" />
                                </div>
                                <div className={styles.input}>
                                    <label>Country*</label>
                                    <Field as="select" name="country">
                                        <option value="">Select Country</option>
                                        {COUNTRIES.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="country" component="p" />
                                </div>
                                <div className={styles.input}>
                                    <label>Street Address*</label>
                                    <Field name="streetAddress" placeholder="Street Address" />
                                    <ErrorMessage name="streetAddress" component="p" />
                                </div>
                                <div className={styles.input}>
                                    <label>City*</label>
                                    <Field as="select" name="city" disabled={!values.country}>
                                        <option value="">Select City</option>
                                        {(CITIES[values.country] || []).map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="city" component="p" />
                                </div>
                                <div className={styles.input}>
                                    <label>State*</label>
                                    <Field as="select" name="state" disabled={!values.country}>
                                        <option value="">Select State</option>
                                        {(STATES[values.country] || []).map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="state" component="p" />
                                </div>
                                <div className={styles.input}>
                                    <label>Zip Code*</label>
                                    <Field name="zipCode" placeholder="Zip Code" />
                                    <ErrorMessage name="zipCode" component="p" />
                                </div>
                                <div className={styles.input}>
                                    <label>Phone*</label>
                                    <Field name="phone" placeholder="Phone" />
                                    <ErrorMessage name="phone" component="p" />
                                </div>
                                <div className={styles.input}>
                                    <label>Email*</label>
                                    <Field name="email" placeholder="Enter Email Address" />
                                    <ErrorMessage name="email" component="p" />
                                </div>
                            </div>


                            <button type="submit">
                                {editIndex !== null ? 'Update Address' : 'Add Address'}
                            </button>

                            {editIndex !== null && (
                                <button type="button" onClick={() => handleCancel(resetForm)}>
                                    Cancel
                                </button>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>

        </div>
    )
}