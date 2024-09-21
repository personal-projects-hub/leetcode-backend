import { ApiResponseHandler } from "@/utils/index";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const apiResponseHandler = new ApiResponseHandler(req);

  try {
    return apiResponseHandler.success(null, "API is working successfully!");
  } catch (error) {
    return apiResponseHandler.serverError(error);
  }
}
