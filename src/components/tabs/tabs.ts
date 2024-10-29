import type { TabsOptions } from "./types";

import Alpine from "alpinejs";
import { defineComponent } from "src/internal/helpers/alpine";
import { safelySetId } from "src/internal/helpers/attributes";
import { warn } from "src/internal/helpers/logs";
import { getStyle } from "src/internal/helpers/styles";
import { timeout } from "src/internal/helpers/time";
import { getUrlHash, getUrlSearchParam, setUrlHash, setUrlSearchParam } from "src/internal/helpers/url";


export const Tabs = defineComponent((userOptions: Partial<TabsOptions> = {}) => {
    const defaultOptions: TabsOptions = {
        onActiveTabChange: null,
        initialActive: '',
        orientation: 'horizontal',
        urlSync: false,
    };

    return {
        options: Object.assign(defaultOptions, userOptions),

        init() {
            if (!this.$refs.list) {
                throw new Error('Tabs component requires a list element.');
            }

            if (!this.$refs.label && !this.options.label) {
                warn('Tabs component should have a label element or a label option for accessibility.', this.$el);
            }

            if (this.$refs.label) {
                safelySetId(this.$refs.label, this.$id('tabs-label'));
            }

            if (this.$refs.indicator) {
                const validListPositions = ['relative', 'absolute', 'fixed'];
                if (!validListPositions.includes(getStyle(this.$refs.list, 'position'))) {
                    this.$refs.list.style.position = 'relative';
                }
                
                Object.assign(this.$refs.indicator.style, {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    'pointer-events': 'none',
                });
                Alpine.bind(this.$refs.indicator, this.indicatorProps);
            }

            Alpine.bind(this.$refs.list, this.listProps);

            this.$watch('activeTab', this.handleActiveTabChange.bind(this));
        },
        

        activeTab: '',
        activeTriggerElement: null as HTMLElement | null,
        get initialActive() {
            return this.options.initialActive;
        },
        set initialActive(value) {
            this.options.initialActive = value;
        },
        values: {} as Record<string, Record<'trigger' | 'content', HTMLElement>>,

        setActiveTab(tab: string, focusTrigger: boolean = false) { 
            if (this.activeTab === tab) return;

            if (tab === '') {
                throw new Error('activeTab cannot be an empty string.');
            }

            if (!this.values[tab]) {
                throw new Error('activeTab must be a valid tab trigger value.');
            }

            this.activeTab = tab;

            const trigger = this.values[tab].trigger;
            if (!trigger) return;

            this.activeTriggerElement = trigger;

            if (focusTrigger) {
                (trigger as HTMLElement).focus();
            }
        },
        setNextTabActive(focusTrigger: boolean = false) {
            const currentIndex = Object.keys(this.values).indexOf(this.activeTab);
            const nextIndex = currentIndex === Object.keys(this.values).length - 1 ? 0 : currentIndex + 1;
            this.setActiveTab(Object.keys(this.values)[nextIndex], focusTrigger);
        },
        setPreviousTabActive(focusTrigger: boolean = false) {
            const currentIndex = Object.keys(this.values).indexOf(this.activeTab);
            const nextIndex = currentIndex === 0 ? Object.keys(this.values).length - 1 : currentIndex - 1;
            this.setActiveTab(Object.keys(this.values)[nextIndex], focusTrigger);
        },
        setInitialActiveTab(value: string) {
            if (!this.initialActive) {
                this.initialActive = value; // fallback to first item that is initialized (normally the first one)
            }
            if (this.options.urlSync !== false) {
                if (this.options.urlSync === 'hash') {
                    const hash = getUrlHash();
                    hash && (this.initialActive = hash);
                }
                if (this.options.urlSync === 'search') {
                    const searchParam = getUrlSearchParam('tab');
                    searchParam && (this.initialActive = searchParam);
                }
            }
            if (value === this.initialActive) {
                this.setActiveTab(value);
                this.updateIndicator(true);
            }
        },
        setValueContext(value: string, key: string, element: HTMLElement) {
            if (!this.values[value]) {
                this.values[value] = { trigger: null as any, content: null as any };
            }
            if (this.values[value][key]) {
                throw new Error(`Tab value "${value}" with key "${key}" must be unique.`);
            }
            this.values[value][key] = element;
        },
        handleActiveTabChange(activeTab: string) {
            this.updateIndicator();

            if (this.options.urlSync === 'hash') {
                setUrlHash(activeTab);
            }
            if (this.options.urlSync === 'search') {
                setUrlSearchParam('tab', activeTab);
            }

            if (typeof this.options.onActiveTabChange === 'function') {
                this.options.onActiveTabChange(activeTab);
            }
        },
        async updateIndicator(preventTransition: boolean = false) {
            if (!this.$refs.indicator || !this.activeTriggerElement) return;

            // await this.$nextTick();
            await timeout(20); // wait to prevent wrong position calculation for example if triggers have flex grow or tablist is a grid

            const triggerRect = this.activeTriggerElement.getBoundingClientRect();
            const listRect = this.$refs.list.getBoundingClientRect();

            if (preventTransition) {
                this.$refs.indicator.style.transitionDuration = '0s';
            }

            if (this.options.orientation === 'horizontal') {
                Object.assign(this.$refs.indicator.style, {
                    width: `${triggerRect.width}px`,
                    transform: `translateX(${triggerRect.left - listRect.left}px)`,
                });
            } else {
                Object.assign(this.$refs.indicator.style, {
                    height: `${triggerRect.height}px`,
                    transform: `translateY(${triggerRect.top - listRect.top}px)`,
                });
            }

            if (preventTransition) {
                await this.$nextTick();
                this.$refs.indicator.style.transitionDuration = '';
            }
        },

        listProps: {
            [':role']() {
                return 'tablist';
            },
            [':aria-orientation']() {
                return this.options.orientation;
            },
            [':aria-label']() {
                if (this.options.label) {
                    return this.options.label;
                }
            },
            [':aria-labelledby']() {
                if (this.$refs.label && !this.options.label) {
                    return this.$refs.label.id;
                }
            },
            ['@keydown.arrow-left.prevent']() {
                if (this.options.orientation !== 'horizontal') return;
                this.setPreviousTabActive(true);
            },
            ['@keydown.arrow-right.prevent']() {
                if (this.options.orientation !== 'horizontal') return;
                this.setNextTabActive(true);
            },
            ['@keydown.arrow-up.prevent']() {
                if (this.options.orientation !== 'vertical') return;
                this.setPreviousTabActive(true);
            },
            ['@keydown.arrow-down.prevent']() {
                if (this.options.orientation !== 'vertical') return;
                this.setNextTabActive(true);
            },
            ['x-resize']() {
                this.updateIndicator(true);
            }
        },
        indicatorProps: {
            [':role']() {
                return 'presentation';
            },
            [':aria-hidden']() {
                return true;
            },
        },
    };
});
