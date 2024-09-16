'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export function Logo() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Image
            alt="Logo Panner"
            width="0"
            height="0"
            sizes="100vw"
            className="w-36"
            src={resolvedTheme !== 'dark' ? '/panner-secondary-logo.png' : '/panner-primary-logo.png'}
        />
    );
}
