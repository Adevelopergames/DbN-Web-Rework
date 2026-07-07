// Script de JavaScript hecho por @Adeveloper_games //
const API_URL = "http://localhost:3000";

const userPanel = document.getElementById("user-panel");
const loginButton = document.getElementById("discord-login");

async function checkLogin() {
    try {
        const response = await fetch(`${API_URL}/api/user`, {
            credentials: "include"
        });

        const data = await response.json();
        if (!data.logged) {
            loginButton.onclick = () => {
                window.location.href = `${API_URL}/auth/discord`;
            };
            return;
        }
        showLoggedUser(data.user);

    }
    catch (error) {
        console.error("Error comprobando la sesión:", error);
    }
}

function showLoggedUser(user) {
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
                style="
                    width:42px;
                    height:42px;
                    border-radius:50%;
                "
            >
            <div>
                <div style="font-weight:700;color:white;">
                    ${user.discord.displayName}
                </div>
                <div style="font-size:12px;color:#bfbfbf;">
                    Connected with Discord
                </div>
            </div>
        </div>
    `;
}
checkLogin();
