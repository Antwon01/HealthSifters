import { createContext, useContext, useState } from 'react';

const MedicineCardContext = createContext();


// custom hooks
export function useMedicineList() {
    // useContext MedicneCard aContext
    return useContext(MedicineCardContext); // this line is going to look for the closest profile context provider
                                            // which is on the MedicineCardProvider function
}

export function MedicineCardProvider({ children }) {
    const [medicineCards, setMedicineCards] = useState([]);
    const addMedicineCard = (card) => setMedicineCards((prev) => [...prev, card]);
    const removeMedicineCard = (index) => setMedicineCards((prevCards) => prevCards.filter((_, i) => i !== index));

    return (
        <MedicineCardContext.Provider value={{ medicineCards, addMedicineCard, removeMedicineCard}}>
            {children}
        </MedicineCardContext.Provider>
    );
}