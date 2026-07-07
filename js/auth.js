// Script de JavaScript hecho por @Adeveloper_games //
const API_URL = "http://localhost:3000";

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
    userPanel.innerHTML = `
        <button id="discord-login" class="btn secondary">
            Continue with Discord
        </button>
    `;

    const loginButton = document.getElementById("discord-login");

    loginButton.addEventListener("click", () => {
        window.location.href = `${API_URL}/auth/discord`;
    });
}

function renderLoggedUser(userPanel, user) {
    userPanel.innerHTML = `
        <div style="
            display:flex;
            align-items:center;
            gap:12px;
            background:rgba(255,255,255,.03);
            padding:8px 14px;
            border-radius:10px;
        ">

            <img
                src="${user.discord.avatarURL}"
                alt="Discord Avatar"
                style="
                    width:42px;
                    height:42px;
                    border-radius:50%;
                    object-fit:cover;
                "
            >

            <div>
                <div style="
                    font-weight:700;
                    color:white;
                ">
                    ${user.discord.displayName}
                </div>

                <div style="
                    font-size:12px;
                    color:#bfbfbf;
                ">
                    Connected with Discord
                </div>
            </div>
        </div>
    `;
}
