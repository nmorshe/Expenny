'use client'

import { auth, db } from "@/Firebase";
import { subscriptions } from "@/utils";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// Method used to give global state of context upon
// being exported.
const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        setCurrentUser(null);
        setUserData(null);
        return signOut(auth);
    }

    const saveToFirebase = async (data) => {
        try {
            const userRef = doc(db, 'users', currentUser.uid);
            
            // Write changes to user doc on firebase
            const res = await setDoc(userRef, {
                subscriptions: data
            }, {merge: true})
        }

        catch (err) {
            console.log(err.message)
        }
    }

    const handleAddSubscription = async (newSubscription) => {
        
        //Remove if paywall enabled.
        if (userData.subscriptions.length > 30) {return}
        
        const newSubscriptions = [...userData.subscriptions, newSubscription];
        setUserData({subscriptions: newSubscriptions});

        // Save changes to firebase
        await saveToFirebase(newSubscriptions);
    }

    const handleDeleteSubscription = async (index) => {

        // Delete entry at index.

        const newSubscriptions = userData.subscriptions.filter((val, valIndex) => {
            return valIndex !== index
        })

        setUserData({subscriptions: newSubscriptions});
        await saveToFirebase(newSubscriptions);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                
                setCurrentUser(user)

                if (!user) {
                    return
                }

                setLoading(true)

                // User found - check database

                // Creating document reference
                const docRef = doc(db, 'users', user.uid)
                console.log("User ID: " + user.uid)

                // Getting doc snapshot
                const docSnap = await getDoc(docRef)

                console.log("docSnap: " + docSnap.data())

                console.log('Fetching user data')

                // let firebaseData = { subscriptions }
                let firebaseData = {subscriptions: []} // Default data

                if (docSnap.exists()){

                    
                    // Data found

                    console.log('Found user data')
                    firebaseData = docSnap.data()
                    console.log("User Data: " + firebaseData);
                }

                setUserData(firebaseData)
                setLoading(false)

            }

            catch (err) {
                console.log(err.message)
            }
        })

        return unsubscribe

    }, [])

    // Global context values to pass down.
    const value = {
        currentUser, userData, loading, signup, login, logout, handleAddSubscription, handleDeleteSubscription
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    useAuth,
    AuthProvider
};