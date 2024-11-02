import type { TabTriggerOptions } from "./types";

import Alpine from "alpinejs";
import { defineComponent } from "src/internal/helpers/alpine";
import { safelySetId } from "src/internal/helpers/attributes";


export const TabTrigger = defineComponent((value: TabTriggerOptions) => {
    return {
        init() {
            // @ts-ignore
            if (this.activeTab === undefined) {
                throw new Error('Tab trigger component requires parent Tabs component.');
            }

            if (!value) {
                throw new Error('Tab trigger component requires a value.');
            }

            // @ts-ignore
            this.setValueContext(value, 'trigger', this.$el);

            safelySetId(this.$el, this.$id('tab-trigger'));

            Alpine.bind(this.$el, this.tabTriggerProps);

            // @ts-ignore
            this.setInitialActiveTab(value);
        },

        get isActive(): boolean {
            // @ts-ignore
            return this.activeTab === value;
        },

        tabTriggerProps: {
            [':role']() {
                return 'tab';
            },
            [':type']() {
                return 'button';
            },
            [':tabindex']() {
                return this.isActive ? 0 : -1;
            },
            [':data-value']() {
                return value;
            },
            [':aria-selected']() {
                return this.isActive;
            },
            [':aria-controls']() {
                // @ts-ignore
                return this.values[value]?.content?.id;
            },
            ['@click']() {
                // @ts-ignore
                this.setActiveTab(value);
            },
        }
    };
});