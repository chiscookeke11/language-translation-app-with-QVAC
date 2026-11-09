# QVAC English-to-French Language Translator

A lightweight command-line language translation application built with the [QVAC SDK](https://github.com/QVAC) and the Bergamot neural machine translation model.

The application translates English text into French using an on-device translation model. After the initial model download, translations can be performed locally without requiring an active internet connection.

## Features

- **English-to-French translation:** Translate English sentences into French.
- **Local AI inference:** Run translations directly on your machine.
- **Offline functionality:** Use the downloaded model without an internet connection.
- **Interactive translation:** Enter multiple sentences continuously through the terminal.
- **One-shot translation:** Translate individual sentences directly from the command line.
- **Translation timing:** Display the time taken to complete each translation.

## Technologies Used

- Node.js
- JavaScript (ES Modules)
- QVAC SDK (`@qvac/sdk`)
- Bergamot Neural Machine Translation (NMT)

## Prerequisites

Before running the application, ensure you have:

- Node.js 18 or later.
- npm (Node Package Manager).
- An internet connection for the initial model download.

Check your Node.js and npm versions:

```bash
node --version
npm --version
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/chiscookeke11/language-translation-app-with-QVAC.git
```

### 2. Navigate into the project directory

```bash
cd language-translation-app-with-QVAC
```

### 3. Install dependencies

```bash
npm install
```

This installs the QVAC SDK and other required dependencies.

## Running the Application

### First Run

Start the application using:

```bash
npm run translate
```

On the first run, the application downloads and loads the English-to-French Bergamot translation model.

Wait until you see:

```text
Loading English → French model...
Model ready.

Type English text and press Enter. Type "exit" to quit.
```

You can now enter English sentences.

### Interactive Translation

Example:

```text
EN> Good morning
FR> Bonjour

EN> How are you?
FR> Comment allez-vous?

EN> Thank you very much
FR> Merci beaucoup
```

To exit the application:

```text
EN> exit
```

### One-Shot Translation

You can also translate a single sentence without entering interactive mode:

```bash
npm run translate -- "Good morning"
```

Example output:

```text
Loading English → French model...
Model ready.

Bonjour (120 ms)
```

*The displayed execution time is illustrative and will vary depending on your machine.*

## Offline Functionality

One of the main advantages of this project is its ability to perform translations locally.

The application uses the Bergamot model through QVAC SDK. The model is downloaded during the initial setup and subsequently loaded from the local model cache.

### How Offline Translation Works

1. Connect to the internet.
2. Run the application for the first time.
3. Allow the translation model to download and initialize.
4. Once the model is cached locally, disconnect from the internet.
5. Run the application again.
6. Enter English sentences and receive French translations.

The translation process does not require sending sentences to an external translation API.

**Important:** The initial model download requires internet access. Offline execution depends on the model having been successfully downloaded and cached beforehand.

### Offline Testing Checklist

The following tests can be used to verify offline functionality:

| Test | Expected result |
|---|---|
| Initial model download | Model downloads successfully while online |
| Model initialization | Model loads successfully |
| Interactive translation | English sentences are translated into French |
| Multiple translations | Several sentences can be translated in one session |
| One-shot translation | A sentence passed through the terminal is translated |
| Offline model loading | Previously downloaded model loads without internet |
| Offline translation | Translation continues without an active internet connection |

## Project Structure

```text
language-translation-app-with-QVAC/
│
├── translate.mjs       # Main translation application
├── package.json        # Project configuration and dependencies
├── package-lock.json   # Dependency lock file
├── .gitignore          # Git ignore configuration
└── README.md           # Project documentation
```

## Implementation Details

The application uses the following QVAC SDK components:

- `loadModel`: Loads the translation model.
- `BERGAMOT_EN_FR`: Identifies the English-to-French translation model.
- `translate`: Performs the translation.
- `unloadModel`: Releases the loaded model when the application finishes.

The model is configured with:

```javascript
modelType: "nmt"

modelConfig: {
    engine: "Bergamot",
    from: "en",
    to: "fr",
    beamsize: 1,
    temperature: 0.2
}
```

## Troubleshooting

**1. Model download fails**

If the model fails to download during the first run:

- Check your internet connection.
- Ensure you can access the required model resources.
- Try running the application again.

**2. Model loading fails offline**

Ensure that the initial model download completed successfully before disconnecting from the internet.

**3. Translation fails**

Check that the model was loaded successfully and that the input is not empty.

## Limitations

- The current implementation supports English-to-French translation only.
- The application runs through the command line; it does not currently provide a graphical interface.
- The initial model download requires an internet connection.
- Offline functionality depends on the local availability of the downloaded model.

## License

This project is licensed under the ISC License.

## Author

**Chinedu Okeke**

GitHub: [@chiscookeke11](https://github.com/chiscookeke11)
