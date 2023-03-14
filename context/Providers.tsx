'use client';

import React from 'react';
import AuthState from './authentication';

export function Providers({ children }: { children: React.ReactNode }) {
    return (

        <AuthState>
            {children}
        </AuthState>

    );
}