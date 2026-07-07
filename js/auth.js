// Script de JavaScript hecho por @Adeveloper_games //
const API_URL = "https://dbn-web-backend.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
    initializeAuthentication();
});

async function initializeAuthentication() {
    const userPanel = document.getElementById("user-panel");

    if (!userPanel) {
        console.error("No se encontró el elemento #user-panel.");
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
            renderLoginButton(userPanel);
        }

    } catch (error) {
        console.error("Error comprobando la sesión:", error);
        renderLoginButton(userPanel);
    }
}

function renderLoginButton(userPanel) {
    const loginButton = document.getElementById("discord-login");

    if (!loginButton) return;

    loginButton.style.display = "flex";

    loginButton.onclick = () => {
        window.location.href = `${API_URL}/auth/discord`;
    };
}

function renderLoggedUser(userPanel, user) {
    userPanel.innerHTML = `
        <div class="user-card">
            <img
                src="${user.discord.avatarURL}"
                alt="Discord Avatar"
            >
            <div>
                <div class="user-name">
                    ${user.discord.displayName}
                </div>
                <div class="user-status">
                    🟢 Connected with Discord
                </div>
            </div>
        </div>
    `;
}
