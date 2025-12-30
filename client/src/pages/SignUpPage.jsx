import React from 'react';
import { SignUp } from '@clerk/clerk-react';

export default function SignUpPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0f172a] text-white">
            <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
        </div>
    );
}
