import React from 'react';
import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0f172a] text-white">
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </div>
    );
}
