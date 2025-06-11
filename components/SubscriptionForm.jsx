'use client'

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const SubscriptionForm = ({handleResetForm, closeInput, formData, handleChangeInput}) => {
    
    const subscriptionTypes = ['Entertainment', 'Music', 'Software', 'Web Services', 'Health & Fitness', 'Other'];
    const currencyType = ['USD', 'EUR', 'GBP', 'NZD', 'AUD', 'Other'];
    const billingFreqType = ['Monthly', 'Yearly', 'Quarterly', 'One-time'];
    const payMethodType = ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer', 'Other'];
    const statusTypes = ['Active', 'Paused', 'Canceled'];

    const { handleAddSubscription } = useAuth();

    const handleFormSubmit = (e) => {
        e.preventDefault();  // prevents random behavior of reloading webpage.
        handleAddSubscription(formData);
        handleResetForm();
        closeInput();
    }

    return (
        <section>
            <h2>Add a new subscription</h2>
            <form onSubmit={handleFormSubmit}>
                <label>
                    <span>Subscription Name</span>
                    <input value={formData.name} onChange={handleChangeInput} type="text" name="name" placeholder="e.g. Netflix, Spotify, AWS Hosting" required />
                </label>
                <label>
                    <span>Category</span>
                    <select value={formData.category} onChange={handleChangeInput} name="category">
                        {subscriptionTypes.map((cat, catIndex) => {
                            return (
                                <option key={catIndex}>
                                    {cat}
                                </option>
                            )
                        })}
                    </select>
                </label>

                <label>
                    <span>Cost</span>
                    <input value={formData.cost} onChange={handleChangeInput} type="number" name="cost" step='0.01' placeholder="e.g 12.00" required />
                </label>

                <label>
                    <span>Currency</span>
                    <select value={formData.currency} onChange={handleChangeInput} name="currency">
                        {currencyType.map((cur, curIndex) => {
                            return (
                                <option key={curIndex}>{cur}</option>
                            )
                        })}
                    </select>
                </label>

                <label>
                    <span>Billing Frequency</span>
                    <select value={formData.billingFrequency} onChange={handleChangeInput} name="billingFrequency">
                        {billingFreqType.map((bill, billIndex) => {
                            return (
                                <option key={billIndex}>{bill}</option>
                            )
                        })}
                    </select>
                </label>

                <label>
                    <span>Payment Method</span>
                    <select value={formData.paymentMethod} onChange={handleChangeInput} name="paymentMethod">
                        {payMethodType.map((pay, payIndex) => {
                            return (
                                <option key={payIndex}>{pay}</option>
                            )
                        })}
                    </select>
                </label>

                <label>
                    <span>Subscription Start Date</span>
                    <input value={formData.startDate} onChange={handleChangeInput} type="date" name="startDate" required />
                </label>

                <label>
                    <span>Status</span>
                    <select value={formData.status} onChange={handleChangeInput} name="status">
                        {statusTypes.map((stat, statIndex) => {
                            return (
                                <option key={statIndex}>{stat}</option>
                            )
                        })}
                    </select>
                </label>

                <label className="fat-column">
                    <span>Notes</span>
                    <textarea value={formData.notes} onChange={handleChangeInput} name="notes" placeholder="e.g. Shared with family, includes cloud storage" />
                </label>

                <div className="fat-column form-submit-btns">
                    <button onClick={closeInput}>Cancel</button>
                    <button type="submit">
                        Add Subscription
                    </button>
                </div>
            </form>
        </section>
    )
}

export default SubscriptionForm;