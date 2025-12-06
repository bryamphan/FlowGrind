// Import React hooks
const { useState, useEffect, useRef } = React;

// Main App Component
function App() {
    const [showTimer, setShowTimer] = useState(false);
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [initialMinutes, setInitialMinutes] = useState(25);
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [initialBreakMinutes, setInitialBreakMinutes] = useState(5);
    const [isBreak, setIsBreak] = useState(false);
    
    // To-do list states
    const [showTodo, setShowTodo] = useState(false);
    const [todoPosition, setTodoPosition] = useState({ x: 400, y: 100 });
    const [isDraggingTodo, setIsDraggingTodo] = useState(false);
    const [todoDragOffset, setTodoDragOffset] = useState({ x: 0, y: 0 });
    const [categories, setCategories] = useState([{ id: 1, name: 'General', notes: [] }]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newNote, setNewNote] = useState('');
    const [activeCategoryId, setActiveCategoryId] = useState(1);
    
    // Themes states
    const [showThemes, setShowThemes] = useState(false);
    const [themesPosition, setThemesPosition] = useState({ x: 300, y: 150 });
    const [isDraggingThemes, setIsDraggingThemes] = useState(false);
    const [themesDragOffset, setThemesDragOffset] = useState({ x: 0, y: 0 });
    const [currentBackground, setCurrentBackground] = useState('Backgrounds/alleyway.gif');
    
    const backgrounds = [
        { name: 'Alleyway', path: 'Backgrounds/alleyway.gif' },
        { name: 'Anime', path: 'Backgrounds/anh-pham-bx-anim.gif' },
        { name: 'Coffee', path: 'Backgrounds/coffee.gif' }
    ];
    
    // Music states
    const [showMusic, setShowMusic] = useState(false);
    const [musicPosition, setMusicPosition] = useState({ x: 300, y: 200 });
    const [isDraggingMusic, setIsDraggingMusic] = useState(false);
    const [musicDragOffset, setMusicDragOffset] = useState({ x: 0, y: 0 });
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    
    const musicTracks = [
        { name: 'Boba Date', path: 'Music/Stream Cafe - Boba Date.mp3' },
        { name: 'Boy Meets Girl', path: 'Music/Stream Cafe - Boy Meets Girl.mp3' }
    ];

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    // Timer countdown logic
    useEffect(() => {
        let interval = null;
        if (isRunning && (minutes > 0 || seconds > 0)) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        setIsRunning(false);
                        // Switch to break timer when focus ends, or vice versa
                        if (!isBreak) {
                            setIsBreak(true);
                            setMinutes(breakMinutes);
                            setSeconds(0);
                            setIsRunning(true);
                        } else {
                            setIsBreak(false);
                            setMinutes(initialMinutes);
                            setSeconds(0);
                        }
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        } else if (minutes === 0 && seconds === 0 && !isRunning) {
            // Timer finished
        }
        return () => clearInterval(interval);
    }, [isRunning, minutes, seconds, isBreak, breakMinutes, initialMinutes]);

    const startTimer = () => {
        setIsRunning(true);
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setIsBreak(false);
        setMinutes(initialMinutes);
        setSeconds(0);
    };
    
    // To-do list functions
    const addCategory = () => {
        if (newCategoryName.trim()) {
            const newCategory = {
                id: Date.now(),
                name: newCategoryName,
                notes: []
            };
            setCategories([...categories, newCategory]);
            setNewCategoryName('');
        }
    };
    
    const addNote = () => {
        if (newNote.trim()) {
            setCategories(categories.map(cat => 
                cat.id === activeCategoryId 
                    ? { ...cat, notes: [...cat.notes, { id: Date.now(), text: newNote, completed: false }] }
                    : cat
            ));
            setNewNote('');
        }
    };
    
    const toggleNote = (noteId) => {
        setCategories(categories.map(cat => 
            cat.id === activeCategoryId
                ? { ...cat, notes: cat.notes.map(note => 
                    note.id === noteId ? { ...note, completed: !note.completed } : note
                )}
                : cat
        ));
    };
    
    const deleteNote = (noteId) => {
        setCategories(categories.map(cat => 
            cat.id === activeCategoryId
                ? { ...cat, notes: cat.notes.filter(note => note.id !== noteId) }
                : cat
        ));
    };
    
    const deleteCategory = (categoryId) => {
        if (categories.length > 1) {
            setCategories(categories.filter(cat => cat.id !== categoryId));
            if (activeCategoryId === categoryId) {
                setActiveCategoryId(categories[0].id);
            }
        }
    };

    // Handle dragging
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]);
    
    // Handle to-do list dragging
    const handleTodoMouseDown = (e) => {
        setIsDraggingTodo(true);
        setTodoDragOffset({
            x: e.clientX - todoPosition.x,
            y: e.clientY - todoPosition.y
        });
    };

    const handleTodoMouseMove = (e) => {
        if (isDraggingTodo) {
            setTodoPosition({
                x: e.clientX - todoDragOffset.x,
                y: e.clientY - todoDragOffset.y
            });
        }
    };

    const handleTodoMouseUp = () => {
        setIsDraggingTodo(false);
    };

    useEffect(() => {
        if (isDraggingTodo) {
            window.addEventListener('mousemove', handleTodoMouseMove);
            window.addEventListener('mouseup', handleTodoMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleTodoMouseMove);
            window.removeEventListener('mouseup', handleTodoMouseUp);
        };
    }, [isDraggingTodo, todoDragOffset]);
    
    // Handle themes dragging
    const handleThemesMouseDown = (e) => {
        setIsDraggingThemes(true);
        setThemesDragOffset({
            x: e.clientX - themesPosition.x,
            y: e.clientY - themesPosition.y
        });
    };

    const handleThemesMouseMove = (e) => {
        if (isDraggingThemes) {
            setThemesPosition({
                x: e.clientX - themesDragOffset.x,
                y: e.clientY - themesDragOffset.y
            });
        }
    };

    const handleThemesMouseUp = () => {
        setIsDraggingThemes(false);
    };

    useEffect(() => {
        if (isDraggingThemes) {
            window.addEventListener('mousemove', handleThemesMouseMove);
            window.addEventListener('mouseup', handleThemesMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleThemesMouseMove);
            window.removeEventListener('mouseup', handleThemesMouseUp);
        };
    }, [isDraggingThemes, themesDragOffset]);
    
    // Handle music dragging
    const handleMusicMouseDown = (e) => {
        setIsDraggingMusic(true);
        setMusicDragOffset({
            x: e.clientX - musicPosition.x,
            y: e.clientY - musicPosition.y
        });
    };

    const handleMusicMouseMove = (e) => {
        if (isDraggingMusic) {
            setMusicPosition({
                x: e.clientX - musicDragOffset.x,
                y: e.clientY - musicDragOffset.y
            });
        }
    };

    const handleMusicMouseUp = () => {
        setIsDraggingMusic(false);
    };

    useEffect(() => {
        if (isDraggingMusic) {
            window.addEventListener('mousemove', handleMusicMouseMove);
            window.addEventListener('mouseup', handleMusicMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMusicMouseMove);
            window.removeEventListener('mouseup', handleMusicMouseUp);
        };
    }, [isDraggingMusic, musicDragOffset]);
    
    // Change background instantly
    const changeBackground = (bgPath) => {
        setCurrentBackground(bgPath);
    };
    
    // Music player functions
    const playTrack = (track) => {
        if (currentTrack === track.path && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            setCurrentTrack(track.path);
            setIsPlaying(true);
            setTimeout(() => {
                audioRef.current.play();
            }, 100);
        }
    };
    
    const stopMusic = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    return (
        <div className="app">
            <aside className="sidebar" data-aos="fade-right">
                <img src="logo.png" alt="FlowGrind Logo" className="logo" />
                
                <div className="sidebar-section" onClick={() => setShowTimer(true)} style={{cursor: 'pointer'}}>
                    <h3>timer</h3>
                </div>
                
                <div className="sidebar-section" onClick={() => setShowTodo(true)} style={{cursor: 'pointer'}}>
                    <h3>to-do list</h3>
                </div>
            </aside>

            <div className="main-content">
                <div className="top-right-buttons" data-aos="fade-down">
                    <button className="nav-btn theme-btn" onClick={() => setShowThemes(true)}>
                        <img src="themes.png" alt="Themes" />
                    </button>
                    <button className="nav-btn music-btn" onClick={() => setShowMusic(true)}>
                        <img src="music.png" alt="Music" />
                    </button>
                </div>
                
                {/* Hidden audio element */}
                <audio ref={audioRef} src={currentTrack} loop />

                <main className="study-area" style={{
                    backgroundImage: `url('${currentBackground}')`
                }}>
                    
                    {showTimer && (
                        <div 
                            className="timer-window"
                            style={{
                                left: `${position.x}px`,
                                top: `${position.y}px`
                            }}
                        >
                            <div 
                                className="timer-window-header"
                                onMouseDown={handleMouseDown}
                            >
                                <span>Timer</span>
                                <button 
                                    className="close-btn"
                                    onClick={() => setShowTimer(false)}
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="timer-window-content">
                                <h2>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</h2>
                                <p>{isBreak ? 'break time' : 'focus time'}</p>
                                
                                {!isRunning && (
                                    <div className="timer-controls">
                                        <div className="time-setter">
                                            <label>Focus Minutes</label>
                                            <div className="control-buttons">
                                                <button onClick={() => {
                                                    const newMin = Math.max(1, initialMinutes - 1);
                                                    setMinutes(newMin);
                                                    setInitialMinutes(newMin);
                                                }}>-</button>
                                                <span>{initialMinutes}</span>
                                                <button onClick={() => {
                                                    const newMin = Math.min(99, initialMinutes + 1);
                                                    setMinutes(newMin);
                                                    setInitialMinutes(newMin);
                                                }}>+</button>
                                            </div>
                                        </div>
                                        <div className="time-setter">
                                            <label>Break Minutes</label>
                                            <div className="control-buttons">
                                                <button onClick={() => {
                                                    const newBreak = Math.max(1, breakMinutes - 1);
                                                    setBreakMinutes(newBreak);
                                                    setInitialBreakMinutes(newBreak);
                                                }}>-</button>
                                                <span>{breakMinutes}</span>
                                                <button onClick={() => {
                                                    const newBreak = Math.min(99, breakMinutes + 1);
                                                    setBreakMinutes(newBreak);
                                                    setInitialBreakMinutes(newBreak);
                                                }}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="timer-action-buttons">
                                    {!isRunning ? (
                                        <button className="start-btn" onClick={startTimer}>Start</button>
                                    ) : (
                                        <button className="pause-btn" onClick={pauseTimer}>Pause</button>
                                    )}
                                    <button className="reset-btn" onClick={resetTimer}>Reset</button>
                                </div>
                                
                                {!isRunning && (
                                    <div className="preset-buttons">
                                        <button onClick={() => {
                                            setMinutes(25); 
                                            setSeconds(0); 
                                            setInitialMinutes(25);
                                            setBreakMinutes(5);
                                            setInitialBreakMinutes(5);
                                        }}>25/5 min</button>
                                        <button onClick={() => {
                                            setMinutes(30); 
                                            setSeconds(0); 
                                            setInitialMinutes(30);
                                            setBreakMinutes(10);
                                            setInitialBreakMinutes(10);
                                        }}>30/10 min</button>
                                        <button onClick={() => {
                                            setMinutes(60); 
                                            setSeconds(0); 
                                            setInitialMinutes(60);
                                            setBreakMinutes(15);
                                            setInitialBreakMinutes(15);
                                        }}>60/15 min</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    
                    {showTodo && (
                        <div 
                            className="timer-window todo-window"
                            style={{
                                left: `${todoPosition.x}px`,
                                top: `${todoPosition.y}px`,
                                minWidth: '400px'
                            }}
                        >
                            <div 
                                className="timer-window-header"
                                onMouseDown={handleTodoMouseDown}
                            >
                                <span>To-Do List</span>
                                <button 
                                    className="close-btn"
                                    onClick={() => setShowTodo(false)}
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="timer-window-content">
                                {/* Category tabs */}
                                <div className="category-tabs">
                                    {categories.map(cat => (
                                        <div 
                                            key={cat.id}
                                            className={`category-tab ${activeCategoryId === cat.id ? 'active' : ''}`}
                                        >
                                            <span onClick={() => setActiveCategoryId(cat.id)}>{cat.name}</span>
                                            {categories.length > 1 && (
                                                <button 
                                                    className="delete-category-btn"
                                                    onClick={() => deleteCategory(cat.id)}
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Add new category */}
                                <div className="add-category">
                                    <input 
                                        type="text" 
                                        placeholder="New category (e.g., Math 101)"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && addCategory()}
                                    />
                                    <button onClick={addCategory}>Add Category</button>
                                </div>
                                
                                {/* Notes list */}
                                <div className="notes-list">
                                    {categories.find(cat => cat.id === activeCategoryId)?.notes.map(note => (
                                        <div key={note.id} className="note-item">
                                            <input 
                                                type="checkbox" 
                                                checked={note.completed}
                                                onChange={() => toggleNote(note.id)}
                                            />
                                            <span className={note.completed ? 'completed' : ''}>{note.text}</span>
                                            <button 
                                                className="delete-note-btn"
                                                onClick={() => deleteNote(note.id)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Add new note */}
                                <div className="add-note">
                                    <input 
                                        type="text" 
                                        placeholder="Add a new task..."
                                        value={newNote}
                                        onChange={(e) => setNewNote(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && addNote()}
                                    />
                                    <button className="start-btn" onClick={addNote}>Add</button>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {showThemes && (
                        <div 
                            className="timer-window themes-window"
                            style={{
                                left: `${themesPosition.x}px`,
                                top: `${themesPosition.y}px`,
                                minWidth: '350px'
                            }}
                        >
                            <div 
                                className="timer-window-header"
                                onMouseDown={handleThemesMouseDown}
                            >
                                <span>Themes</span>
                                <button 
                                    className="close-btn"
                                    onClick={() => setShowThemes(false)}
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="timer-window-content">
                                <p style={{marginBottom: '20px'}}>Choose your background:</p>
                                <div className="background-options">
                                    {backgrounds.map((bg, index) => (
                                        <div 
                                            key={index}
                                            className={`background-option ${currentBackground === bg.path ? 'active' : ''}`}
                                            onClick={() => changeBackground(bg.path)}
                                        >
                                            <img src={bg.path} alt={bg.name} />
                                            <span>{bg.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {showMusic && (
                        <div 
                            className="timer-window music-window"
                            style={{
                                left: `${musicPosition.x}px`,
                                top: `${musicPosition.y}px`,
                                minWidth: '350px'
                            }}
                        >
                            <div 
                                className="timer-window-header"
                                onMouseDown={handleMusicMouseDown}
                            >
                                <span>Music Player</span>
                                <button 
                                    className="close-btn"
                                    onClick={() => setShowMusic(false)}
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="timer-window-content">
                                <p style={{marginBottom: '20px'}}>Choose your study music:</p>
                                <div className="music-options">
                                    {musicTracks.map((track, index) => (
                                        <div 
                                            key={index}
                                            className={`music-option ${currentTrack === track.path && isPlaying ? 'playing' : ''}`}
                                            onClick={() => playTrack(track)}
                                        >
                                            <span className="music-icon">{currentTrack === track.path && isPlaying ? '⏸' : '▶'}</span>
                                            <span className="music-name">{track.name}</span>
                                        </div>
                                    ))}
                                </div>
                                {isPlaying && (
                                    <button className="reset-btn" onClick={stopMusic} style={{marginTop: '20px', width: '100%'}}>
                                        Stop Music
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
