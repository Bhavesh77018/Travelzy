// @ts-nocheck
import { useContext } from 'react';
import { AppContext, type AppContextType } from '../context/AppStateContext';

export const useAppState = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppState must be used within an AppStateProvider');
    }
    return context;
};
