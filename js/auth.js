// Script de JavaScript hecho por @Adeveloper_games //
const API_URL = "https://dbn-web-backend.onrender.com";
document.addEventListener("DOMContentLoaded", initializeAuthentication);

async function initializeAuthentication() {
    const userPanel = document.getElementById("user-panel");
    if (!userPanel) {
        console.error("No se encontró #user-panel.");
        return;
    }
    try {
        const response = await fetch(`${API_URL}/api/user`, {
            credentials: "include"
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        if (data.logged) {

            renderLoggedUser(userPanel, data.user);
        } else {
            activateLoginButton();
        }
    }
    catch (error) {
        console.error(error);
        activateLoginButton();
    }
}

function activateLoginButton() {
    const loginButton = document.getElementById("discord-login");
    if (!loginButton) return;
    loginButton.style.display = "flex";
    loginButton.onclick = () => {
        window.location.href = `${API_URL}/auth/discord`;
    };
}

function renderLoggedUser(userPanel, user) {
    userPanel.innerHTML = `
        <div class="user-card" id="user-card">
            <img
                src="${user.discord.avatarURL}"
                alt="Discord Avatar"
            >
            <div class="user-info">
                <div class="user-name">
                    ${user.discord.displayName}
                </div>
                <div class="user-status">
                    🟢 Connected with Discord
                </div>
            </div>
            <div class="user-arrow">
                ▼
            </div>
        </div>
        <div class="user-menu" id="user-menu">
            <button>👤 Dashboard</button>
            <button>🎮 Roblox Profile</button>
            <button>🏆 Achievements</button>
            <button>⚙ Settings</button>
            <hr>
            <button id="logout-button">
                🚪 Logout
            </button>
        </div>
    `;
    initializeMenu();
}

function initializeMenu() {
    const card = document.getElementById("user-card");
    const menu = document.getElementById("user-menu");
    if (!card || !menu) return;
    card.addEventListener("click", (event) => {
        event.stopPropagation();
        menu.classList.toggle("show");
        card.classList.toggle("open");
    });
    document.addEventListener("click", () => {
        menu.classList.remove("show");
        card.classList.remove("open");
    });
    menu.addEventListener("click", (event) => {
        event.stopPropagation();
    });
    const logout = document.getElementById("logout-button");
    logout.onclick = () => {
        window.location.href = `${API_URL}/auth/logout`;
    };
}
