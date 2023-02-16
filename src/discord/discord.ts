import axios from "axios";

const API_URL = "https://discord.com/api/v9";

// substitua o token abaixo pelo seu token de API do Discord
const DISCORD_TOKEN = "seu-token-de-api-do-discord-aqui";

async function main() {
  try {
    // fazer solicitação para obter os cargos do servidor
    const rolesResponse = await axios.get(`${API_URL}/guilds/{guildId}/roles`, {
      headers: {
        Authorization: `Bot ${DISCORD_TOKEN}`,
      },
    });

    // obter a lista de cargos do servidor
    const roles = rolesResponse.data;

    // encontre o cargo que você deseja definir a posição
    const roleToMove = roles.find((role) => role.name === "nome da role");

    // definir a nova posição do cargo
    const updatedRoleResponse = await axios.patch(
      `${API_URL}/guilds/{guildId}/roles/${roleToMove.id}`,
      {
        position: 1, // substitua pelo número da nova posição que você deseja definir
      },
      {
        headers: {
          Authorization: `Bot ${DISCORD_TOKEN}`,
        },
      }
    );

    console.log(
      `Cargo ${roleToMove.name} atualizado com sucesso! Nova posição: ${updatedRoleResponse.data.position}`
    );
  } catch (error) {
    console.error("Ocorreu um erro ao tentar atualizar o cargo:", error);
  }
}

main();
