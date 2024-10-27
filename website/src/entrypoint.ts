import type { Alpine } from 'alpinejs';

import { register, registerAll } from 'carve-ui';

export default (Alpine: Alpine) => {
    registerAll(Alpine);

    // register(Alpine, ['accordion', 'accordionItem']);
}