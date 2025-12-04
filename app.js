// Import React hooks
const { useState, useEffect } = React;

// Main App Component
function App() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    return (
        <div className="app">
            <aside className="sidebar" data-aos="fade-right">
                <img src="logo.png" alt="FlowGrind Logo" className="logo" />
                
                <div className="sidebar-section">
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
                    <div className="center-timer">
                        <h2>25:00</h2>
                        <p>focus time</p>
                    </div>
                </main>
            </div>
        </div>
    );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
