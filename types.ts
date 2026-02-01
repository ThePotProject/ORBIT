import React from 'react';

export interface NavLink {
    label: string;
    href: string;
}

export interface CardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

export interface PlanetProps {
    name: string;
    phase: string;
    description: string;
    glowColor: string;
    isSun?: boolean;
}