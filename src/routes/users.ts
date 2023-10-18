import { FastifyInstance } from "fastify";
import { knex } from "../database";
import crypto, { randomUUID } from "node:crypto";
import { z } from "zod";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

// TODO plugin deve ser async
export async function usersRoutes(app: FastifyInstance) {
  app.post("/", async (request, response) => {
    // capturando os dados do usuário e validando com o zod
    const createUserBodySchema = z.object({
      name: z.string(),
      username: z.string(),
    });

    // Validando os dados do request.body para ver se bate com o schema de validação
    const { name, username } = createUserBodySchema.parse(request.body);

    // Conferindo se o email já está cadastrado
    // Selecionando todas as colunas ('*') da tabela de usuários ('from("users")') onde a coluna "email" é igual ao valor da variável "email" ('where({ email })')
    const checkUserExist = await knex
      .select("*")
      .from("users")
      .where("username", username)
      .first();

    if (checkUserExist) {
      return response.status(400).send({
        error: "Este email já está vinculado à um usuário",
      });
    }

    // Verificando se já existe uma sessionID
    let sessionId = request.cookies.sessionId;

    // Caso não exista, criar um
    if (!sessionId) {
      sessionId = randomUUID();

      response.cookie("sessionId", sessionId, {
        path: "/snacks", // apenas as rotas /snacks podem acessar ao cookie
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });
    }

    await knex("users").insert({
      id: crypto.randomUUID(),
      name,
      username,
      session_id: sessionId,
    });

    return response.status(201).send();
  });

  app.get("/", { preHandler: [checkSessionIdExists] }, async (request) => {
    const { sessionId } = request.cookies;

    // const [user] = await knex("users")
    //   .where("session_id", sessionId)
    //   .select("id");

    // const userId = user.id;

    // .where('user_id', userId) -> Selecionar apenas onde a coluna user_id seja correspondende ao id do usuário que criou o prato
    const users = await knex("users").select("*");

    return {
      users,
    };
  });
}
