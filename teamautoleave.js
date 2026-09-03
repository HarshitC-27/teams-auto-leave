(() => {
    const THRESHOLD = 30;
    const CHECK_INTERVAL_MS = 10000;

    console.log(%c[Teams Auto-Leave] Script initialized. Target threshold: < ${THRESHOLD} participants., 'color: #00ff00; font-weight: bold;');

    const monitorInterval = setInterval(() => {
        const selectors = [
            '[aria-label*="participants"]',
            '[aria-label*="Participants"]',
            '[data-tid*="participant-count"]',
            'span[class*="participant"]'
        ];

        let foundCount = null;

        for (const selector of selectors) {
            const elements = document.querySelectorAll(selector);
            for (const el of elements) {
                const text = el.innerText || el.getAttribute('aria-label') || '';
                const match = text.match(/\d+/);
                if (match) {
                    const val = parseInt(match[0], 10);
                    if (val > 0) {
                        foundCount = val;
                        break;
                    }
                }
            }
            if (foundCount !== null) break;
        }

        if (foundCount !== null) {
            console.log([Teams Auto-Leave] Current participants: ${foundCount});

            if (foundCount < THRESHOLD) {
                console.warn([Teams Auto-Leave] Count (${foundCount}) dropped below ${THRESHOLD}! Leaving call...);
                clearInterval(monitorInterval);

                const leaveBtn = document.querySelector('button[id*="hangup"]');
                
                if (leaveBtn) {
                    leaveBtn.click();
                    console.log('[Teams Auto-Leave] Clicked Leave button.');
                } else {
                    window.location.href = 'about:blank';
                }
            }
        } else {
            console.log('[Teams Auto-Leave] Waiting for participant panel text... (Make sure the People tab is open!)');
        }
    }, CHECK_INTERVAL_MS);
})();
