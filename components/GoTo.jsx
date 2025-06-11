'use client'

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const GoTo = () => {
    
    const [hydrated, hasHydrated] = useState(false);

    const {currentUser, logout} = useAuth();

    const isAuthenticated = !!currentUser;
    const path = usePathname();

    useEffect(() => {
        hasHydrated(true)
    }, []);

    if (hydrated == false){
        return null;
    }
    
    return (
        <div className="goto">
            {path == '/' && (
                <>
                    <Link href={'/dashboard?register=true'} >
                        <p>Sign up</p>
                    </Link>
                    <Link href={'/dashboard'}>
                        <button>Login &rarr;</button>
                    </Link>
                </>
            )}

            {(isAuthenticated && path == '/dashboard') && (
                <button onClick={logout}>Logout</button>
            )}
        </div>
    )
}

export default GoTo;