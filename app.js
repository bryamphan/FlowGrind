// Import React hooks
const { useState, useEffect } = React;

// Main App Component
function App() {
    return (
        <div className="app">
            {/* Top Navigation Bar */}
            <nav className="navbar">
                <div className="nav-left">
                    <h1 className="logo">FlowGrind</h1>
                </div>
                <div className="nav-right">
                    <button className="nav-btn">Theme</button>
                    <button className="nav-btn">Music</button>
                </div>
            </nav>

            {/* Main Study Room Container */}
            <div className="study-room">
                {/* Left Sidebar */}
                <aside className="sidebar">
                    <div className="sidebar-section">
                        <h3>Timer</h3>
                        {/* TODO: Add timer controls */}
                    </div>
                    
                    <div className="sidebar-section">
                        <h3>Goals</h3>
                        {/* TODO: Add goals */}
                    </div>
                    
                    <div className="sidebar-section">
                        <h3>To-Do List</h3>
                        {/* TODO: Add to-do list */}
                    </div>
                </aside>

                {/* Center - Main Study Area */}
                <main className="study-area">
                    <div className="center-timer">
                        <h2>25:00</h2>
                        <p>Focus Time</p>
                    </div>
                </main>
            </div>
        </div>
    );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
