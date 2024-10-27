import Alpine from "alpinejs";
import { defineComponent } from "src/internal/helpers/alpine";
import { safelySetId } from "src/internal/helpers/attributes";


export const TabContent = defineComponent((value: string) => {
    
    return {
        init() {
            // @ts-ignore
            if (this.activeTab === undefined) {
                throw new Error('Tab content component requires parent Tabs component.');
            }

            if (!value) {
                throw new Error('Tab content component requires a value.');
            }

            // @ts-ignore
            this.setValueContext(value, 'content', this.$el);

            safelySetId(this.$el, this.$id('tab-content'));

            Alpine.bind(this.$el, this.tabContentProps);

            // @ts-ignore
            this.setInitialActiveTab(value);
        },

        get isActive(): boolean {
            // @ts-ignore
            return this.activeTab === value;
        },

        tabContentProps: {
            [':role']() {
                return 'tabpanel';
            },
            [':aria-labelledby']() {
                // @ts-ignore
                return this.values[value]?.trigger?.id;
            },
            [':hidden']() {
                return !this.isActive;
            },
            ['x-show']() {
                return this.isActive;
            },
            [':tabindex']() {
                return 0;
            }
        }

    };
});