document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const saveButton = document.getElementById('saveButton');
    const discardButton = document.getElementById('discardButton');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const transcript = document.getElementById('transcript');
    const status = document.getElementById('status');
    const transcriptActions = document.getElementById('transcriptActions');
    const historyList = document.getElementById('historyList');

    let recognition;
    let isRecording = false;
    let currentTranscript = '';
    let finalTranscript = '';

    // Check if browser supports Web Speech API
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        status.textContent = 'Speech recognition is not supported in this browser.';
        startButton.disabled = true;
        return;
    }

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    // Handle recognition results
    recognition.onresult = (event) => {
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }

        // Update the transcript display
        transcript.innerHTML = finalTranscript + '<span class="interim">' + interimTranscript + '</span>';
    };

    // Handle recognition errors
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        status.textContent = `Error: ${event.error}`;
        stopRecording();
    };

    // Handle recognition end
    recognition.onend = () => {
        if (isRecording) {
            recognition.start();
        }
    };

    // Start recording
    startButton.addEventListener('click', () => {
        try {
            finalTranscript = '';
            transcript.innerHTML = '';
            recognition.start();
            isRecording = true;
            startButton.disabled = true;
            stopButton.disabled = false;
            transcriptActions.style.display = 'none';
            status.textContent = 'Listening...';
            status.style.backgroundColor = 'rgba(74, 144, 226, 0.1)';
            status.style.color = 'var(--primary-color)';
        } catch (error) {
            console.error('Error starting recognition:', error);
            status.textContent = 'Error starting recognition';
        }
    });

    // Stop recording
    stopButton.addEventListener('click', stopRecording);

    function stopRecording() {
        recognition.stop();
        isRecording = false;
        startButton.disabled = false;
        stopButton.disabled = true;
        status.textContent = 'Recording stopped';
        transcriptActions.style.display = 'flex';
    }

    // Save transcript
    saveButton.addEventListener('click', () => {
        if (finalTranscript.trim()) {
            const timestamp = new Date();
            const historyItem = createHistoryItem(finalTranscript.trim(), timestamp);
            historyList.insertBefore(historyItem, historyList.firstChild);
            
            // Clear current transcript
            finalTranscript = '';
            transcript.innerHTML = '';
            transcriptActions.style.display = 'none';
            status.textContent = 'Transcript saved';
        }
    });

    // Create history item
    function createHistoryItem(content, timestamp) {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const timestampDiv = document.createElement('div');
        timestampDiv.className = 'timestamp';
        timestampDiv.textContent = timestamp.toLocaleString();
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'content';
        contentDiv.textContent = content;
        
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'actions';
        
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'download-btn';
        downloadBtn.textContent = 'Download';
        downloadBtn.addEventListener('click', () => {
            downloadTranscript(content, timestamp);
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            historyItem.remove();
            status.textContent = 'Transcript deleted';
        });
        
        actionsDiv.appendChild(downloadBtn);
        actionsDiv.appendChild(deleteBtn);
        
        historyItem.appendChild(timestampDiv);
        historyItem.appendChild(contentDiv);
        historyItem.appendChild(actionsDiv);
        
        return historyItem;
    }

    // Download transcript
    function downloadTranscript(content, timestamp) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transcript-${timestamp.toISOString().slice(0, 10)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        status.textContent = 'Transcript downloaded';
    }

    // Discard transcript
    discardButton.addEventListener('click', () => {
        finalTranscript = '';
        transcript.innerHTML = '';
        transcriptActions.style.display = 'none';
        status.textContent = 'Transcript discarded';
    });

    // Dark mode toggle
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        darkModeToggle.checked = true;
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}); 