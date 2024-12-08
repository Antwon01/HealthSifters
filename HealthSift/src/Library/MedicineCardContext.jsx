import { createContext, useContext, useState } from 'react';

const MedicineCardContext = createContext();


// custom hooks
export function useMedicineList() {
    // useContext MedicneCard aContext
    return useContext(MedicineCardContext); // this line is going to look for the closest profile context provider
                                            // which is on the MedicineCardProvider function
}

// this function will all for the medicines that are bookmarked in the home page to be displayed on the library page
export function MedicineCardProvider({ children }) {
    // list to store the medicines
    const [medicineCards, setMedicineCards] = useState([]);
    // function to add a medicine
    const addMedicineCard = (card) => {
        setMedicineCards((prev) => {
            // Prevent duplicates based on index
            if (prev.some((existingCard) => existingCard.index === card.index)) {
                return prev; // Don't add duplicate
            }
            return [...prev, card];
        });
    };
    // fucntion to remove a medicine
    const removeMedicineCard = (index) => setMedicineCards((prevCards) => prevCards.filter((_, i) => i !== index));

    return (
        // make all three variables availble to other pages.
        <MedicineCardContext.Provider value={{ medicineCards, setMedicineCards,  addMedicineCard, removeMedicineCard}}>
            {children}
        </MedicineCardContext.Provider>
    );
}