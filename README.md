# Web Meeting Auto-Leave (Teams & Zoom)

A lightweight JavaScript utility that monitors the participant count in Microsoft Teams or Zoom web calls and automatically leaves when the number of participants drops below a specified threshold.

## Features

* **Multi-Platform Support:** Includes dedicated scripts for both Microsoft Teams (`teams-auto-leave.js`) and the Zoom Web Client (`zoom-auto-leave.js`).
* Monitors the participant count automatically
* Configurable participant threshold
* Configurable polling interval
* Automatically handles platform-specific exit flows (e.g., Zoom's two-step leave confirmation)
* Falls back to navigating away if the leave buttons cannot be found
* Runs directly from the browser's Developer Console
* No installation required

## How It Works

The script periodically checks the webpage for elements that contain participant-count information. 

When the detected number of participants drops below the configured threshold, the script:

1. Stops monitoring.
2. Searches for the platform's leave/hang-up button.
3. Attempts to click it (and handles any secondary confirmation prompts).
4. Falls back to redirecting the page to `about:blank` if the buttons cannot be located.

## Usage

### 1. Join a Meeting

Open the Microsoft Teams or Zoom meeting in a supported web browser.

### 2. Open Developer Tools

Open your browser's Developer Tools. On most browsers:

* **Mac:** `Option + Command + I`
* **Windows/Linux:** `Ctrl + Shift + I`

Then navigate to the **Console** tab.

### 3. Make the participant count visible

The script needs to detect participant-count information from the page DOM.

* **For Teams:** Open the **People** or **Participants** panel.
* **For Zoom:** Open the **Participants** side panel. *Note: If you leave the panel closed, Zoom auto-hides the bottom toolbar when your mouse is idle, which will prevent the script from reading the count.*

### 4. Paste the script

Copy the contents of the relevant script (`teams-auto-leave.js` or `zoom-auto-leave.js`) and paste it into the browser console. Press Enter to start monitoring.

## Configuration

At the top of either script, you can modify the core variables:

```js
const THRESHOLD = 30;
```

The script will leave the call when the participant count becomes **less than 30**. To leave when fewer than 10 participants remain, set it to `10`.

### Check Interval

You can also change how frequently the script checks the participant count:

```js
const CHECK_INTERVAL_MS = 10000;
```

The default is **10 seconds** (`10000` ms). To check every 5 seconds, change this to `5000`.

## Example Console Output

```text
[Zoom Auto-Leave] Script initialized. Target threshold: < 30 participants.

[Zoom Auto-Leave] Current participants: 42

[Zoom Auto-Leave] Current participants: 29

[Zoom Auto-Leave] Count (29) dropped below 30! Leaving call...

[Zoom Auto-Leave] Clicked initial Leave button.

[Zoom Auto-Leave] Confirmed. Left meeting.
```

## Important Notes

Web interfaces update regularly. Because these scripts rely on elements present in the DOM, CSS selectors that work today may stop working after a Teams or Zoom update. 

If the participant count is not detected, try:

* Ensuring the Participants/People panel is open and actively rendered on the screen.
* Wiggling your mouse to ensure UI toolbars haven't auto-hidden (specifically in Zoom).
* Inspecting the relevant elements and updating the CSS selectors in the script arrays.

## Limitations

* Designed specifically for the **web interfaces** of Teams and Zoom. This will not work in the native desktop applications.
* Depends on the current DOM structures of these platforms.
* The script does not run in the background if the browser tab is closed or suspended by the browser.
* Some organizations apply browser policies that restrict pasting code into the Developer Console.

## Disclaimer

This is an unofficial personal utility and is not affiliated with, endorsed by, or supported by Microsoft or Zoom Video Communications, Inc.

Use it responsibly and ensure that its use complies with your organization's policies and the terms applicable to the services you use.

## Contributing

Contributions are welcome. If you find a UI variation where the participant count or leave button is not detected, feel free to open an issue with relevant details or submit a pull request with updated selectors.

## License

This project is licensed under the MIT License.
