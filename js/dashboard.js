
/* Script de JavaScript hecho por @Adeveloper_games */

const API_URL = "https://dbn-web-backend.onrender.com";

document.addEventListener("DOMContentLoaded", initializeDashboard);

async function initializeDashboard() {
    const errorMessage = document.getElementById("dashboard-error");

    try {
        const response = await fetch(`${API_URL}/api/user`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!data.logged || !data.user?.discord) {
            window.location.replace("../");
            return;
        }

        renderDiscordProfile(data.user.discord);

    } catch (error) {
        console.error("Error al cargar el Dashboard:", error);

        errorMessage.textContent =
            "No se ha podido verificar tu sesión. Comprueba tu conexión e inténtalo de nuevo.";

        errorMessage.hidden = false;
    }
}

function renderDiscordProfile(discord) {
    const avatar = document.getElementById("discord-avatar");
    const displayName = discord.displayName || discord.username || "Player";
    const username = discord.username || "Unknown";
    const discordId = discord.id || "Unavailable";

    document.getElementById("welcome-name").textContent = displayName;
    document.getElementById("discord-name").textContent = displayName;
    document.getElementById("discord-username").textContent = `@${username}`;
    document.getElementById("discord-id").textContent = discordId;

    if (discord.avatarURL) {
        avatar.src = discord.avatarURL;
    } else {
        avatar.alt = "Discord avatar unavailable";
    }
}
