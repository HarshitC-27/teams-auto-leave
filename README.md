# Teams Auto-Leave

A lightweight JavaScript utility that monitors the participant count in a Microsoft Teams call and automatically leaves when the number of participants drops below a specified threshold.

## Features

* Monitors the participant count automatically
* Configurable participant threshold
* Configurable polling interval
* Attempts to click the Teams hang-up button
* Falls back to navigating away if the leave button cannot be found
* Runs directly from the browser's Developer Console
* No installation required

## How It Works

The script periodically checks the Teams webpage for elements that may contain participant-count information.

When the detected number of participants drops below the configured threshold, the script:

1. Stops monitoring
2. Searches for the Teams hang-up button
3. Attempts to click it
4. Falls back to leaving the page if the button cannot be located

## Usage

### 1. Join a Microsoft Teams call

Open the Teams meeting in a supported web browser.

### 2. Open Developer Tools

Open your browser's Developer Tools.

On most browsers:

* **Mac:** `Option + Command + I`
* **Windows/Linux:** `Ctrl + Shift + I`

Then open the **Console** tab.

### 3. Make the participant count visible

Open the **People** or **Participants** panel if required.

The script needs to detect participant-count information from the Teams page.

### 4. Paste the script

Copy the contents of `teams-auto-leave.js` and paste it into the browser console.

Press Enter to start monitoring.

## Configuration

At the top of the script, you can modify:

```js
const THRESHOLD = 30;
```

The script will leave the call when the participant count becomes **less than 30**.

For example:

```js
const THRESHOLD = 10;
```

This leaves the call when fewer than 10 participants remain.

### Check Interval

You can also change how frequently the script checks the participant count:

```js
const CHECK_INTERVAL_MS = 10000;
```

The default is **10 seconds**.

For example, to check every 5 seconds:

```js
const CHECK_INTERVAL_MS = 5000;
```

## Example Console Output

```text
[Teams Auto-Leave] Script initialized. Target threshold: < 30 participants.

[Teams Auto-Leave] Current participants: 42

[Teams Auto-Leave] Current participants: 29

[Teams Auto-Leave] Count (29) dropped below 30! Leaving call...

[Teams Auto-Leave] Clicked Leave button.
```

## Important Notes

Microsoft Teams updates its web interface regularly. Because this script relies on elements present in the Teams webpage, selectors that work today may stop working after a Teams update.

If the participant count is not detected, try:

* Opening the **People** panel
* Checking whether Teams has changed its interface
* Inspecting the relevant elements and updating the selectors

## Limitations

* Designed for use with the Teams web interface
* Depends on the current Teams DOM structure
* Participant-count detection may vary between Teams versions
* The script does not run in the background after the browser page is closed
* The browser may restrict pasting code into the Developer Console

## Disclaimer

This is an unofficial personal utility and is not affiliated with, endorsed by, or supported by Microsoft.

Use it responsibly and ensure that its use complies with your organization's policies and the terms applicable to the services you use.

## Contributing

Contributions are welcome.

If you find a Teams UI variation where the participant count or leave button is not detected, feel free to open an issue with relevant details.

## License

This project is licensed under the MIT License.
