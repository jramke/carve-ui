// registration.ts
import type { Alpine } from 'alpinejs';
import { components, plugins, type ComponentKey } from '../components';

// Register plugins helper
const registerPlugins = (Alpine: Alpine): void => {
    plugins.forEach(plugin => Alpine.plugin(plugin));
};

// Register specific components
export const register = (Alpine: Alpine, keys: ComponentKey[]): void => {
    registerPlugins(Alpine);
    keys.forEach(key => {
        const { name, component } = components[key];
        Alpine.data(name, component as any);
    });
};

// Register all components
export const registerAll = (Alpine: Alpine): void => {
    registerPlugins(Alpine);
    Object.values(components).forEach(({ name, component }) => {
        Alpine.data(name, component as any);
    });
};