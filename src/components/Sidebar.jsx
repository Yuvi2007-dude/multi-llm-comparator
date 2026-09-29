function Sidebar () {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2> History</h2>

                <button className="new-chat-button">
                    + New Chat
                </button>
            </div>

            <div className="history-list">
                <p className="empty-history">
                    No conversations yet
                </p>
            </div>
        </aside>
    );
}

export default Sidebar;  