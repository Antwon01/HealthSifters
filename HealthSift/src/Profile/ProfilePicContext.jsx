// ProfileContext.js
import { createContext, useContext, useState } from 'react';

// Create the context
const ProfileContext = createContext();

// Custom hook to use the ProfileContext
export function useProfile() {
    // this prevents us from using useContext on each of the compoenets we need it.
    return useContext(ProfileContext);
}

// Context provider component
export function ProfileProvider({ children }) {
    const [profileSrc, setProfile] = useState("");
    return (
        // value are what is sent to the context
        <ProfileContext.Provider value={{ profileSrc, setProfile }}>
            {children}
        </ProfileContext.Provider>  
    );
}