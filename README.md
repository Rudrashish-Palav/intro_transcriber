# Speech Transcriber Web Application

A modern, responsive web application that transcribes speech in real-time using the Web Speech API. The application features a beautiful UI with dark mode support, transcript history management, and the ability to download transcripts.

![Speech Transcriber Demo](demo.gif)

## Features

- 🎤 Real-time speech transcription using Web Speech API
- 🌓 Dark/Light mode toggle with persistent theme preference
- 💾 Save multiple transcripts
- 📥 Download individual transcripts
- 🗑️ Delete unwanted transcripts
- 🎨 Modern, responsive design with animations
- 📱 Mobile-friendly interface

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- JavaScript (ES6+)
- Web Speech API

## Browser Compatibility

The application works best in modern browsers that support the Web Speech API:
- Google Chrome (recommended)
- Microsoft Edge
- Mozilla Firefox

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/speech-transcriber.git
```

2. Navigate to the project directory:
```bash
cd speech-transcriber
```

3. Open `index.html` in your preferred browser.

## Usage

### Recording a Transcript

1. Click the "Start Recording" button
2. Allow microphone access when prompted by your browser
3. Start speaking - your words will appear in real-time
4. Click "Stop Recording" when finished

### Managing Transcripts

- **Saving a Transcript**: After stopping the recording, click "Save Transcript" to add it to your history
- **Discarding a Transcript**: Click "Discard" to clear the current transcript without saving
- **Downloading a Transcript**: Click the "Download" button on any saved transcript to download it as a text file
- **Deleting a Transcript**: Click the "Delete" button on any saved transcript to remove it from the history

### Theme Toggle

- Use the dark mode toggle in the top-right corner to switch between light and dark themes
- Your theme preference will be saved and restored on your next visit

## Project Structure

```
speech-transcriber/
├── index.html          # Main HTML file
├── styles.css          # Styles and animations
├── script.js           # Web Speech API implementation
└── README.md           # Project documentation
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Web Speech API for speech recognition capabilities
- Modern CSS features for responsive design and animations
- Browser vendors for implementing the Web Speech API

## Support

If you encounter any issues or have suggestions for improvements, please open an issue in the repository.

---

Made with ❤️ by [Rudra]