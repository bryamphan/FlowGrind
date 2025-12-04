// Import React hooks
const { useState, useEffect, useRef } = React;

// Main App Component
function App() {
    const [showTimer, setShowTimer] = useState(false);
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

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

    return (
        <div className="app">
            <aside className="sidebar" data-aos="fade-right">
                <img src="logo.png" alt="FlowGrind Logo" className="logo" />
                
                <div className="sidebar-section" onClick={() => setShowTimer(true)} style={{cursor: 'pointer'}}>
                    <h3>timer</h3>
                    {/* TODO: Add timer controls */}
                </div>
                
                <div className="sidebar-section">
                    <h3>goals</h3>
                    {/* TODO: Add goals */}
                </div>
                
                <div className="sidebar-section">
                    <h3>to-do list</h3>
                    {/* TODO: Add to-do list */}
                </div>
            </aside>

            <div className="main-content">
                <div className="top-right-buttons" data-aos="fade-down">
                    <button className="nav-btn">themes</button>
                    <button className="nav-btn">music</button>
                </div>

                <main className="study-area">
                    <p> welcome 2 ur study area! </p>
                    
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
                                <h2>25:00</h2>
                                <p>focus time</p>
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
