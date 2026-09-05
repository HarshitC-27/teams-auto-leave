(() => {
    const THRESHOLD = 30;
    const CHECK_INTERVAL_MS = 10000;

    console.log(
        `%c[Zoom Auto-Leave] Script initialized. Target threshold: < ${THRESHOLD} participants.`,
        'color: #00ff00; font-weight: bold;'
    );

    const monitorInterval = setInterval(() => {
        // Zoom web client participant count selectors
        const selectors = [
            '.footer-button__participants-count', 
            '.participants-count',
            '[aria-label*="participants"]',
            '[aria-label*="Participants"]'
        ];

        let foundCount = null;

        for (const selector of selectors) {
            const elements = document.querySelectorAll(selector);

            for (const el of elements) {
                const text = el.innerText || el.getAttribute('aria-label') || '';
                const match = text.match(/\d+/);

                if (match) {
                    const val = parseInt(match[0], 10);
                    // Ignore zeros to avoid false positives on unrendered elements
                    if (val > 0) {
                        foundCount = val;
                        break;
                    }
                }
            }
            if (foundCount !== null) break;
        }

        if (foundCount !== null) {
            console.log(`[Zoom Auto-Leave] Current participants: ${foundCount}`);

            if (foundCount < THRESHOLD) {
                console.warn(`[Zoom Auto-Leave] Count (${foundCount}) dropped below ${THRESHOLD}! Leaving call...`);
                
                clearInterval(monitorInterval);

                // Step 1: Find and click the red "Leave" button in the footer
                const leaveBtn = document.querySelector('.footer__leave-btn') || 
                                 Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim().includes('Leave'));

                if (leaveBtn) {
                    leaveBtn.click();
                    console.log('[Zoom Auto-Leave] Clicked initial Leave button.');

                    // Step 2: Wait 1 second for the modal, then click the confirm button
                    setTimeout(() => {
                        const confirmBtn = document.querySelector('.leave-meeting-options__btn') || 
                                           Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim().includes('Leave Meeting'));

                        if (confirmBtn) {
                            confirmBtn.click();
                            console.log('[Zoom Auto-Leave] Confirmed. Left meeting.');
                        } else {
                            // Fallback if the confirm button isn't found
                            window.location.href = 'about:blank';
                        }
                    }, 1000);
                } else {
                    // Fallback if the main leave button isn't found
                    window.location.href = 'about:blank';
                }
            }
        } else {
            console.log('[Zoom Auto-Leave] Waiting for participant count... (Make sure the bottom toolbar is visible!)');
        }
    }, CHECK_INTERVAL_MS);
})();
