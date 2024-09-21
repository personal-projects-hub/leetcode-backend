import { ApiResponseHandler, generateId, prisma } from "@/utils";
import { createProblemBodySchema } from "@/validators";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const apiResponseHandler = new ApiResponseHandler(req);
  try {
    // check user is admin or not, if not then just return
    //   const { user } = await getAuthenticatedUser(req, [
    //       USER_ROLES.MASTER_ADMIN,
    //     ]);

    //     if (!user) {
    //         return apiResponseHandler.authError();
    //     }

    // get data from body, validate using zod
    const bodyValidationResult = createProblemBodySchema.safeParse(
      await req.json()
    );

    if (!bodyValidationResult.success) {
      return apiResponseHandler.clientError();
    }

    const { tags, description, difficulty, title } = bodyValidationResult.data;

    const problemId = generateId();

    const data = {
      id: problemId,
      tags,
      description,
      difficulty,
      title,
    };

    await prisma.problem.create({
      data: data,
    });

    return apiResponseHandler.success(
      { problemId },
      "Problem created successfully!"
    );
  } catch (error) {
    return apiResponseHandler.serverError(error);
  }
}
