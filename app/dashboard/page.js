'use client'

import Login from "@/components/Login";
import SubscriptionsDisplay from "@/components/SubscriptionsDisplay";
import SubscriptionsSummary from "@/components/SubscriptionSummary";
import '../fanta.css';
import "../globals.css";
import SubscriptionForm from "@/components/SubscriptionForm";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const blankSubscription = {
        name: '',
        category: 'Web Services',
        cost: '',
        currency: 'USD',
        billingFrequency: 'Monthly',
        nextBillingDate: '',
        paymentMethod: 'Credit Card',
        startDate: '',
        renewalType: '',
        notes: '',
        status: 'Active'
    }

const DashboardPage = () => {

    const {handleDeleteSubscription, userData, currentUser, loading} = useAuth();

    const isAuthenticated = !!currentUser;
    const [isAddEntry, setAddEntry] = useState(false);


    const [formData, setFormData] = useState(blankSubscription)

    const handleChangeInput = (e) => {
        const newData = {
            ...formData,
            [e.target.name]: e.target.value
        }

        setFormData(newData);
    }

    const handleEditSubscription = (index) => {
        const data = userData.subscriptions.find((val, valIndex) => {
            return valIndex === index
        })

        setFormData(data);
        handleDeleteSubscription(index);
        setAddEntry(true);
    }

    const handleResetForm = () => {
        setFormData(blankSubscription);
    }

    const handleToggleInput = () => {
        setAddEntry(!isAddEntry);
    }

    if (loading){
        return (
            <p>Loading...</p>
        )
    }

    if (isAuthenticated === false) {
        return (
            <Login />
        )
    }
  
    return (
        <>
            <SubscriptionsSummary />
            <SubscriptionsDisplay handleEditSubscription={handleEditSubscription} handleShowInput={isAddEntry ? () => {} : handleToggleInput} />
            {isAddEntry && (
                <SubscriptionForm handleResetForm={handleResetForm} closeInput={handleToggleInput}
                 formData={formData} handleChangeInput={handleChangeInput}/>
            )}
        </>
    );
}

export default DashboardPage;